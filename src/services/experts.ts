export interface Expert {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  distanceKm: number;
  rating: number;
}

const MOCK_EXPERTS: Expert[] = [
  { id: 'ex1', name: 'Tawanda M.', specialty: 'Mechanic', phone: '+263771112223', distanceKm: 2.4, rating: 4.7 },
  { id: 'ex2', name: 'Rudo P.', specialty: 'Legal Aid', phone: '+263772223334', distanceKm: 5.1, rating: 4.6 },
  { id: 'ex3', name: 'Dr. Ncube', specialty: 'Vet', phone: '+263773334445', distanceKm: 3.2, rating: 4.8 },
  { id: 'ex4', name: 'Nyasha K.', specialty: 'Nutritionist', phone: '+263774445556', distanceKm: 1.9, rating: 4.5 },
];

export async function findExpertsNear(categoryOrKeyword: string): Promise<Expert[]> {
  await new Promise(r => setTimeout(r, 300));
  // Simple filter by keyword present in specialty (mock)
  const kw = categoryOrKeyword.toLowerCase();
  const filtered = MOCK_EXPERTS.filter(e => e.specialty.toLowerCase().includes(kw));
  return (filtered.length ? filtered : MOCK_EXPERTS).slice(0, 3);
}


