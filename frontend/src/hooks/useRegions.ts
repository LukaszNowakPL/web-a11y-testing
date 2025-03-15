import {useQuery} from '@tanstack/react-query';
import {QUERIES} from '../helpers/consts';
import {getRegions} from '../api/rest/regions';

export const useRegions = () => {
    return useQuery({queryKey: [QUERIES.regions], queryFn: getRegions, refetchOnWindowFocus: false});
};
