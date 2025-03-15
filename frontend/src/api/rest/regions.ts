import {axios} from './axios';
import {AxiosResponse} from 'axios';
import {RegionsDto} from './regions.dto';

export const getRegions = async () => {
    const response = await axios.get<RegionsDto, AxiosResponse<RegionsDto>>('/regions');
    return response.data;
};
