import React from 'react';
import {Country as CountryInterface} from '../../helpers/types';
import {Airport} from '../Airport/Airport';
import {Heading} from '@radix-ui/themes';
import * as styles from './../../AirportsView.styles';

interface CountryProps {
    country: CountryInterface;
}

export const Country: React.FC<CountryProps> = ({country}) => {
    return (
        <>
            <Heading as={'h2'}>{country.name}</Heading>
            <ul className={styles.airportsList}>
                {country.airports.map((airport) => (
                    <Airport key={airport.id} airport={airport} />
                ))}
            </ul>
        </>
    );
};
