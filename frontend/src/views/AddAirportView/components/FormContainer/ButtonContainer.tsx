import React from 'react';
import {useFormState} from 'react-final-form';
import {Button, Flex, Spinner} from '@radix-ui/themes';

export const ButtonContainer: React.FC = () => {
    const {hasValidationErrors, submitting} = useFormState();

    const isDisabled = hasValidationErrors || submitting;

    return (
        <>
            <Flex gap="3" mt="3" justify="start">
                <Button type={'submit'} disabled={isDisabled}>
                    {submitting && <Spinner />}Submit
                </Button>
            </Flex>
        </>
    );
};
