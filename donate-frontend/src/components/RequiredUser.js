/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserData, isUserLoggedIn } from '../utils/Utils';
import PreloadComponent from './PreloadComponent';

const RequiredUser = ({ allowedRoles }) => {

  const user = getUserData() ? getUserData() : null;
  const location = useLocation();

  if (isUserLoggedIn() && !user) {
    return <PreloadComponent />;
  }

  return isUserLoggedIn() && allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : isUserLoggedIn() ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequiredUser;
