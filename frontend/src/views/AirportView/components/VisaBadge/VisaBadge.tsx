import React from 'react';
import {Badge} from '@radix-ui/themes';

interface VisaBadgeProps {
    isVisaRequired: boolean;
}

export const VisaBadge: React.FC<VisaBadgeProps> = ({isVisaRequired}) => {
    if (isVisaRequired) {
        return (
            <Badge color="red" variant="soft" radius="full">
                Visa required
            </Badge>
        );
    }
    return (
        <Badge color="jade" variant="soft" radius="full">
            No visa required
        </Badge>
    );
};
