import React from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import { sellerRoutes } from '../../routes-config/sellerRoutes';


function SellerLayout() {
  return (
    <div>
      <Routes>
        {sellerRoutes.map(route => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <Outlet />
    </div>
  );
}

export default SellerLayout