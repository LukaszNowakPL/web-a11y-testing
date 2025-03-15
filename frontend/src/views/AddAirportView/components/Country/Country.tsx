import React from 'react';
import {useField, useFormState} from 'react-final-form';
import {AirportForm} from '../../utils/types';
import {Select} from '@radix-ui/themes';
import {FieldDecorator} from '../FieldDecorator/FieldDecorator';
import {CountriesDto} from '../../../../api/rest/countries.dto';

interface CountryProps {
    countries: CountriesDto;
}

export const Country: React.FC<CountryProps> = ({countries}) => {
    const {
        input,
        meta: {error, dirty},
    } = useField<AirportForm['countryId']>('countryId');
    const {submitting} = useFormState<AirportForm>();
    return (
        <FieldDecorator label={'Country'} error={dirty && error}>
            <Select.Root {...input} onValueChange={input.onChange} disabled={submitting}>
                <Select.Trigger placeholder={'Select one'} />
                <Select.Content position={'popper'}>
                    {countries.map(({id, name}) => (
                        <Select.Item key={id} value={String(id)}>
                            {name}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </FieldDecorator>
    );
};
