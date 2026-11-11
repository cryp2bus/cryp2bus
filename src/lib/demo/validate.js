import { isValidEmail } from '@/lib/formValidation';
import {
  ASSETS,
  BUSINESS_TYPES,
  EUROPEAN_COUNTRIES,
  FIAT,
  KYB_DOCUMENTS,
  MONTHLY_VOLUMES,
  MOVEMENT_ASSETS,
  SETTLEMENTS,
  TEAM_ROLES,
} from './config';

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

export function firstError(errors) {
  const value = Object.values(errors)[0];
  return typeof value === 'string' ? value : '';
}

export function isWebsite(value) {
  const trimmed = value?.trim() ?? '';
  if (!trimmed) return true;
  if (trimmed.length > 200 || /\s/.test(trimmed)) return false;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    return url.hostname.includes('.') && !url.hostname.startsWith('.');
  } catch {
    return false;
  }
}

export function signUpFieldErrors(input) {
  const errors = {};
  if ((input.companyName?.trim() ?? '').length < 2) errors.companyName = 'Enter the company name.';
  if (!EUROPEAN_COUNTRIES.includes(input.country)) errors.country = 'Select the country of registration.';
  if (!isValidEmail(input.email?.trim() ?? '')) errors.email = 'Enter a valid work email.';
  if (!input.password || input.password.length < 8) errors.password = 'Use at least 8 characters.';
  else if (input.password.length > 128) errors.password = 'Use at most 128 characters.';
  if (input.confirmPassword !== undefined && input.password !== input.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  if (!input.acceptedTerms) errors.acceptedTerms = 'Accept the terms to create an account.';
  return errors;
}

export function companyFieldErrors(company = {}) {
  const errors = {};
  if ((company.registrationNumber?.trim() ?? '').length < 2) {
    errors.registrationNumber = 'Enter the registration number.';
  }
  if ((company.address?.trim() ?? '').length < 8) {
    errors.address = 'Enter the registered address.';
  }
  if (!isWebsite(company.website)) errors.website = 'Enter a valid website, or leave it blank.';
  if (!BUSINESS_TYPES.includes(company.businessType)) errors.businessType = 'Select a business type.';
  if (!MONTHLY_VOLUMES.includes(company.monthlyVolume)) {
    errors.monthlyVolume = 'Select the expected monthly volume.';
  }
  return errors;
}

function ownershipValue(value) {
  const number = Number(String(value ?? '').replace(',', '.').trim());
  return Number.isFinite(number) ? number : null;
}

export function peopleFieldErrors(people) {
  const result = { form: '', rows: {} };
  if (!Array.isArray(people) || people.length === 0) {
    result.form = 'Add at least one director and one beneficial owner.';
    return result;
  }

  people.forEach((person, index) => {
    const row = {};
    if (!['director', 'ubo', 'both'].includes(person?.role)) row.role = 'Select a role.';
    if ((person?.name?.trim() ?? '').length < 2) row.name = 'Enter the legal name.';
    if (!EUROPEAN_COUNTRIES.includes(person?.residence)) row.residence = 'Select a country of residence.';
    if (person?.role === 'ubo' || person?.role === 'both') {
      const ownership = ownershipValue(person.ownership);
      if (ownership == null || ownership <= 0 || ownership > 100) {
        row.ownership = 'Enter an ownership percentage above 0 and up to 100.';
      }
    }
    if (Object.keys(row).length > 0) result.rows[person?.id || index] = row;
  });

  const hasDirector = people.some((person) => person?.role === 'director' || person?.role === 'both');
  const hasOwner = people.some((person) => person?.role === 'ubo' || person?.role === 'both');
  if (!hasDirector) {
    result.form = 'Add at least one director. One person can be both a director and a beneficial owner.';
  } else if (!hasOwner) {
    result.form = 'Add at least one beneficial owner.';
  }
  return result;
}

export function peopleHaveErrors(result) {
  return Boolean(result.form) || Object.keys(result.rows).length > 0;
}

export function documentError(documents) {
  const missing = KYB_DOCUMENTS.some(
    (item) => !documents?.some((doc) => doc.requirementId === item.id && String(doc.name || '').trim()),
  );
  if (!missing) return '';
  return 'Attach every document on the checklist. Placeholder names are enough in this demo.';
}

export function onboardingProblem(payload) {
  const companyErrors = companyFieldErrors(payload.company);
  if (hasErrors(companyErrors)) {
    return { error: firstError(companyErrors), step: 'company', field: Object.keys(companyErrors)[0] };
  }
  const people = peopleFieldErrors(payload.people);
  if (peopleHaveErrors(people)) {
    const row = Object.values(people.rows)[0];
    return { error: people.form || firstError(row || {}), step: 'people' };
  }
  const documents = documentError(payload.documents);
  if (documents) return { error: documents, step: 'documents' };
  return null;
}

export function quoteFieldErrors(input) {
  const errors = {};
  if (!['buy', 'sell'].includes(input.side)) errors.side = 'Select buy or sell.';
  if (!ASSETS.includes(input.asset)) errors.asset = 'Select an asset.';
  const amount = Number(String(input.amount ?? '').replace(/,/g, '').trim());
  if (!Number.isFinite(amount) || amount <= 0) errors.amount = 'Enter an amount greater than zero.';
  if (!FIAT.includes(input.currency)) errors.currency = 'Select a currency.';
  if (!SETTLEMENTS.includes(input.settlement)) errors.settlement = 'Select how the trade should settle.';
  return errors;
}

export function movementFieldErrors(input) {
  const errors = {};
  if (!MOVEMENT_ASSETS.includes(input.asset)) errors.asset = 'Select an asset.';
  const amount = Number(String(input.amount ?? '').replace(/,/g, '').trim());
  if (!Number.isFinite(amount) || amount <= 0) errors.amount = 'Enter an amount greater than zero.';
  if (!SETTLEMENTS.includes(input.method)) errors.method = 'Select a method.';
  if (input.direction === 'withdraw' && (input.destination?.trim() ?? '').length < 8) {
    errors.destination = 'Enter an IBAN or wallet address.';
  }
  return errors;
}

export function teamMemberErrors(input) {
  const errors = {};
  if ((input.name?.trim() ?? '').length < 2) errors.name = 'Enter a name.';
  if (!isValidEmail(input.email?.trim() ?? '')) errors.email = 'Enter a valid work email.';
  if (!TEAM_ROLES.includes(input.role)) errors.role = 'Select a role.';
  return errors;
}

export function ticketFieldErrors(input) {
  const errors = {};
  if ((input.subject?.trim() ?? '').length < 3) errors.subject = 'Enter a subject.';
  if ((input.message?.trim() ?? '').length < 10) errors.message = 'Enter a message of at least 10 characters.';
  return errors;
}

export function profileFieldErrors(input) {
  const errors = {};
  if ((input.companyName?.trim() ?? '').length < 2) errors.companyName = 'Enter the company name.';
  if (!EUROPEAN_COUNTRIES.includes(input.country)) errors.country = 'Select the country of registration.';
  Object.assign(errors, companyFieldErrors(input));
  return errors;
}
