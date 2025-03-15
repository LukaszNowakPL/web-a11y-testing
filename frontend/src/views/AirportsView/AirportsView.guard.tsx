import React from 'react';
import {AirportsView} from './AirportsView';
import {useAirports} from '../../hooks/useAirports';
import {Progress} from '@radix-ui/themes';
import {combineViewData, sortCountries} from './helpers/mappers';
import {useCountries} from '../../hooks/useCountries';
import {ApiError} from '../../components/ApiError/ApiError';

export const AirportsViewGuard: React.FC = () => {
    const {data: countries, isLoading: isCountriesLoading, isSuccess: isCountriesSuccess, refetch: refetchCountries} = useCountries();
    const {data: airports, isLoading: isAirportsLoading, isSuccess: isAirportsSuccess, refetch: refetchAirports} = useAirports();

    const isLoading = isCountriesLoading || isAirportsLoading;
    if (isLoading) {
        return <Progress duration={'50s'} />;
    }
    const isError = !isCountriesSuccess || !isAirportsSuccess;
    if (isError) {
        const handleRefetch = async () => {
            if (!isCountriesSuccess) {
                await refetchCountries();
            }
            if (!isAirportsSuccess) {
                await refetchAirports();
            }
        };
        return <ApiError onRestartClick={handleRefetch} />;
    }

    const sortedCountries = sortCountries(countries);

    return <AirportsView data={combineViewData(sortedCountries, airports)} />;
};
