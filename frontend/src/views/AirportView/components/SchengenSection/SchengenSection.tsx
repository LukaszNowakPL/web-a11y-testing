import React from 'react';
import {DataList} from '@radix-ui/themes';
import {Airport} from '../../utils/types';
import {CountriesDto} from '../../../../api/rest/countries.dto';
import {SchengenBadge} from '../SchengenBadge/SchengenBadge';

interface CountryProps {
    countries?: CountriesDto;
    isError: boolean;
    countryId: Airport['countryId'];
}

export const SchengenSection: React.FC<CountryProps> = ({countryId, countries, isError}) => {
    return (
        <DataList.Item>
            <DataList.Label>Schengen info</DataList.Label>
            <DataList.Value>
                <SchengenBadge countries={countries} isError={isError} countryId={countryId} />
            </DataList.Value>
        </DataList.Item>
    );
};
