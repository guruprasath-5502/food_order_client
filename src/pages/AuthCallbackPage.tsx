import { useCreateMyUser } from '@/api/MyUserApi';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate('/');
  }, [createUser, navigate, user]);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='container mx-auto flex-1 py-10 flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default AuthCallbackPage;
