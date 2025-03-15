export interface Airport {
    id: number;
    name: string;
    iata: string;
    countryId: number;
    regions: number[];
    vaccinationNotes?: string;
}
