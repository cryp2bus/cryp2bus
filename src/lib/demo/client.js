import { isValidEmail } from '@/lib/formValidation';
import {
  ACCOUNT_STATUS,
  EUROPEAN_COUNTRIES,
  KYB_DOCUMENTS,
  QUOTE_STATUSES,
  STORAGE_DB_KEY,
  STORAGE_SESSION_KEY,
} from './config';
import { hashPassword, verifyPassword } from './password';
import {
  hasErrors,
  movementFieldErrors,
  onboardingProblem,
  profileFieldErrors,
  quoteFieldErrors,
  signUpFieldErrors,
  teamMemberErrors,
  ticketFieldErrors,
} from './validate';

/**
 * Browser auth and data adapter for the Cryp2bus client demo.
 *
 * Screens should go through DemoProvider, which calls this module.
 * Replace these functions with a hosted backend (for example Supabase)
 * without rewriting the screens, as long as the method names and the
 * `{ ok, error, user }` results stay the same.
 *
 * Passwords are hashed with PBKDF2-SHA-256 before storage. Plaintext
 * passwords are never written.
 *
 * Persistence (this browser only):
 *   cryp2bus.demo.v1       accounts, requests, and session records
 *   cryp2bus.demo.session  id of the signed-in session
 * Reset with demoClient.resetDemo(), or delete both keys.
 */

const listeners = new Set();

function storage() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emit() {
  listeners.forEach((listener) => {
    listener();
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_DB_KEY || event.key === STORAGE_SESSION_KEY) emit();
  });
}

function emptyDb() {
  return { users: [], sessions: [], nextRef: 1001 };
}

function loadDb() {
  const store = storage();
  if (!store) return emptyDb();
  try {
    const raw = store.getItem(STORAGE_DB_KEY);
    if (!raw) return emptyDb();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.users) || !Array.isArray(parsed.sessions)) return emptyDb();
    if (typeof parsed.nextRef !== 'number') parsed.nextRef = 1001;
    return parsed;
  } catch {
    return emptyDb();
  }
}

function persist(db) {
  const store = storage();
  if (!store) return false;
  try {
    store.setItem(STORAGE_DB_KEY, JSON.stringify(db));
  } catch {
    return false;
  }
  emit();
  return true;
}

function fail(error, field = null, step = null) {
  return { ok: false, error, field, step, user: readSession() };
}

function invalid(error, field = null, step = null) {
  return { __error: error, __field: field, __step: step };
}

function publicUser(user) {
  if (!user) return null;
  const { password: _password, ...safe } = user;
  return safe;
}

function currentToken() {
  const store = storage();
  if (!store) return null;
  try {
    return store.getItem(STORAGE_SESSION_KEY);
  } catch {
    return null;
  }
}

function readInternal() {
  const token = currentToken();
  if (!token) return null;
  const db = loadDb();
  const session = db.sessions.find((item) => item.token === token);
  if (!session) return null;
  const user = db.users.find((item) => item.id === session.userId);
  if (!user) return null;
  return { db, session, user };
}

export function readSession() {
  const current = readInternal();
  return current ? publicUser(current.user) : null;
}

function ok(extra = {}) {
  return { ok: true, user: readSession(), error: '', field: null, step: null, ...extra };
}

function updateCurrent(mutator) {
  const current = readInternal();
  if (!current) return fail('Sign in required.', 'auth');
  const next = mutator({ ...current.user }, current.db);
  if (next && next.__error) return fail(next.__error, next.__field || null, next.__step || null);
  const index = current.db.users.findIndex((item) => item.id === current.user.id);
  if (index < 0) return fail('Sign in required.', 'auth');
  current.db.users[index] = next;
  if (!persist(current.db)) return fail('This browser blocked local storage. Demo data could not be saved.');
  return ok();
}

function blankCompany() {
  return {
    registrationNumber: '',
    address: '',
    website: '',
    businessType: '',
    monthlyVolume: '',
  };
}

