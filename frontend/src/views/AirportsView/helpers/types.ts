import {CountryDto} from '../../../api/rest/countries.dto';
import {AirportsDto} from '../../../api/rest/airports.dto';

export type Country = CountryDto & {
    airports: AirportsDto;
};
