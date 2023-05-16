import { createBrowserRouter } from 'react-router-dom';
import Login from './views/Login';
import Countries from './views/Countries';
import Leagues from './views/Leagues';
import Teams from './views/Teams';
import Team from './views/Team';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/countries',
        element: <Countries />
    },
    {
        path: '/leagues',
        element: <Leagues />
    },
    {
        path: '/teams',
        element: <Teams />
    },
    {
        path: '/team',
        element: <Team />
    },
]);

export default router;