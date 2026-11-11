/** Visible brand on the client demo. */
export const BRAND = 'Cryp2bus';

/** Corporate contact. Not a personal mailbox. */
export const CONTACT_EMAIL = 'b2b@cryp2bus.com';

/**
 * Operator disclosure for the client demo.
 * Edit `disclosure` to change the wording everywhere it is shown.
 */
export const LEGAL = {
  disclosure:
    'Cryp2bus is operated by TELEPORT FINANCIAL SERVICES s.r.o. (VASP, Czech Republic, IČO 21369909) under a white-label agreement with VS Digital Europe Ltd., a crypto-asset service provider authorised under MiCA by the Malta Financial Services Authority (LEI 984500G55775959B9C37).',
};

export const STORAGE_DB_KEY = 'cryp2bus.demo.v1';
export const STORAGE_SESSION_KEY = 'cryp2bus.demo.session';

export const ACCOUNT_STATUS = {
  pending_onboarding: 'pending_onboarding',
  under_review: 'under_review',
  approved: 'approved',
  rejected: 'rejected',
};

export const STATUS_META = {
  pending_onboarding: {
    label: 'Onboarding required',
    summary: 'Finish the company profile before this account can be reviewed.',
  },
  under_review: {
    label: 'Under review',
    summary: 'The application is submitted. A reviewer decision is simulated in this demo.',
  },
  approved: {
    label: 'Approved',
    summary: 'The account is approved in this demo. Live settlement is not connected.',
  },
  rejected: {
    label: 'Rejected',
    summary: 'The application was not accepted. Update the details and submit it again.',
  },
};

/** European countries for the company registration form. */
export const EUROPEAN_COUNTRIES = [
  'Albania',
  'Andorra',
  'Austria',
  'Belarus',
  'Belgium',
  'Bosnia and Herzegovina',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Ireland',
  'Italy',
  'Kosovo',
  'Latvia',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Moldova',
  'Monaco',
  'Montenegro',
  'Netherlands',
  'North Macedonia',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Russia',
  'San Marino',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
  'Ukraine',
  'United Kingdom',
  'Vatican City',
];

export const BUSINESS_TYPES = [
  'Corporate treasury',
  'Import and export',
  'E-commerce',
  'Payment services',
  'Fintech',
  'Asset management',
  'Professional services',
  'Manufacturing',
  'Other',
];

export const MONTHLY_VOLUMES = [
  'Under €100,000',
  '€100,000 – €500,000',
  '€500,000 – €2 million',
  '€2 million – €10 million',
  'Over €10 million',
];

/**
 * KYB document checklist.
 * Replace this array when the final list is confirmed.
 */
export const KYB_DOCUMENTS = [
  {
    id: 'incorporation',
    label: 'Certificate of incorporation',
    hint: 'Or an equivalent official company extract.',
  },
  {
    id: 'articles',
    label: 'Articles of association',
    hint: 'Current constitutional documents.',
  },
  {
    id: 'address',
    label: 'Proof of registered address',
    hint: 'Issued within the last 3 months.',
  },
  {
    id: 'directors',
    label: 'Register of directors',
    hint: 'Official extract listing the directors.',
  },
  {
    id: 'ownership',
    label: 'UBO and ownership structure',
    hint: 'Chart or register of beneficial owners.',
  },
  {
    id: 'identity',
    label: 'Identity documents',
    hint: 'Passport or national ID for each director and beneficial owner.',
  },
  {
    id: 'funds',
    label: 'Source of funds',
    hint: 'Recent corporate bank statement or equivalent.',
  },
];

export const ASSETS = ['BTC', 'ETH', 'USDT', 'USDC'];
export const FIAT = ['EUR', 'USD', 'GBP', 'CHF'];
export const MOVEMENT_ASSETS = ['EUR', 'BTC', 'ETH', 'USDT', 'USDC'];
export const SETTLEMENTS = ['SEPA', 'SWIFT', 'Crypto'];
export const TEAM_ROLES = ['Admin', 'Trader', 'Viewer'];

export const QUOTE_STATUSES = {
  submitted: 'Submitted',
  quoted: 'Quoted',
  declined: 'Declined',
  expired: 'Expired',
};

export const SAMPLE_BALANCES = [
  { asset: 'EUR', value: '250,000.00' },
  { asset: 'BTC', value: '1.25000000' },
  { asset: 'ETH', value: '18.400000' },
  { asset: 'USDT', value: '75,000.00' },
];

export const SAMPLE_ACTIVITY = [
  { id: 'sample-otc', kind: 'OTC buy', detail: 'BTC / EUR', amount: '1.25 BTC', status: 'Sample' },
  { id: 'sample-deposit', kind: 'Deposit', detail: 'SEPA', amount: '€100,000.00', status: 'Sample' },
  { id: 'sample-withdraw', kind: 'Withdrawal', detail: 'USDC transfer', amount: '50,000 USDC', status: 'Sample' },
];

export const ZERO_BALANCES = [
  { asset: 'EUR', value: '0.00' },
  { asset: 'BTC', value: '0.00000000' },
  { asset: 'ETH', value: '0.000000' },
  { asset: 'USDT', value: '0.00' },
];
