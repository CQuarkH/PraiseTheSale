import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import { adminRoutes } from '../../routes-config/adminRoutes';

function AdminLayout() {
  return (
    <div>
      <Routes>
        {adminRoutes.map(route => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <Outlet />
    </div>
  );
}


export default AdminLayout