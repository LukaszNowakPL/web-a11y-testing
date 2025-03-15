import React from 'react';
import {Country} from './components/Country/Country';
import {DataList, Heading} from '@radix-ui/themes';
import {Airport} from './utils/types';
import {useCountries} from '../../hooks/useCountries';
import {SchengenSection} from './components/SchengenSection/SchengenSection';
import {NonSchengenSection} from './components/NonSchengenSection/NonSchengenSection';
import {RegionsList} from './components/RegionsList/RegionsList';
import * as styles from './AirportView.styles';

interface AirportViewProps {
    airport: Airport;
}

export const AirportView: React.FC<AirportViewProps> = ({airport}) => {
    const {data: countries, isError, refetch} = useCountries();
    return (
        <>
            <Heading as={'h1'} className={styles.mainHeader}>
                {airport.name}
            </Heading>
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label>Country</DataList.Label>
                    <DataList.Value>
                        <Country countries={countries} isError={isError} refetch={refetch} countryId={airport.countryId} />
                    </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>IATA code</DataList.Label>
                    <DataList.Value>{airport.iata}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>Regions served</DataList.Label>
                    <DataList.Value>
                        <RegionsList airport={airport} />
                    </DataList.Value>
                </DataList.Item>
                <SchengenSection countries={countries} isError={isError} countryId={airport.countryId} />
                <NonSchengenSection countries={countries} countryId={airport.countryId} />
                <DataList.Item>
                    <DataList.Label>Vaccination info</DataList.Label>
                    <DataList.Value>
                        {airport.vaccinationNotes !== undefined && airport.vaccinationNotes !== '' ? airport.vaccinationNotes : 'None'}
                    </DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </>
    );
};
