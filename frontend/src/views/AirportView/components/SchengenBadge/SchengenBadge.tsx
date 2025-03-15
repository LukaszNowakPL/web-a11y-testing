import React from 'react';
import {Badge, Spinner, Text} from '@radix-ui/themes';
import {Airport} from '../../utils/types';
import {CheckIcon, Cross2Icon} from '@radix-ui/react-icons';
import {CountriesDto} from '../../../../api/rest/countries.dto';

interface SchengenBadgeProps {
    countries?: CountriesDto;
    isError: boolean;
    countryId: Airport['countryId'];
}

export const SchengenBadge: React.FC<SchengenBadgeProps> = ({countries, isError, countryId}) => {
    if (isError) {
        return <Text>Unable to display information</Text>;
    }

    if (countries === undefined) {
        return <Spinner />;
    }

    const isInSchengen = Boolean(countries.find((country) => country.id === countryId)?.is_in_schengen);

    if (isInSchengen) {
        return (
            <Badge color="green" variant="outline" radius="full">
                <CheckIcon color={'green'} /> In Schengen
            </Badge>
        );
    }
    return (
        <Badge color="red" variant="outline" radius="full">
            <Cross2Icon color={'red'} /> Outside Schengen
        </Badge>
    );
};
