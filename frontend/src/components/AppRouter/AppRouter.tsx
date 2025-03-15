import {QueryClient} from '@tanstack/react-query';
import {Navigate, RouteObject} from 'react-router-dom';
import {App} from '../App/App';
import {AirportsViewGuard} from '../../views/AirportsView/AirportsView.guard';
import {AirportViewGuard} from '../../views/AirportView/AirportView.guard';
import {AddAirportViewGuard} from '../../views/AddAirportView/AddAirportView.guard';
import {Progress} from '@radix-ui/themes';
import React from 'react';
import {AppError} from '../AppError/AppError';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {retry: 3},
    },
});

const fallback = () => <Progress aria-label={'loading data'} />;

export const routerDefinition = [
    {
        path: '/',
        element: <App queryClient={queryClient} />,
        errorElement: <AppError />,
        HydrateFallback: fallback,
        children: [
            {
                index: true,
                element: <Navigate to={'/airports'} replace />,
            },
            {
                path: '/airports',
                children: [
                    {
                        path: ':id',
                        children: [
                            {
                                path: '*',
                                element: <Navigate to={'../'} replace />,
                            },
                            {
                                index: true,
                                element: <AirportViewGuard />,
                            },
                        ],
                    },
                    {
                        path: 'add',
                        children: [
                            {
                                path: '*',
                                element: <Navigate to={'../'} replace />,
                            },
                            {
                                index: true,
                                element: <AddAirportViewGuard />,
                            },
                        ],
                    },
                    {
                        index: true,
                        element: <AirportsViewGuard />,
                    },
                ],
            },
        ],
    },
] satisfies RouteObject[];
