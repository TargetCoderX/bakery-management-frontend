import React from 'react';
import { Navigate  } from 'react-router-dom';

function ProtectedRoute({ children, isAuth }) {
    return (
        isAuth ? children : <Navigate to="/login" />
    );
}

export default ProtectedRoute;
