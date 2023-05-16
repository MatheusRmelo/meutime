import { createBrowserRouter } from 'react-router-dom';
import Login from './views/Login';
import Countries from './views/Countries';
import Leagues from './views/Leagues';

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
    }
]);

export default router;