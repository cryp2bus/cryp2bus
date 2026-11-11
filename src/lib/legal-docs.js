import { COMPANY, OPERATOR_STATEMENT } from './company.js';

const OPERATOR = `${OPERATOR_STATEMENT} Registered address: ${COMPANY.address}. Registered with the ${COMPANY.courtRegistry}.`;

export const LEGAL_SLUGS = [
  'terms',
  'privacy',
  'aml',
  'kyc',
  'risk',
  'cookies',
  'restricted',
  'complaints',
];

export const LEGAL_DOCS = {
  terms: {
    title: 'Terms of Service',
    updated: '11 November 2026',
    description: `Terms of Service for the Cryp2bus website. ${OPERATOR_STATEMENT}`,
    sections: [
      {
        title: '1. Agreement',
        text: `These Terms of Service govern access to and use of the Cryp2bus website and related marketing materials operated under ${COMPANY.domain} by ${COMPANY.legalName} ${OPERATOR_STATEMENT} By using the site, you agree to these Terms.`,
      },
      {
        title: '2. Operator',
        text: OPERATOR,
      },
      {
        title: '3. Nature of the service',
        text: 'This website presents information about Cryptobus B2B crypto transaction infrastructure. Availability of any product or service is subject to KYB/KYC, AML checks, and applicable regulatory requirements. Nothing on this site constitutes an offer to the public in a restricted jurisdiction.',
      },
      {
        title: '4. Lead requests',
        text: 'By submitting a contact or account request form, you confirm that the information provided is accurate and that you are authorized to act on behalf of the stated company where applicable.',
      },
      {
        title: '5. No investment advice',
        text: 'Cryptobus does not provide investment, legal, or tax advice. Crypto assets are volatile. You are solely responsible for assessing suitability for your business.',
      },
      {
        title: '6. Intellectual property',
        text: `All trademarks, logos, and content on this site are owned by Cryptobus / ${COMPANY.legalName} or its licensors and may not be used without prior written permission.`,
      },
      {
        title: '7. Limitation of liability',
        text: `To the maximum extent permitted by law, Cryptobus and ${COMPANY.legalName} are not liable for indirect, incidental, or consequential damages arising from use of this website or reliance on its content.`,
      },
      {
        title: '8. Changes',
        text: 'We may update these Terms from time to time. The version published on this page is the current version.',
      },
      {
        title: '9. Contact',
        text: `For questions about these Terms, contact us at ${COMPANY.email} or ${COMPANY.phoneDisplay}, or via the request form on this website. Operator: ${COMPANY.legalName}, ${COMPANY.address}.`,
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: '11 November 2026',
    description:
      `Privacy Policy for Cryp2bus. ${COMPANY.legalName} is the data controller. Describes lead forms, cookies, and Meta Pixel.`,
    sections: [
      {
        title: '1. Controller',
        text: `${OPERATOR_STATEMENT} The data controller for Cryp2bus (${COMPANY.domain}) is ${COMPANY.legalName} (IČO ${COMPANY.ico}), ${COMPANY.address}, registered with the ${COMPANY.courtRegistry}. Personal data submitted through lead forms and collected via necessary cookies is processed as described in this Policy.`,
      },
      {
        title: '2. Data we collect',
        text: 'We may collect: name, email, phone, company name, message content, OTC request details, UTM / campaign parameters, technical data (IP address, browser type, device), and cookie consent status. If you accept cookies, Meta Pixel may also receive technical data about your visit, as described below.',
      },
      {
        title: '3. Purposes',
        text: 'Personal data is processed to: respond to business inquiries; evaluate onboarding interest; improve the website; measure marketing attribution; and comply with applicable law.',
      },
      {
        title: '4. Legal bases',
        text: 'Processing is based on your consent (form checkbox and cookie banner), legitimate interest in operating a B2B marketing site, and where applicable pre-contractual steps at your request.',
      },
      {
        title: '5. Storage and security',
        text: 'Lead data is stored in our CRM / Google Sheets infrastructure used across Cryptobus marketing properties. We apply organizational and technical measures appropriate to the risk.',
      },
      {
        title: '6. Sharing',
        text: 'Data may be shared with service providers that process data on our behalf (hosting, analytics, spreadsheet / CRM tools). If you accept cookies, page views are also sent to Meta Platforms, Inc. through Meta Pixel (ID 1490653782880679) so we can measure advertising. We do not sell personal data. If you decline cookies, that pixel is not loaded.',
      },
      {
        title: '7. Retention',
        text: 'Lead data is retained for as long as needed to handle your request and for legitimate business records, unless a longer period is required by law or you request deletion where applicable.',
      },
      {
        title: '8. Your rights',
        text: 'Depending on your jurisdiction, you may request access, rectification, erasure, restriction, objection, or data portability, and you may withdraw consent at any time without affecting prior lawful processing.',
      },
      {
        title: '9. Cookies',
        text: 'See our Cookie Policy for details on cookie use, Meta Pixel, and how to accept or decline.',
      },
      {
        title: '10. Advertising measurement (Meta Pixel)',
        text: `Meta Pixel, ID 1490653782880679, is a measurement tool provided by Meta Platforms, Inc. We load it only after you press Accept on the cookie banner. It can send page-view events and, after a successful lead or OTC quote submission, a Lead event, plus technical data (such as IP address, browser, device, and pages viewed) to Meta, and Meta may set its own cookies. Pressing Decline means the pixel script is not added and no PageView or Lead event is sent. A failed submit does not send Lead. Clearing stored site data for ${COMPANY.domain} removes the saved choice and shows the banner again. The data controller remains ${COMPANY.legalName}`,
      },
      {
        title: '11. Contact',
        text: `To exercise privacy rights, email ${COMPANY.email} or use the contact form on this site. Controller: ${COMPANY.legalName}, IČO ${COMPANY.ico}, ${COMPANY.address}.`,
      },
    ],
  },
  aml: {
    title: 'AML Policy',
    updated: '24 August 2026',
    description: `AML policy for Cryp2bus. ${OPERATOR_STATEMENT}`,
    sections: [
      {
        title: '1. Overview',
        text: `${OPERATOR_STATEMENT} Cryp2bus applies anti-money-laundering (AML) controls consistent with a B2B crypto settlement model. Clients are expected to use the platform only for legitimate corporate purposes.`,
      },
      {
        title: '2. Customer due diligence',
        text: 'Corporate clients complete KYB. Directors and ultimate beneficial owners complete identity checks. Enhanced due diligence may apply based on risk.',
      },
      {
        title: '3. Screening',
        text: 'Parties, transactions, and wallets may be screened against applicable sanctions and watchlists before settlement.',
      },
      {
        title: '4. Monitoring',
        text: 'Transaction patterns may be monitored. Suspicious activity may be escalated, delayed, or declined.',
      },
      {
        title: '5. Prohibited use',
        text: 'Cryptobus does not facilitate circumventing banking AML/KYC checks, sanctions, currency controls, or exchange restrictions.',
      },
    ],
  },
  kyc: {
    title: 'KYC / KYB Policy',
    updated: '24 August 2026',
    description: 'KYC and KYB policy for Cryptobus corporate clients.',
    sections: [
      {
        title: '1. KYB for companies',
        text: 'Every corporate client completes Know-Your-Business verification before transactions are enabled.',
      },
      {
        title: '2. KYC for individuals',
        text: 'Directors and UBOs undergo identity verification as required by risk and regulation.',
      },
      {
        title: '3. Documents',
        text: 'Typical documents may include company registration extracts, ownership charts, proof of address, and government-issued ID for relevant individuals. Exact requirements depend on jurisdiction and risk profile.',
      },
      {
        title: '4. Ongoing review',
        text: 'Cryptobus may request updated information and may suspend access if verification cannot be completed.',
      },
    ],
  },
  risk: {
    title: 'Risk Disclosure',
    updated: '24 August 2026',
    description: 'Risk disclosure for Cryptobus crypto transaction infrastructure.',
    sections: [
      {
        title: '1. Volatility',
        text: 'Crypto-asset prices can move quickly and substantially. Businesses may lose value between quote and settlement.',
      },
      {
        title: '2. Operational risk',
        text: 'Network congestion, wallet errors, banking delays, and compliance reviews may affect timing of settlements.',
      },
      {
        title: '3. Regulatory risk',
        text: 'Rules applicable to crypto and cross-border payments change over time and may restrict availability in certain countries.',
      },
      {
        title: '4. No guarantee',
        text: 'Indicative rates shown on the marketing site are not executable quotes. Final pricing is confirmed only through an approved RFQ / OTC process.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: '11 November 2026',
    description:
      'Cookie Policy for Cryptobus, including the consent banner and Meta Pixel ID 1490653782880679.',
    sections: [
      {
        title: '1. What are cookies',
        text: 'Cookies are small text files stored on your device. Similar technologies (localStorage / sessionStorage) may be used for the same purposes.',
      },
      {
        title: '2. How we use them',
        text: 'We use cookies and storage to remember whether you accepted or declined cookies, to keep UTM campaign attribution during your visit, and to run the site. Advertising measurement runs only if you accept.',
      },
      {
        title: '3. Types',
        text: 'Strictly necessary storage remembers your Accept or Decline choice and supports core navigation. Preference / attribution storage helps connect marketing traffic to lead submissions. Advertising cookies and similar technologies are used only after you accept.',
      },
      {
        title: '4. Meta Pixel',
        text: `If you press Accept, we load Meta Pixel, ID 1490653782880679, from Meta Platforms, Inc. (connect.facebook.net). The pixel sends a PageView when it loads and again when you move between pages in the site. After a lead form or an OTC quote request is submitted successfully, it also sends a Lead event (the OTC event includes content_name otc-quote). Meta may set cookies and receive technical data such as IP address, browser, device, and the page URL so we can measure advertising. If you press Decline, we do not load the pixel script, we do not send a PageView or Lead event, and the in-site tracker does not run. A failed or invalid form submit does not send Lead. The choice is stored in local storage under this site. Clearing site data for ${COMPANY.domain} shows the banner again.`,
      },
      {
        title: '5. Managing cookies',
        text: 'Use Accept or Decline on the banner. You can also clear or block cookies in your browser settings. If you disable storage, the site may not remember your choice.',
      },
      {
        title: '6. More information',
        text: 'See also our Privacy Policy for how personal data related to cookies and Meta Pixel is handled, and who the data controller is.',
      },
    ],
  },
  restricted: {
    title: 'Restricted Countries',
    updated: '24 August 2026',
    description: 'Where Cryptobus availability is restricted by compliance requirements.',
    sections: [
      {
        title: '1. Availability',
        text: 'Cryptobus availability depends on regulatory and compliance requirements. Support for a country on the marketing coverage map does not guarantee account approval.',
      },
      {
        title: '2. Restricted / prohibited',
        text: 'We do not onboard clients from jurisdictions subject to comprehensive sanctions or where providing the service would breach applicable law. The definitive restricted list is maintained by compliance and may change without notice.',
      },
      {
        title: '3. Coming soon',
        text: 'Some markets may be marked as coming soon while licensing, banking rails, or local requirements are being assessed.',
      },
      {
        title: '4. Questions',
        text: 'If you are unsure whether your company can be onboarded, submit a request via the contact form and our team will advise.',
      },
    ],
  },
  complaints: {
    title: 'Complaints',
    updated: '24 August 2026',
    description: 'How to complain about Cryptobus marketing or an onboarding interaction.',
    sections: [
      {
        title: '1. How to complain',
        text: 'If you have a complaint about Cryptobus marketing communications or an onboarding interaction, submit details via the website contact form with the subject “Complaint”.',
      },
      {
        title: '2. What to include',
        text: 'Please include your name, company, contact details, a clear description of the issue, and any relevant reference numbers or dates.',
      },
      {
        title: '3. Handling',
        text: 'We aim to acknowledge complaints promptly and investigate in good faith. Complex matters may take longer where compliance review is required.',
      },
      {
        title: '4. Escalation',
        text: `Where required by law, you may also have the right to escalate to a competent authority or dispute-resolution body in your jurisdiction, including in the Czech Republic where ${COMPANY.legalName} is registered.`,
      },
    ],
  },
};
