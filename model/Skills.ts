export const skillEassiType = 'flexssi_skills_v3';

export const softSkills: { [key: string]: string } = {
  ['Spreekt vloeiend Engels']: 'ja',
  ['Assertief']: 'ja',
  ['Zelfstandig werken']: 'ja',
  ['Goed in presenteren']: 'ja',
  ['Besluitvaardig']: 'ja',
  ['Analytisch vermogen']: 'ja',
};

/**
 * The only keys we request (selective disclosure)
 */
export const disclosureSoftSkills: { [key: string]: string } = {
  ['Spreekt vloeiend Engels']: 'ja',
  ['Zelfstandig werken']: 'ja',
  ['Goed in presenteren']: 'ja',
};

/*
[
  "Spreekt vloeiend Engels",
  "Assertief",
  "Zelfstandig werken",
  "Goed in presenteren",
  "Besluitvaardig",
  "Analytisch vermogen"
]
*/