function sanitizeCompany(company = {}) {
  return {
    registrationNumber: String(company.registrationNumber || '').trim().slice(0, 40),
    address: String(company.address || '').trim().slice(0, 240),
    website: String(company.website || '').trim().slice(0, 200),
    businessType: String(company.businessType || '').trim(),
    monthlyVolume: String(company.monthlyVolume || '').trim(),
  };
}

function sanitizePerson(person = {}) {
  const role = ['director', 'ubo', 'both'].includes(person.role) ? person.role : 'director';
  return {
    id: person.id || crypto.randomUUID(),
    role,
    name: String(person.name || '').trim().slice(0, 120),
    ownership: String(person.ownership || '').trim().slice(0, 10),
    residence: EUROPEAN_COUNTRIES.includes(person.residence) ? person.residence : '',
  };
}

function sanitizeDocument(document) {
  const requirementId = KYB_DOCUMENTS.some((item) => item.id === document?.requirementId)
    ? document.requirementId
    : '';
  if (!requirementId) return null;
  return {
    id: document.id || crypto.randomUUID(),
    requirementId,
    name: String(document.name || '').trim().slice(0, 180),
    size: Number(document.size) > 0 ? Number(document.size) : 0,
    type: String(document.type || '').slice(0, 120),
    placeholder: Boolean(document.placeholder),
  };
}

function sanitizeDocuments(documents) {
  const byRequirement = new Map();
  documents.forEach((document) => {
    const clean = sanitizeDocument(document);
    if (!clean || !clean.name) return;
    byRequirement.set(clean.requirementId, clean);
  });
  return [...byRequirement.values()].slice(0, KYB_DOCUMENTS.length);
}

function startSession(db, userId) {
  const token = crypto.randomUUID();
  db.sessions.push({ token, userId, createdAt: new Date().toISOString() });
  db.sessions = db.sessions.slice(-20);
  const store = storage();
  store?.setItem(STORAGE_SESSION_KEY, token);
}

const STORAGE_ERROR = 'This browser blocked local storage. Demo data could not be saved.';

