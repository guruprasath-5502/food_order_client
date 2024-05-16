import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import { SheetClose } from './ui/sheet';

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <SheetClose asChild>
        <Link
          to='/manage-restaurant'
          className='flex justify-center items-center font-bold hover:text-orange-500'
        >
          Manage Restaurant
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          to='/user-profile'
          className='flex justify-center items-center font-bold hover:text-orange-500'
        >
          User Profile
        </Link>
      </SheetClose>
      <Button
        onClick={() => logout()}
        className='flex items-center font-bold px-3 hover:bg-gray-500'
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
