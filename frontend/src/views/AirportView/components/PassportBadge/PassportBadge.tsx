import React from 'react';
import {Badge} from '@radix-ui/themes';

interface PassportBadgeProps {
    isPassportRequired: boolean;
}

export const PassportBadge: React.FC<PassportBadgeProps> = ({isPassportRequired}) => {
    if (isPassportRequired) {
        return (
            <Badge color="red" variant="soft" radius="full">
                Passport required
            </Badge>
        );
    }
    return (
        <Badge color="jade" variant="soft" radius="full">
            No passport required
        </Badge>
    );
};
