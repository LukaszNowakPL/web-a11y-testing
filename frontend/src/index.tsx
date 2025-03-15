import React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router';
import {routerDefinition} from './components/AppRouter/AppRouter';
import '@radix-ui/themes/styles.css';

const container = document.getElementById('root')!;

const root = createRoot(container!);

const router = createBrowserRouter(routerDefinition);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
