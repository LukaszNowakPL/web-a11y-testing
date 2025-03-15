import {useQuery} from '@tanstack/react-query';
import {QUERIES} from '../helpers/consts';
import {getCountries} from '../api/rest/countries';

export const useCountries = () => {
    return useQuery({queryKey: [QUERIES.countries], queryFn: getCountries, refetchOnWindowFocus: false});
};
