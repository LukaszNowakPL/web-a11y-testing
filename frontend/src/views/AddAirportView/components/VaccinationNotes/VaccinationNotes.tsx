import React from 'react';
import {useField, useFormState} from 'react-final-form';
import {AirportForm} from '../../utils/types';
import {TextArea} from '@radix-ui/themes';
import {FieldDecorator} from '../FieldDecorator/FieldDecorator';

export const VaccinationNotes: React.FC = () => {
    const {
        input,
        meta: {error, dirty},
    } = useField<AirportForm['vaccinationNotes']>('vaccinationNotes');
    const {submitting} = useFormState<AirportForm>();
    return (
        <FieldDecorator label={'Vaccination Notes'} error={dirty && error}>
            <TextArea {...input} autoComplete={'off'} disabled={submitting} />
        </FieldDecorator>
    );
};
