import React from 'react';
import {AirportDto} from '../../../../api/rest/airports.dto';
import {Link} from 'react-router';
import {Text} from '@radix-ui/themes';
import * as styles from '../../AirportsView.styles';

interface AirportProps {
    airport: AirportDto;
}

export const Airport: React.FC<AirportProps> = ({airport}) => {
    return (
        <li>
            <Link to={`/airports/${airport.id}`} className={styles.airportLink}>
                <Text color={'blue'}>{airport.name}</Text>
            </Link>{' '}
            ({airport.iata})
        </li>
    );
};
