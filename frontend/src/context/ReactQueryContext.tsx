import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

interface ReactQueryContextProps {
    children: React.ReactNode;
    queryClient: QueryClient;
}

export const ReactQueryContext: React.FC<ReactQueryContextProps> = ({children, queryClient}) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
