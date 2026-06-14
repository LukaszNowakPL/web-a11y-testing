import React from 'react';
import {useField, useFormState} from 'react-final-form';
import {AirportForm} from '../../utils/types';
import {TextField} from '@radix-ui/themes';
import {FieldDecorator} from '../FieldDecorator/FieldDecorator';

export const Name: React.FC = () => {
    const {
        input,
        meta: {error, dirty},
    } = useField<AirportForm['name']>('name');
    const isError = (dirty ?? false) && (error ?? false);
    const {submitting} = useFormState<AirportForm>();
    return (
        <FieldDecorator label={'Name'} error={isError}>
            <TextField.Root {...input} type={'text'} autoComplete={'off'} disabled={submitting ?? false} maxLength={255} />
        </FieldDecorator>
    );
};
