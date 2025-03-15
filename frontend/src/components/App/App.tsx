import {QueryClient} from '@tanstack/react-query';
import {Outlet, ScrollRestoration} from 'react-router-dom';
import {ReactQueryContext} from '../../context/ReactQueryContext';
import {Theme} from '@radix-ui/themes';
import {AppLayout} from './AppLayout';

interface AppProps {
    queryClient: QueryClient;
}

export const App: React.FC<AppProps> = ({queryClient}) => {
    return (
        <Theme>
            <ReactQueryContext queryClient={queryClient}>
                <AppLayout>
                    <Outlet />
                    <ScrollRestoration />
                </AppLayout>
            </ReactQueryContext>
        </Theme>
    );
};
