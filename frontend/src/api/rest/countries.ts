import {CountriesDto} from './countries.dto';
import {axios} from './axios';
import {AxiosResponse} from 'axios';

export const getCountries = async () => {
    const response = await axios.get<CountriesDto, AxiosResponse<CountriesDto>>('/countries');
    return response.data;
};
