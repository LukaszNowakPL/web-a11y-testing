import {axios} from './axios';
import {AxiosResponse} from 'axios';
import {AirportDto, AirportModel, AirportsDto} from './airports.dto';

export const getAirports = async () => {
    const response = await axios.get<AirportsDto, AxiosResponse<AirportsDto>>('/airports');
    return response.data;
};

export const getAirport = async (id: number) => {
    const response = await axios.get<AirportDto, AxiosResponse<AirportDto>>(`/airports/${id}`);
    return response.data;
};

export const postAirport = async (data: AirportModel) => {
    const response = await axios.post<AirportModel, AxiosResponse<{id: number; data: AirportModel}>>('/airports', data);
    return response.data;
};
