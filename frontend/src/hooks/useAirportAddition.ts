import {useMutation, useQueryClient} from '@tanstack/react-query';
import {MUTATIONS, QUERIES} from '../helpers/consts';
import {postAirport} from '../api/rest/airports';
import {AirportModel} from '../api/rest/airports.dto';

export const useAirportAddition = () => {
    const queryClient = useQueryClient();
    const {mutateAsync: addAirport, ...mutation} = useMutation({
        mutationKey: [MUTATIONS.airports],
        mutationFn: ({data}: {data: AirportModel; onSuccessCallback: () => void}) => postAirport(data),
        onSuccess: async (_, {onSuccessCallback}) => {
            await queryClient.invalidateQueries({queryKey: [QUERIES.airports]});
            onSuccessCallback();
        },
    });

    return {...mutation, addAirport};
};
