const ITERATIONS = 100_000;
const ALGO = 'PBKDF2-SHA-256';

function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqual(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string' || left.length !== right.length) return false;
  let mismatch = 0;
  for (let i = 0; i < left.length; i += 1) mismatch |= left.charCodeAt(i) ^ right.charCodeAt(i);
  return mismatch === 0;
}

/**
 * Hash a password with PBKDF2-SHA-256. Plaintext is never returned.
 * Pass `saltBase64` and `iterations` to reproduce an existing hash.
 * @param {string} password
 * @param {{ saltBase64?: string, iterations?: number }} [options]
 */
export async function hashPassword(password, options = {}) {
  const { saltBase64, iterations = ITERATIONS } = options;
  if (!globalThis.crypto?.subtle) {
    throw new Error('This browser cannot hash passwords.');
  }
  const salt = saltBase64 ? base64ToBytes(saltBase64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    key,
    256,
  );
  return {
    algo: ALGO,
    iterations,
    salt: bytesToBase64(salt),
    hash: bytesToBase64(new Uint8Array(bits)),
  };
}

export async function verifyPassword(password, record) {
  if (!record || record.algo !== ALGO || !record.salt || !record.hash) return false;
  if (!Number.isInteger(record.iterations) || record.iterations < 1000 || record.iterations > 300_000) {
    return false;
  }
  let saltBytes;
  try {
    saltBytes = base64ToBytes(record.salt);
  } catch {
    return false;
  }
  if (saltBytes.length < 16) return false;
  const next = await hashPassword(password, {
    saltBase64: record.salt,
    iterations: record.iterations,
  });
  return timingSafeEqual(next.hash, record.hash);
}
