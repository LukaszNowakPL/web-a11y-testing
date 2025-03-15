import {AirportsDto} from '../../../api/rest/airports.dto';
import {CountriesDto} from '../../../api/rest/countries.dto';
import {RegionsDto} from '../../../api/rest/regions.dto';

export const combineViewData = (sortedCountries: CountriesDto, airports: AirportsDto) => {
    return sortedCountries.map((country) => {
        const filteredAirports = airports.filter((airport) => airport.country_id === country.id);
        const sortedAirports = filteredAirports.sort((a, b) => {
            return a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ? -1 : 1;
        });
        return {...country, airports: sortedAirports};
    });
};

export const sortCountries = (countries: CountriesDto) => {
    return countries.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
    });
};

export const sortRegions = (regions: RegionsDto) => {
    return regions.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
    });
};
