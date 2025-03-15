import React from 'react';
import {AirportView} from './AirportView';
import {Progress} from '@radix-ui/themes';
import {useParams} from 'react-router';
import {useAirport} from '../../hooks/useAirport';
import {mapAirport} from './utils/helpers';
import {ApiError} from '../../components/ApiError/ApiError';

export const AirportViewGuard: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const {data: airport, isLoading, isSuccess, refetch} = useAirport(Number(id));

    if (isLoading) {
        return <Progress duration={'50s'} data-test-id={'progress-bar'} aria-label={'loading data'} />;
    }
    if (!isSuccess) {
        return <ApiError onRestartClick={refetch} />;
    }
    const mappedAirport = mapAirport(airport);
    return <AirportView airport={mappedAirport} />;
};
