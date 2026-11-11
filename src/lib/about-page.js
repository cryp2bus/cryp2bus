import { COMPANY, OPERATOR_STATEMENT } from './company.js';

export const ABOUT_PAGE = {
  title: 'Built for Businesses That Need Crypto Infrastructure',
  subtitle: 'Not another retail trading app.',
  description: OPERATOR_STATEMENT,
  problemTitle: 'The problem we solve',
  problem: [
    'Traditional crypto platforms are primarily designed around retail traders or institutional investors. Businesses often face a different problem: they need to acquire digital assets or execute legitimate commercial settlements while navigating banking, compliance and operational complexity.',
    'Cryptobus creates a dedicated B2B transaction layer designed around corporate workflows — making it simple to buy crypto, pay invoices, and settle globally through one compliant business account.',
  ],
  licensingTitle: 'Company & licensing',
  licensingIntro: OPERATOR_STATEMENT,
  sections: [
    {
      title: 'Our Mission',
      body: 'Build a dedicated B2B transaction layer designed around corporate workflows — not retail trading.',
    },
    {
      title: 'Our Infrastructure',
      body: 'A secure settlement infrastructure connecting fiat and digital assets for businesses.',
    },
    {
      title: 'Our Approach to Compliance',
      body: 'KYB, AML, sanctions screening, and transaction monitoring embedded into every flow.',
    },
    {
      title: 'Global Coverage',
      body: 'Cross-border business transactions, subject to regulatory and compliance requirements.',
    },
    {
      title: 'Contact',
      body: `Email ${COMPANY.email} or call ${COMPANY.phoneDisplay}. You can also use the request form on this website.`,
    },
  ],
  leadershipTitle: 'Leadership',
  leadership:
    'Leadership profiles, roles, and LinkedIn links will be published here soon. Content is being prepared and will appear on this page once confirmed.',
};
