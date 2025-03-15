import {useQuery} from '@tanstack/react-query';
import {QUERIES} from '../helpers/consts';
import {getAirports} from '../api/rest/airports';

export const useAirports = () => {
    return useQuery({queryKey: [QUERIES.airports], queryFn: getAirports, refetchOnWindowFocus: false});
};
