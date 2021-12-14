export interface Passport {
  nationality: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  gender: string;
  length: string;
  bsn: string;
  documentNumber: string;
  documentDateOfIssue: string;
  documentValidUntil: string;
}

export const passportKeys: { label: string; key: keyof Passport }[] = [
  {
    label: 'Nationaliteit',
    key: 'nationality',
  },
  {
    label: 'Voornamen',
    key: 'firstName',
  },
  {
    label: 'Achternaam',
    key: 'lastName',
  },
  {
    label: 'Geboortedatum',
    key: 'birthDate',
  },
  {
    label: 'Geboorteplaats',
    key: 'birthPlace',
  },
  {
    label: 'Geslacht',
    key: 'gender',
  },
  {
    label: 'Lengte',
    key: 'length',
  },
  {
    label: 'Burgerservicenummer (BSN)',
    key: 'bsn',
  },
  {
    label: 'Documentnummer paspoort',
    key: 'documentNumber',
  },
  {
    label: 'Datum van afgifte paspoort',
    key: 'documentDateOfIssue',
  },
  {
    label: 'Geldig tot paspoort',
    key: 'documentValidUntil',
  },
  {
    label: 'Achternaam',
    key: 'lastName',
  },
];
