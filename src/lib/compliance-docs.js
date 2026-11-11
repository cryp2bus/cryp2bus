/**
 * Public compliance copy.
 * The AML/KYC statement is a short summary of the operator's AML Policy
 * (version 2, issued 13 June 2024). It must not reproduce monitoring
 * thresholds, red-flag catalogues, SAR procedures, or personal names.
 * The ABC policy is the full text, with the personal signature removed.
 */

export const COMPLIANCE_PATHS = {
  hub: '/compliance',
  amlKyc: '/compliance/aml-kyc',
  abc: '/compliance/anti-bribery',
};

export const ABC_PDF_PATH = 'compliance/anti-bribery-corruption-policy.pdf';

export const OPERATOR_STATEMENT =
  'Cryp2bus is operated by TELEPORT FINANCIAL SERVICES s.r.o. (VASP, Czech Republic, IČO 21369909) under a white-label agreement with VS Digital Europe Ltd., a crypto-asset service provider authorised under MiCA by the Malta Financial Services Authority (LEI 984500G55775959B9C37).';

export const AML_KYC_STATEMENT = {
  title: 'AML/KYC Statement',
  eyebrow: 'Compliance',
  subtitle:
    'A public summary of customer due diligence and financial-crime controls applied by TELEPORT FINANCIAL SERVICES s.r.o.',
  sourceLabel: 'AML Policy, version 2, issued 13 June 2024',
  intro: [
    "This page summarises the AML Policy of TELEPORT FINANCIAL SERVICES s.r.o. (version 2, issued 13 June 2024). It describes, in general terms, how the company applies customer due diligence and controls against money laundering and terrorist financing.",
    "It is a summary for visitors to this website, not the internal policy. It does not set out monitoring thresholds or criteria, red-flag lists, suspicious-activity reporting procedures or forms, or internal workflows.",
  ],
  sections: [
    {
      title: "Legal basis",
      paragraphs: [
        "The company provides virtual-asset services that can be misused to conceal the proceeds of crime or to finance terrorism. The AML Policy is its internal system of rules and controls for meeting Czech law. The legal basis named in the policy is Act No. 253/2008 Coll., on measures against the legalization of proceeds from criminal activities and the financing of terrorism (the AML Act), as amended, together with Act No. 69/2006 Coll., on international sanctions, and approved anti-money laundering standards of the Czech National Bank. The company’s stated priority is compliance with the rules of the Czech Republic and the European Union and with FATF recommendations. Senior management is responsible for the obligations under the AML Act. An MLRO appointed under that Act represents the company before the Financial Analytical Office. The company applies sanction measures imposed by the Czech Republic and checks whether a customer is subject to international sanctions.",
      ],
    },
    {
      title: "Risk-based approach",
      paragraphs: [
        "Customer due diligence follows the risk of the relationship. Standard due diligence is used where the risk is low and national law permits it. Enhanced due diligence is used where the risk is higher, and the depth of diligence depends on the customer’s business and on a prior risk analysis. Before a relationship starts, the company prepares a risk profile and updates it afterwards. Customers are classed as low, mid, high, or prohibited risk. A high-risk customer is subject to enhanced due diligence. A prohibited-risk customer is not accepted: no relationship is established or kept, and the service is not provided.",
        "The company will not take on a customer from a high-risk third country, or a customer whose registered office is in such a country. The policy uses that term for countries identified by reliable sources, including the Financial Action Task Force and associated bodies, as lacking an effective regime or as having strategic deficiencies, and for third countries identified by the European Commission under Article 9 of Directive (EU) 2015/849. It does not continue business with natural or legal persons from high-risk third countries identified by the European Commission. It does not establish relationships with customers residing in the United States, and it does not provide services for UK citizens. The policy attributes the UK restriction to the regulatory requirements of the Financial Conduct Authority.",
      ],
    },
    {
      title: "Know your customer, know your business, and customer due diligence",
      paragraphs: [
        "The controls cover a customer in a business relationship, a person negotiating one, a former customer, and a user of the virtual-asset service, whether a natural person or a legal entity. A natural person always acts for a legal entity. Related persons include members of the statutory body, beneficial owners, controlling persons, and people authorised to act for the customer.",
        "Every individual and every corporate customer is identified and verified before a relationship starts. The company checks authority to act from a reliable source, identifies the beneficial owner and the ownership and control structure, and identifies the purpose of the expected business and, where necessary, the source and origin of funds. Transactions are considered against the customer’s business and payment patterns.",
        "An individual provides name, address, citizenship, date and place of birth, and a valid government-issued identity document, checked against a credible independent source. A natural person carrying on a business also provides the business name, tax identification, and principal place of business. A passport is accepted, as are an identity card, driving license, or residence permit issued by an EU Member State, Iceland, Norway, Switzerland, or Liechtenstein. A document that is expired, damaged, incomplete, or not credible is not used. A corporate customer provides its name, legal form, registered office, tax and registration details, and the identity of the person who represents it. Status is checked from corporate documents, including a commercial-register extract, constitutional documents, and ownership and director records. An extract used to confirm current representatives should not be older than six months. Directors and ultimate beneficial owners are identified and screened, including against sanctions lists and adverse media. The customer must cooperate. The company may refuse the relationship if the information cannot be verified, if an identity document is invalid, or if it suspects the customer is concealing that the relationship is for someone else. During the relationship it reviews identification data, ownership, beneficial ownership, politically exposed person status, and whether Czech international sanctions apply.",
      ],
    },
    {
      title: "Beneficial owners",
      paragraphs: [
        "A beneficial owner is the natural person who ultimately owns or controls the customer, or on whose behalf the relationship is conducted. For a company, that includes a person who directly or indirectly holds more than 25 percent of the shares or voting rights, or who otherwise exercises control. If no such person can be found, a person in senior management is treated as the beneficial owner. For a trust, the policy includes the settlor, the trustee, any supervisor, the beneficiary, and any other natural person who exercises control. Where registration is required, the company obtains confirmation or an extract from the Czech Central Register of Beneficial Owners or the relevant Member State register, and does not rely on that register alone. If the declared owner may be wrong, or the information incomplete, identification is repeated.",
      ],
    },
    {
      title: "Enhanced due diligence and politically exposed persons",
      paragraphs: [
        "Enhanced due diligence applies to higher-risk relationships and always to a high-risk customer, once the company has confirmed that the higher risk is present. Cases described in the policy include non-face-to-face business without adequate safeguards, unusual circumstances, links to a high-risk third country or to a country associated with serious corruption, crime, or terrorism, United Nations or European Union sanctions, significant cash activity, personal asset-holding vehicles, bearer shares, unusually complex ownership, products that allow anonymity, and payments from unknown third parties. Further measures can include evidence of the source of funds and of wealth, more information on the purpose of the relationship, closer monitoring, and approval by the management board. While enhanced due diligence applies, the risk profile is reassessed at least every six months.",
        "A politically exposed person is a natural person who holds a prominent public function. The policy’s definition includes senior government, parliamentary, judicial, central-bank, military, state-enterprise, political-party, and international-organisation roles. It also covers defined family members — a spouse or cohabitant, children and their spouses or cohabitants, and parents — and close associates. The company takes a declaration and checks the customer and the beneficial owner. If a politically exposed person is confirmed, enhanced due diligence applies and establishing the relationship is prohibited. The company does not engage with politically exposed persons, persons on sanctions lists, or their relatives.",
      ],
    },
    {
      title: "Sanctions screening",
      paragraphs: [
        "The company screens the customer, the beneficial owner, and any person who intends to enter a relationship or carry out a transaction, using international sanctions lists and other credible sources. Screening continues throughout the relationship for every active customer. If a person is subject to sanctions, or a transaction would breach sanctions, the company does not proceed, it applies the measures required by the sanctions rules, and it notifies the Financial Analytical Office.",
      ],
    },
    {
      title: "Transaction monitoring and crypto-asset transactions",
      paragraphs: [
        "Transactions are monitored throughout the relationship and compared with the company’s knowledge of the customer, the customer’s business, and the declared source of funds. Where the circumstances justify it, the company examines the origin of the customer’s assets, and it keeps the relationship information up to date. Transactions are reviewed both before and after they are carried out, singly and in series. Particular attention is given to large, complicated, or unusual transactions with no evident economic or lawful purpose, and to transactions with parties in third countries that international bodies have identified as having inadequate controls or as refusing to cooperate.",
        "Cryptocurrency wallet transactions are monitored through a specialist provider that analyses blockchain activity against watchlists. If suspicious activity is detected, or the risk of an internal wallet increases, the company suspends that wallet until the customer explains the activity. Suspicious activity at an external wallet address suspends the customer’s profile until the matter is clarified. A wallet assessed as high risk may result in suspension of both the wallet and the profile.",
      ],
    },
    {
      title: "Prohibited business sectors and restricted countries",
      paragraphs: [
        "The company does not onboard a customer associated with a prohibited business sector. In general terms, the sectors named in the policy cover unregulated financial services, binary options, multi-layered payment and money-service arrangements, shell banks and informal value transfer, unlicensed charities, cash-funded remittance and cash or check handling, unlicensed gambling, shell companies and bearer shares, evasion of security controls, counterfeit goods, unregulated pharmaceuticals and similar health-risk products, debt collection and credit repair, get-rich-quick schemes including pyramid and Ponzi schemes, adult services connected with exploitation, political or religious organizations engaged in hate speech, goods subject to export restrictions, arms, dual-use goods and human organs, transactions in living animals, mining and forest products, equity real-estate investment trusts, dating sites, and sanctioned entities. The policy notes limited exceptions for some categories. The company may also refuse a sector it classifies as restricted, even where the customer is permitted to operate in its home country.",
        "The internal lists of high-risk and prohibited jurisdictions are not published on this page. The company does not onboard a customer registered in a prohibited jurisdiction, including sanctioned countries and other jurisdictions it treats as extremely high risk. Customers may not carry out operations with prohibited countries. Activity linked to a high-risk country is subject to closer scrutiny.",
      ],
    },
    {
      title: "Record keeping",
      paragraphs: [
        "The customer file holds identification data and the documents gathered under the policy. Personal data collected to prevent money laundering and terrorist financing are used only for that purpose, and not for another purpose such as marketing. For eight years after the relationship ends, or after an occasional transaction, the company keeps copies of the documents and information obtained when financial-security measures were applied, and the records needed to identify the transactions.",
      ],
    },
    {
      title: "Right to refuse or terminate a relationship",
      paragraphs: [
        "If a required due-diligence measure cannot be applied, the company does not establish the relationship and does not carry out the transaction. Where the customer and the beneficial owner must be identified and that cannot be done, it does not provide the service and it terminates an existing relationship. It will also refuse or end a relationship where the customer does not cooperate or provides false, incomplete, or unreliable information or documents; where the relationship would serve an unauthorised third party; where enhanced due diligence is required and management has not agreed; where the customer or a related person is a politically exposed person or is on a sanctions list; where the customer is prohibited risk; where a beneficial owner cannot provide further information and has no valid reason; or where the company considers that the customer is involved in fraud, money laundering, or terrorist financing, or presents another legal or reputational risk it will not accept. Where termination is based on suspected money laundering, terrorist financing, or fraud, the policy requires it to take effect immediately.",
      ],
    },
    {
      title: "Reporting to the authorities",
      paragraphs: [
        "The company notifies the Financial Analytical Office of circumstances that indicate a suspicion of money laundering or terrorist financing. Where there is a justified suspicion that property involved in a transaction, or held in an account, is the proceeds of an offence other than money laundering or terrorist financing, it notifies the competent prosecutor. It also provides the Financial Analytical Office with the information on payments and transfers required by Czech law, and notifies that Office where a sanctions measure must be applied.",
      ],
    },
  ],
};

