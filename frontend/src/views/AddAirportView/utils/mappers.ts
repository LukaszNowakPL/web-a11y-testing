import {AirportForm} from './types';
import {AirportModel} from '../../../api/rest/airports.dto';

export const mapAirportFormToModel = ({name, iata, countryId, regions, vaccinationNotes}: AirportForm): AirportModel => {
    return {
        name,
        iata,
        country_id: Number(countryId),
        regions: regions.map((region) => Number(region)),
        vaccination_notes: vaccinationNotes,
    };
};
