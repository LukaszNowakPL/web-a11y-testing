import {useQuery} from '@tanstack/react-query';
import {QUERIES} from '../helpers/consts';
import {getAirport} from '../api/rest/airports';

export const useAirport = (id: number) => {
    return useQuery({queryKey: [QUERIES.airport, id], queryFn: () => getAirport(id), refetchOnWindowFocus: false});
};
