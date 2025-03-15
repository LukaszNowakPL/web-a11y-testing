import React from 'react';
import {Button, Callout, Spinner} from '@radix-ui/themes';
import {Airport} from '../../utils/types';
import {useRegions} from '../../../../hooks/useRegions';
import {getRegions} from '../../utils/helpers';
import * as styles from '../../AirportView.styles';
import {ExclamationTriangleIcon} from '@radix-ui/react-icons';

interface RegionsListProps {
    airport: Airport;
}

export const RegionsList: React.FC<RegionsListProps> = ({airport}) => {
    const {data: regions, isError, refetch} = useRegions();

    if (isError) {
        return (
            <Callout.Root color="red" variant={'outline'} size={'1'}>
                <Callout.Icon>
                    <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>
                    <Button onClick={() => refetch()} variant={'ghost'}>
                        Fetch data again
                    </Button>
                </Callout.Text>
            </Callout.Root>
        );
    }

    if (regions === undefined) {
        return <Spinner />;
    }
    return (
        <ul className={styles.regionsList}>
            {airport.regions.map((region) => (
                <li key={region}>{getRegions(regions, region).name}</li>
            ))}
        </ul>
    );
};
