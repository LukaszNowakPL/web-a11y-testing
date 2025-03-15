import React from 'react';
import {Button, Callout, Spinner} from '@radix-ui/themes';
import {Airport} from '../../utils/types';
import {CountriesDto} from '../../../../api/rest/countries.dto';
import {ExclamationTriangleIcon} from '@radix-ui/react-icons';

interface CountryProps {
    countries?: CountriesDto;
    isError: boolean;
    refetch: () => void;
    countryId: Airport['countryId'];
}

export const Country: React.FC<CountryProps> = ({countryId, countries, isError, refetch}) => {
    if (isError) {
        return (
            <Callout.Root color="red" variant={'outline'} size={'1'}>
                <Callout.Icon>
                    <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>
                    <Button onClick={refetch} variant={'ghost'}>
                        Fetch data again
                    </Button>
                </Callout.Text>
            </Callout.Root>
        );
    }

    if (countries === undefined) {
        return <Spinner />;
    }
    return countries.find((country) => country.id === countryId)?.name;
};
