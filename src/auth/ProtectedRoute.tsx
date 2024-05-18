import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className='flex flex-col min-h-screen'>
        <div className='container mx-auto flex-1 py-10 flex items-center justify-center'>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to='/' replace />;
};

export default ProtectedRoute;
