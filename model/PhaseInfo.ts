export interface PhaseInfo {
  currentPhase: string;
  weekNumber: string;
  numberContracts: string;
  weeklyHours: string;
  totalHours: string;
  currentIsOnCallWorker: string;
  currentEmployer: string;
  currentWeeklyHours: string;
}

export const phaseInfoKeys: { label: string; key: keyof PhaseInfo }[] = [
  {
    label: 'Huidige Fase',
    key: 'currentPhase',
  },
  {
    label: 'Peilweeknummer',
    key: 'weekNumber',
  },
  {
    label: 'Aantal contracten',
    key: 'numberContracts',
  },
  {
    label: 'Contracturen',
    key: 'weeklyHours',
  },
  {
    label: 'Gemaakte uren',
    key: 'totalHours',
  },
  {
    label: 'Huidige plaatsing als oproepkracht',
    key: 'currentIsOnCallWorker',
  },
  {
    label: 'Opdrachtgever huidige plaatsing',
    key: 'currentEmployer',
  },
  {
    label: 'Huidige uren plaatsing',
    key: 'currentWeeklyHours',
  },
];
