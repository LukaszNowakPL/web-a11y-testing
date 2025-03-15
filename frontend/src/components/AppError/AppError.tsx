import React from 'react';
import {Container, Heading, Text, Theme} from '@radix-ui/themes';
import * as styles from './AppError.styles';
import {AppHeader} from '../AppHeader/AppHeader';

export const AppError: React.FC = () => {
    return (
        <Theme>
            <Container size={'4'}>
                <AppHeader />
                <Heading as={'h1'} className={styles.mainHeader} role={'alert'}>
                    Sorry, there is some application instability
                </Heading>
                <Text as={'p'} size={'3'}>
                    Try to restart the app. If it won't help, please come back after a while.
                </Text>
            </Container>
        </Theme>
    );
};
