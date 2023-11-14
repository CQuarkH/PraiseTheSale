import { Routes, Route } from 'react-router-dom';
import { buyerRoutes } from './routesConfig';

function BuyerLayout() {
    return (
        <Routes>
            {buyerRoutes.map(route => (
                <Route key={route.path} path={route.path} element={route.element}>
                    {route.children && route.children.map(child => (
                        <Route key={child.path} path={child.path} element={child.element} />
                    ))}
                </Route>
            ))}
        </Routes>
    );
}

export default BuyerLayout;

