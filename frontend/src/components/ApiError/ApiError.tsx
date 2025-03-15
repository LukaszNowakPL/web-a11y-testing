import React from 'react';
import {Button, Heading, Text} from '@radix-ui/themes';
import * as styles from './ApiError.styles';

interface ApiErrorProps {
    onRestartClick: () => void;
}

export const ApiError: React.FC<ApiErrorProps> = ({onRestartClick}) => {
    return (
        <>
            <Heading as={'h1'} className={styles.mainHeader} role={'alert'}>
                Sorry, there is some connectivity error
            </Heading>
            <Text as={'p'} size={'3'}>
                We were unable to fetch some of data necessary to display the page. You can{' '}
                <Button variant={'ghost'} onClick={onRestartClick} size={'3'}>
                    restart data fetching
                </Button>{' '}
                manually.
            </Text>
            <Text as={'p'} size={'3'}>
                If it won't help, try to restart the app.
            </Text>
        </>
    );
};
