export interface AirportForm {
    name: string;
    iata: string;
    countryId: string;
    regions: string[];
    regionsFilter: string;
    vaccinationNotes?: string;
}