export const ABC_POLICY = {
  title: 'Anti-Bribery & Corruption (ABC) Policy',
  eyebrow: 'Compliance',
  subtitle:
    'Full text of the Anti-Bribery & Corruption Policy of TELEPORT FINANCIAL SERVICES s.r.o.',
  meta: [
    ['Company', 'TELEPORT FINANCIAL SERVICES s.r.o.'],
    ['Version', '1.0'],
    ['Date of issue', '13 June 2024'],
    ['Next review', 'Annual or sooner if required'],
  ],
  sections: [
    {
      title: '1. Purpose',
      paragraphs: [
        'This Policy sets out Teleport Financial Services s.r.o.’s (“Teleport” or the “Company”) commitment to conducting all business honestly, fairly and transparently. Its purpose is to:',
      ],
      bullets: [
        'articulate Teleport’s zero-tolerance position on bribery and corruption;',
        'comply with all applicable anti-bribery and corruption laws, including the Czech Criminal Code, UK Bribery Act 2010, U.S. FCPA and others;',
        'guide employees and third parties in identifying and preventing bribery, facilitation payments and corrupt conduct; and',
        'set roles, responsibilities, escalation mechanisms and disciplinary consequences.',
      ],
    },
    {
      title: '2. Scope',
      paragraphs: [
        'This Policy applies to all Teleport directors, officers, employees (permanent, temporary or contract), consultants, agents, intermediaries, suppliers, and any third parties acting on behalf of Teleport in every jurisdiction where Teleport operates.',
      ],
    },
    {
      title: '3. Definitions',
      bullets: [
        '“Bribe” – anything of value offered, promised, given or received to improperly influence a business decision.',
        '“Corruption” – abuse of entrusted power for private gain.',
        '“Facilitation payment” – small unofficial payment to expedite routine governmental actions.',
        '“Public Official” – any person holding legislative, administrative or judicial office, including employees of state-owned entities or international organisations.',
      ],
    },
    {
      title: '4. Policy Statement',
      paragraphs: [
        'Teleport adopts a ZERO-TOLERANCE approach to all forms of bribery and corruption. Covered Persons must never offer, pay, solicit or accept bribes, kickbacks, facilitation payments, or other improper advantages, either directly or through third parties.',
      ],
    },
    {
      title: '5. Prohibited Practices',
      paragraphs: ['Covered Persons are strictly prohibited from:'],
      bullets: [
        'offering, promising or giving a bribe;',
        'requesting, agreeing to receive or accepting a bribe;',
        'making facilitation payments;',
        'providing luxury gifts, hospitality or travel that could be perceived as undue influence;',
        'making political contributions or charitable donations on behalf of Teleport without prior written approval;',
        'engaging third parties without appropriate due diligence and contractual ABC clauses.',
      ],
    },
    {
      title: '6. Gifts & Hospitality',
      paragraphs: ['Modest, infrequent gifts and hospitality may be acceptable if they:'],
      bullets: [
        'are reasonable (≤ EUR 100);',
        'are transparent;',
        'are not cash or equivalents;',
        'are not intended to influence a business decision.',
      ],
      after: [
        'Anything above EUR 100 requires entry in the Gifts & Hospitality Register and Compliance Officer approval.',
      ],
    },
    {
      title: '7. Third-Party Due Diligence',
      paragraphs: [
        'Teleport conducts proportionate, risk-based due diligence on all third parties before engagement. Contracts include ABC representations and audit rights. High-risk relationships need enhanced review and Board approval.',
      ],
    },
    {
      title: '8. Record Keeping',
      paragraphs: [
        'Teleport maintains accurate books, records and accounts. Off-book accounts or falsified records are prohibited. Finance and Compliance ensure adequate internal controls.',
      ],
    },
    {
      title: '9. Roles & Responsibilities',
      bullets: [
        'Board of Directors – oversee and approve this Policy and receive ABC reports.',
        'Managing Director – ensure implementation and resources.',
        'Compliance Officer – develop procedures, maintain registers, monitor, investigate and report breaches.',
        'Covered Persons – comply with this Policy, complete training, and report concerns.',
      ],
    },
    {
      title: '10. Reporting & Whistleblowing',
      paragraphs: [
        'Covered Persons must report suspected violations to compliance@finteleport.org. Teleport prohibits retaliation against good-faith reporters.',
      ],
    },
    {
      title: '11. Training & Communication',
      paragraphs: [
        'All employees receive induction ABC training and annual refreshers. Completion logs are retained by HR. This Policy is published on the Company intranet.',
      ],
    },
    {
      title: '12. Breach & Disciplinary Actions',
      paragraphs: [
        'Violations may result in disciplinary action, termination, civil or criminal liability, and reporting to authorities.',
      ],
    },
    {
      title: '13. Monitoring & Review',
      paragraphs: [
        'The Compliance Officer monitors adherence through reviews and audits. The Policy is reviewed at least annually.',
      ],
    },
    {
      title: '14. Approval',
      paragraphs: [
        'Approved by the Board of Directors of TELEPORT FINANCIAL SERVICES s.r.o. on 14 June 2024.',
      ],
    },
  ],
};

