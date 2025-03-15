import React from 'react';
import {AddAirportView} from './AddAirportView';
import {Progress} from '@radix-ui/themes';
import {useAirports} from '../../hooks/useAirports';
import {useCountries} from '../../hooks/useCountries';
import {useRegions} from '../../hooks/useRegions';
import {sortCountries, sortRegions} from '../AirportsView/helpers/mappers';
import {ApiError} from '../../components/ApiError/ApiError';

export const AddAirportViewGuard: React.FC = () => {
    const {data: airports, isLoading: isAirportsLoading, isSuccess: isAirportsSuccess, refetch: refetchAirports} = useAirports();
    const {data: countries, isLoading: isCountriesLoading, isSuccess: isCountriesSuccess, refetch: refetchCountries} = useCountries();
    const {data: regions, isLoading: isRegionsLoading, isSuccess: isRegionsSuccess, refetch: refetchRegions} = useRegions();

    const isLoading = isAirportsLoading || isCountriesLoading || isRegionsLoading;
    if (isLoading) {
        return <Progress duration={'50s'} data-test-id={'progress-bar'} />;
    }

    const isSuccess = isAirportsSuccess && isCountriesSuccess && isRegionsSuccess;

    if (!isSuccess) {
        const handleRefetch = async () => {
            if (!isAirportsSuccess) {
                await refetchAirports();
            }
            if (!isCountriesSuccess) {
                await refetchCountries();
            }
            if (!isRegionsSuccess) {
                await refetchRegions();
            }
        };
        return <ApiError onRestartClick={handleRefetch} />;
    }
    const sortedCountries = sortCountries(countries);
    const sortedRegions = sortRegions(regions);
    return <AddAirportView airports={airports} countries={sortedCountries} regions={sortedRegions} />;
};
