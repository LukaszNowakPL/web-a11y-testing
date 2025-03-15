import {AirportDto} from '../../../api/rest/airports.dto';
import {Airport} from './types';
import {RegionsDto} from '../../../api/rest/regions.dto';
import {CountriesDto, CountryDto} from '../../../api/rest/countries.dto';

export const mapAirport = ({country_id: countryId, vaccination_notes: vaccinationNotes, ...airport}: AirportDto): Airport => {
    return {
        ...airport,
        countryId,
        vaccinationNotes,
    };
};

export const getRegions = (regions: RegionsDto, regionId: Airport['regions'][0]) => {
    const region = regions.find(({id}) => id === regionId);
    if (region === undefined) {
        throw new Error(`Region (${regionId}) not found.`);
    }
    return region;
};

export const getCountry = (countries: CountriesDto, countryId: CountryDto['id']) => {
    const country = countries.find(({id}) => id === countryId);
    if (country === undefined) {
        throw new Error(`Target country (${countryId}) not found.`);
    }
    return country;
};
