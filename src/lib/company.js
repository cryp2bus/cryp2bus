/** Brand and legal operator for Cryp2bus (cryp2bus.com). */
export const OPERATOR_STATEMENT =
  'Cryp2bus is operated by TELEPORT FINANCIAL SERVICES s.r.o. (VASP, Czech Republic, IČO 21369909) under a white-label agreement with VS Digital Europe Ltd., a crypto-asset service provider authorised under MiCA by the Malta Financial Services Authority (LEI 984500G55775959B9C37).';

export const COMPANY = {
  brand: 'Cryptobus',
  publisher: 'Cryp2bus',
  domain: 'cryp2bus.com',
  legalName: 'TELEPORT FINANCIAL SERVICES s.r.o.',
  license:
    'VASP (Czech Republic). White-label agreement with VS Digital Europe Ltd., a crypto-asset service provider authorised under MiCA by the Malta Financial Services Authority (LEI 984500G55775959B9C37).',
  licenseNote:
    'VASP in the Czech Republic, under a white-label agreement with VS Digital Europe Ltd., a crypto-asset service provider authorised under MiCA by the Malta Financial Services Authority (LEI 984500G55775959B9C37).',
  ico: '21369909',
  legalForm: 'Společnost s ručením omezeným (s.r.o.)',
  country: 'Czech Republic',
  address: 'Cimburkova 916/8, Žižkov, 130 00 Prague 3, Czech Republic',
  courtRegistry: 'Municipal Court in Prague',
  email: 'b2b@cryp2bus.com',
  phone: '+48573569975',
  phoneDisplay: '+48 573 569 975',
};

export function companyFooterLine() {
  return `${COMPANY.legalName} · IČO ${COMPANY.ico} · ${COMPANY.address}`;
}

export function mailtoHref() {
  return `mailto:${COMPANY.email}`;
}

export function telHref() {
  return `tel:${COMPANY.phone.replace(/\s+/g, '')}`;
}
