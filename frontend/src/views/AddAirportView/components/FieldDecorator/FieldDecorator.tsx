import React from 'react';
import {Text} from '@radix-ui/themes';
import * as styles from '../../AddAirportView.styles';

interface FieldDecoratorProps {
    label: string;
    error?: string;
    children: React.ReactNode;
}

export const FieldDecorator: React.FC<FieldDecoratorProps> = ({children, label, error}) => {
    return (
        <div className={styles.fieldArea}>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    {label}
                </Text>
                {error && error !== '' && (
                    <Text as="p" size="2" mb="1" color={'red'} role={'alert'}>
                        {error}
                    </Text>
                )}
                {children}
            </label>
        </div>
    );
};
