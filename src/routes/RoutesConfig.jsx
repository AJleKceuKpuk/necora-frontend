import { Routes, Route } from 'react-router-dom';

import Body from '../layouts/Body';
import { guestRoutes, privateRoutes, publicRoutes } from './routeGroups';
import GuestRoute from './guards/GuestRoute';
import PrivateRoute from './guards/PrivateRoute';

const RoutesConfig = () => (
    <Routes>
        <Route path="/" element={<Body />}>
            {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
            {guestRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={<GuestRoute>{element}</GuestRoute>} />
            ))}
            {privateRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={<PrivateRoute>{element}</PrivateRoute>} />
            ))}
        </Route>
    </Routes>
);

export default RoutesConfig;
