import React from 'react';
import {RocketIcon} from '@radix-ui/react-icons';
import {Link, Text} from '@radix-ui/themes';
import * as styles from './AppHeader.styles';

export const AppLogo: React.FC = () => {
    return (
        <Link href={'/'} underline={'none'} weight={'bold'} size={'7'} color={'blue'}>
            <RocketIcon className={styles.icon} />
            <Text>Airports dashboard</Text>
        </Link>
    );
};
