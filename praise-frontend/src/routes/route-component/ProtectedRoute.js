import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ roles, children }) => {
    const { authData } = useAuth();
    const location = useLocation();

    if (!authData.token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!roles.includes(authData.role.toUpperCase())) {
        console.log(authData.role);
        return <Navigate to="/" replace />;
    }

    return children; 
};

export default ProtectedRoute;
