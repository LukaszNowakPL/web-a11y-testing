import React from 'react';
import {Country as CountryComponent} from './components/Country/Country';
import {Country} from './helpers/types';
import {Heading, Text} from '@radix-ui/themes';
import * as styles from './AirportsView.styles';

interface AirportsViewProps {
    data: Country[];
}

export const AirportsView: React.FC<AirportsViewProps> = ({data}) => {
    return (
        <>
            <Heading as={'h1'}>Airports</Heading>
            <Text as={'p'} className={styles.viewDescription}>
                Click an airport link to see its details.
            </Text>
            {data.map((country) => (
                <CountryComponent key={country.id} country={country} />
            ))}
        </>
    );
};
