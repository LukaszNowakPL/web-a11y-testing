import React from 'react';
import {useField, useFormState} from 'react-final-form';
import {AirportForm} from '../../utils/types';
import {CheckboxGroup, Grid, TextField} from '@radix-ui/themes';
import {FieldDecorator} from '../FieldDecorator/FieldDecorator';
import {RegionsDto} from '../../../../api/rest/regions.dto';
import * as styles from '../../AddAirportView.styles';

interface RegionsProps {
    regions: RegionsDto;
}

export const Regions: React.FC<RegionsProps> = ({regions}) => {
    const {
        input,
        meta: {error, dirty},
    } = useField<AirportForm['regions']>('regions', {type: 'checkbox'});
    const isError = (dirty ?? false) && (error ?? false);
    const {input: filterInput} = useField<AirportForm['regionsFilter']>('regionsFilter');
    const {submitting} = useFormState<AirportForm>();
    const isSubmitting = submitting ?? false;
    const lcFilterValue = filterInput.value.toLocaleLowerCase();
    const filteredRegions = regions.filter(({name}) => name.toLocaleLowerCase().includes(lcFilterValue));

    return (
        <FieldDecorator label={'Regions'} error={isError}>
            <TextField.Root
                {...filterInput}
                type={'text'}
                placeholder={'Filter list of regions here'}
                autoComplete={'off'}
                disabled={isSubmitting}
                maxLength={255}
                className={styles.filterField}
            />
            <CheckboxGroup.Root {...input} onChange={() => {}} onValueChange={input.onChange} disabled={isSubmitting} typeof={'checkbox'}>
                <Grid columns={'3'}>
                    {filteredRegions.map(({id, name}) => (
                        <CheckboxGroup.Item key={id} value={String(id)}>
                            {name}
                        </CheckboxGroup.Item>
                    ))}
                </Grid>
            </CheckboxGroup.Root>
        </FieldDecorator>
    );
};
