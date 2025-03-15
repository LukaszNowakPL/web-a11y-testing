export type AirportsDto = AirportDto[];

export interface AirportDto {
    id: number;
    name: string;
    iata: string;
    country_id: number;
    regions: number[];
    vaccination_notes?: string;
}

export interface AirportModel {
    name: string;
    iata: string;
    country_id: number;
    regions: number[];
    vaccination_notes?: string;
}
