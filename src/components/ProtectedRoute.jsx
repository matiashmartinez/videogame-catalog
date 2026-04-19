import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  const { isAdmin, isLoading } = useAdmin();


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;