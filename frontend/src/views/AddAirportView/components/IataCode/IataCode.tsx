import React from 'react';
import {useField, useFormState} from 'react-final-form';
import {AirportForm} from '../../utils/types';
import {TextField} from '@radix-ui/themes';
import {FieldDecorator} from '../FieldDecorator/FieldDecorator';

export const IataCode: React.FC = () => {
    const {
        input,
        meta: {error, dirty},
    } = useField<AirportForm['iata']>('iata');
    const {submitting} = useFormState<AirportForm>();
    return (
        <FieldDecorator label={'IATA Code'} error={dirty && error}>
            <TextField.Root {...input} type={'text'} autoComplete={'off'} disabled={submitting} maxLength={3} />
        </FieldDecorator>
    );
};
