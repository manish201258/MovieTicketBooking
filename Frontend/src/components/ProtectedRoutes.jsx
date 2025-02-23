import React, { useEffect } from 'react';
import {Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './User/AuthContex';

const ProtectedRoutes = () => {
  const { isLoggedIn,user} = useAuth();
    const navigate = useNavigate()
  if ((!isLoggedIn) && (!user)) {
    navigate("/home")
  }

  return <Outlet />;
};

export default ProtectedRoutes;