export async function signUp({ companyName, country, email, password, acceptedTerms }) {
  const errors = signUpFieldErrors({ companyName, country, email, password, acceptedTerms });
  if (hasErrors(errors)) return fail(Object.values(errors)[0], Object.keys(errors)[0]);

  const workEmail = email.trim().toLowerCase();
  const db = loadDb();
  if (db.users.some((user) => user.email === workEmail)) {
    return fail('A company is already registered with this work email.', 'email');
  }

  let passwordRecord;
  try {
    passwordRecord = await hashPassword(password);
  } catch {
    return fail('This browser cannot store a password safely.');
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const company = companyName.trim();
  db.users.push({
    id,
    companyName: company,
    country,
    email: workEmail,
    password: passwordRecord,
    acceptedTermsAt: now,
    createdAt: now,
    accountStatus: ACCOUNT_STATUS.pending_onboarding,
    statusUpdatedAt: now,
    rejectionNote: '',
    company: blankCompany(),
    people: [],
    documents: [],
    onboardingSubmittedAt: null,
    team: [
      {
        id: crypto.randomUUID(),
        name: company,
        email: workEmail,
        role: 'Owner',
        owner: true,
      },
    ],
    quotes: [],
    transactions: [],
    tickets: [],
  });

  try {
    startSession(db, id);
  } catch {
    return fail(STORAGE_ERROR);
  }
  if (!persist(db)) {
    storage()?.removeItem(STORAGE_SESSION_KEY);
    return fail(STORAGE_ERROR);
  }
  return ok();
}

export async function signIn({ email, password }) {
  const workEmail = email?.trim().toLowerCase() ?? '';
  if (!isValidEmail(workEmail) || !password) {
    return fail('Email or password is incorrect.', 'form');
  }
  const db = loadDb();
  const user = db.users.find((item) => item.email === workEmail);
  let matches = false;
  try {
    matches = user ? await verifyPassword(password, user.password) : false;
    if (!user) await hashPassword(password);
  } catch {
    return fail('This browser cannot check the password.');
  }
  if (!user || !matches) return fail('Email or password is incorrect.', 'form');
  try {
    startSession(db, user.id);
  } catch {
    return fail(STORAGE_ERROR);
  }
  if (!persist(db)) {
    storage()?.removeItem(STORAGE_SESSION_KEY);
    return fail(STORAGE_ERROR);
  }
  return ok();
}

export async function signOut() {
  const token = currentToken();
  const db = loadDb();
  if (token) db.sessions = db.sessions.filter((item) => item.token !== token);
  try {
    storage()?.removeItem(STORAGE_SESSION_KEY);
  } catch {
    // The next read still fails closed if the key cannot be removed.
  }
  if (!persist(db)) emit();
  return { ok: true, user: null, error: '', field: null, step: null };
}

export async function requestPasswordReset(email) {
  const workEmail = email?.trim() ?? '';
  if (!isValidEmail(workEmail)) return fail('Enter a valid work email.', 'email');
  return {
    ok: true,
    user: readSession(),
    error: '',
    field: null,
    step: null,
    message:
      'If a cabinet exists for that work email, a reset link would be sent. This demo does not send email and does not change the password.',
  };
}

export async function saveOnboarding({ company, people, documents }) {
  return updateCurrent((user) => ({
    ...user,
    company: sanitizeCompany(company ?? user.company),
    people: Array.isArray(people) ? people.slice(0, 12).map(sanitizePerson) : user.people,
    documents: Array.isArray(documents) ? sanitizeDocuments(documents) : user.documents,
  }));
}

export async function submitOnboarding(payload) {
  const saved = await saveOnboarding(payload);
  if (!saved.ok) return saved;
  const problem = onboardingProblem(payload);
  if (problem) return fail(problem.error, problem.field || null, problem.step || null);
  return updateCurrent((user) => ({
    ...user,
    accountStatus: ACCOUNT_STATUS.under_review,
    statusUpdatedAt: new Date().toISOString(),
    onboardingSubmittedAt: new Date().toISOString(),
    rejectionNote: '',
  }));
}

export async function setAccountStatus(status) {
  if (!Object.values(ACCOUNT_STATUS).includes(status)) return fail('Unknown account status.');
  return updateCurrent((user) => ({
    ...user,
    accountStatus: status,
    statusUpdatedAt: new Date().toISOString(),
    rejectionNote:
      status === ACCOUNT_STATUS.rejected
        ? 'Demo decision: ownership information needs to be updated before the account can be approved.'
        : '',
  }));
}

export async function updateCompany(input) {
  const errors = profileFieldErrors(input);
  if (hasErrors(errors)) return fail(Object.values(errors)[0], Object.keys(errors)[0]);
  const companyName = input.companyName.trim();
  return updateCurrent((user) => ({
    ...user,
    companyName,
    country: input.country,
    company: sanitizeCompany(input),
    team: user.team.map((member) =>
      member.owner ? { ...member, name: companyName, email: user.email } : member,
    ),
  }));
}

export async function addTeamMember(input) {
  const errors = teamMemberErrors(input);
  if (hasErrors(errors)) return fail(Object.values(errors)[0], Object.keys(errors)[0]);
  const workEmail = input.email.trim().toLowerCase();
  return updateCurrent((user) => {
    if (user.team.some((member) => member.email === workEmail)) {
      return invalid('That work email is already on the team.', 'email');
    }
    if (user.team.length >= 20) return invalid('This demo keeps up to 20 team members.');
    return {
      ...user,
      team: [
        ...user.team,
        {
          id: crypto.randomUUID(),
          name: input.name.trim(),
          email: workEmail,
          role: input.role,
          owner: false,
        },
      ],
    };
  });
}

export async function removeTeamMember(id) {
  return updateCurrent((user) => {
    const member = user.team.find((item) => item.id === id);
    if (!member) return invalid('Team member not found.');
    if (member.owner) return invalid('The owner cannot be removed.');
    return { ...user, team: user.team.filter((item) => item.id !== id) };
  });
}

function nextReference(db) {
  const reference = `CB-${db.nextRef}`;
  db.nextRef += 1;
  return reference;
}

export async function createQuote(input) {
  const errors = quoteFieldErrors(input);
  if (hasErrors(errors)) return fail(Object.values(errors)[0], Object.keys(errors)[0]);
  const amount = String(input.amount).replace(/,/g, '').trim();
  return updateCurrent((user, db) => {
    if (user.quotes.length >= 50) return invalid('This demo keeps up to 50 quote requests.');
    const quote = {
      id: crypto.randomUUID(),
      reference: nextReference(db),
      side: input.side,
      asset: input.asset,
      amount,
      currency: input.currency,
      settlement: input.settlement,
      notes: String(input.notes || '').trim().slice(0, 1000),
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };
    return { ...user, quotes: [quote, ...user.quotes] };
  });
}

export async function setQuoteStatus(id, status) {
  if (!Object.prototype.hasOwnProperty.call(QUOTE_STATUSES, status)) return fail('Unknown request status.');
  return updateCurrent((user) => {
    if (!user.quotes.some((quote) => quote.id === id)) return invalid('Request not found.');
    return {
      ...user,
      quotes: user.quotes.map((quote) => (quote.id === id ? { ...quote, status } : quote)),
    };
  });
}

export async function createMovement(input) {
  const current = readSession();
  if (!current) return fail('Sign in required.', 'auth');
  if (current.accountStatus !== ACCOUNT_STATUS.approved) {
    return fail('Available after account approval.', 'status');
  }
  const errors = movementFieldErrors(input);
  if (hasErrors(errors)) return fail(Object.values(errors)[0], Object.keys(errors)[0]);
  const amount = String(input.amount).replace(/,/g, '').trim();
  return updateCurrent((user, db) => {
    if (user.transactions.length >= 50) return invalid('This demo keeps up to 50 treasury requests.');
    const transaction = {
      id: crypto.randomUUID(),
      reference: nextReference(db),
      direction: input.direction === 'withdraw' ? 'withdraw' : 'deposit',
      asset: input.asset,
      amount,
      method: input.method,
      destination: input.direction === 'withdraw' ? String(input.destination || '').trim().slice(0, 120) : '',
      status: 'demo_not_sent',
      createdAt: new Date().toISOString(),
    };
    return { ...user, transactions: [transaction, ...user.transactions] };
  });
}

export async function createTicket(input) {
  const errors = ticketFieldErrors(input);
  if (hasErrors(errors)) return fail(Object.values(errors)[0], Object.keys(errors)[0]);
  return updateCurrent((user) => {
    if (user.tickets.length >= 50) return invalid('This demo keeps up to 50 messages.');
    const ticket = {
      id: crypto.randomUUID(),
      subject: input.subject.trim().slice(0, 140),
      message: input.message.trim().slice(0, 2000),
      email: user.email,
      status: 'stored_locally',
      createdAt: new Date().toISOString(),
    };
    return { ...user, tickets: [ticket, ...user.tickets] };
  });
}

export async function resetDemo() {
  const store = storage();
  try {
    store?.removeItem(STORAGE_DB_KEY);
    store?.removeItem(STORAGE_SESSION_KEY);
  } catch {
    return fail(STORAGE_ERROR);
  }
  emit();
  return { ok: true, user: null, error: '', field: null, step: null };
}

export const demoClient = {
  readSession,
  subscribe,
  signUp,
  signIn,
  signOut,
  requestPasswordReset,
  saveOnboarding,
  submitOnboarding,
  setAccountStatus,
  updateCompany,
  addTeamMember,
  removeTeamMember,
  createQuote,
  setQuoteStatus,
  createMovement,
  createTicket,
  resetDemo,
};
