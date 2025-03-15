import React from 'react';
import {Link} from 'react-router-dom';
import {Text} from '@radix-ui/themes';
import * as styles from './AppHeader.styles';

export const AppMenu: React.FC = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                {menu.map(({to, label}) => (
                    <li key={to} className={styles.navItem}>
                        <Link to={to} className={styles.navLink}>
                            <Text size={'4'} weight={'bold'} color={'blue'}>
                                {label}
                            </Text>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const menu: {label: string; to: string}[] = [
    {label: 'Airports', to: '/airports'},
    {label: 'Add airport', to: '/airports/add'},
];