export function amlStatementPlainText() {
  const lines = [
    AML_KYC_STATEMENT.title,
    AML_KYC_STATEMENT.sourceLabel,
    '',
    ...AML_KYC_STATEMENT.intro,
    '',
  ];
  for (const section of AML_KYC_STATEMENT.sections) {
    lines.push(section.title);
    lines.push('');
    for (const paragraph of section.paragraphs || []) lines.push(paragraph, '');
    for (const bullet of section.bullets || []) lines.push(`- ${bullet}`);
    if (section.bullets?.length) lines.push('');
    for (const paragraph of section.after || []) lines.push(paragraph, '');
  }
  return lines.join('\n').trim();
}

export function abcPolicyPlainText() {
  const lines = [
    'TELEPORT FINANCIAL SERVICES s.r.o.',
    'ANTI-BRIBERY & CORRUPTION (ABC) POLICY',
    ...ABC_POLICY.meta.map(([label, value]) => `${label}: ${value}`),
    '',
  ];
  for (const section of ABC_POLICY.sections) {
    lines.push(section.title);
    lines.push('');
    for (const paragraph of section.paragraphs || []) lines.push(paragraph, '');
    for (const bullet of section.bullets || []) lines.push(`- ${bullet}`);
    if (section.bullets?.length) lines.push('');
    for (const paragraph of section.after || []) lines.push(paragraph, '');
  }
  return lines.join('\n').trim();
}
