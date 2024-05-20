import React from 'react';
import {Navigate } from 'react-router-dom';

const AdminAcess = ({ component: Component, ...rest }) => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const isAdmin = user && user.role === 'Admin';

    return (
        isAdmin ? <Component {...rest} /> : <Navigate to="/main" />
    );
}

export default AdminAcess;
