import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;