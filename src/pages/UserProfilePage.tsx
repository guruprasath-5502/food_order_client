import { useMyGetUser, useUpdateMyUser } from '@/api/MyUserApi';
import { Skeleton } from '@/components/ui/skeleton';
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';
import noResultsIcon from '../../public/NoResult.svg';

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useMyGetUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return (
      <div className='flex flex-col space-y-10 bg-gray-50 rounded-lg p-10'>
        <div className='flex flex-col flex-grow space-y-3'>
          <Skeleton className='h-10' />
          <div className='flex flex-col space-y-3'>
            <Skeleton className='h-4' />
          </div>
        </div>
        <div className='flex flex-col flex-grow space-y-3'>
          <Skeleton className='h-40' />
          <div className='flex flex-col space-y-3'>
            <Skeleton className='h-4' />
            <Skeleton className='h-4' />
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <img src={noResultsIcon} alt='No results found' className='w-32' />
        <span className='text-sm font-semibold'>Oops!</span>
      </div>
    );
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
