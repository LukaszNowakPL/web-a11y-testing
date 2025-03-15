import React from 'react';
import {Callout, Flex} from '@radix-ui/themes';
import {ExclamationTriangleIcon} from '@radix-ui/react-icons';

export const ErrorInfo: React.FC = () => {
    return (
        <Flex direction="column" gap="3">
            <Callout.Root color="red" role={'alert'}>
                <Callout.Icon>
                    <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text role={'alert'}>Error while adding an airport</Callout.Text>
            </Callout.Root>
        </Flex>
    );
};
