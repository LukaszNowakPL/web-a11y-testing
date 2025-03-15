import React from 'react';
import {DataList} from '@radix-ui/themes';
import {Airport} from '../../utils/types';
import {CountriesDto} from '../../../../api/rest/countries.dto';
import {PassportBadge} from '../PassportBadge/PassportBadge';
import {VisaBadge} from '../VisaBadge/VisaBadge';
import {getCountry} from '../../utils/helpers';

interface NonSchengenSectionProps {
    countries?: CountriesDto;
    countryId: Airport['countryId'];
}

export const NonSchengenSection: React.FC<NonSchengenSectionProps> = ({countryId, countries}) => {
    if (countries === undefined) {
        return null;
    }

    const country = getCountry(countries, countryId);

    if (country.is_in_schengen) {
        return null;
    }

    return (
        <DataList.Item>
            <DataList.Label>Non-schengen info</DataList.Label>
            <DataList.Value>
                <PassportBadge isPassportRequired={country.is_passport_required} />
                <VisaBadge isVisaRequired={country.is_visa_required} />
            </DataList.Value>
        </DataList.Item>
    );
};
