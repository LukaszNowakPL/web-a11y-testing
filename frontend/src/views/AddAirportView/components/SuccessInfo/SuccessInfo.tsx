import React from 'react';
import {Callout, Flex} from '@radix-ui/themes';
import {InfoCircledIcon} from '@radix-ui/react-icons';

export const SuccessInfo: React.FC = () => {
    return (
        <Flex direction="column" gap="3">
            <Callout.Root color="green">
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text role={'note'}>Airport added successfully</Callout.Text>
            </Callout.Root>
        </Flex>
    );
};
