export type CountriesDto = CountryDto[];

export type CountryDto = {
    id: number;
    name: string;
} & (CountrySchengenDto | CountryNonSchengenDto);

interface CountrySchengenDto {
    is_in_schengen: true;
}

interface CountryNonSchengenDto {
    is_in_schengen: false;
    is_passport_required: boolean;
    is_visa_required: boolean;
}
