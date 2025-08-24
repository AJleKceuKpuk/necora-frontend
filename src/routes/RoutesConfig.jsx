import { Routes, Route } from 'react-router-dom';

import Body from '../layouts/Body';
import RouteGuard from './RouteGuard';
import { routes } from './routeGroups';

const RoutesConfig = () => (
    <Routes>
        <Route
            path="/"
            element={
                <RouteGuard meta={{}}>
                    <Body />
                </RouteGuard>
            }
        >
            {routes.map(({ path, element, meta }) => (
                <Route
                    key={path}
                    path={path}
                    element={<RouteGuard meta={meta}>{element}</RouteGuard>}
                />
            ))}
        </Route>
    </Routes>
);

export default RoutesConfig;
