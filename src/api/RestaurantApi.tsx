import { Restaurant } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/user/restaurant`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch restaurant');
    }

    return response.json();
  };
  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery('fetchMyRestaurant', getRestaurantRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    restaurant,
    isLoading,
  };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/user/restaurant`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to update restaurant');
    }

    return response.json();
  };
  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success('Restaurant updated successfully');
  }

  if (error) {
    toast.error('Unable to update restaurant');
    reset();
  }

  return {
    updateRestaurant,
    isLoading,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/user/restaurant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to create restaurant');
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest);

  if (isSuccess) {
    toast.success('Restaurant created successfully');
  }

  if (error) {
    toast.error(error.toString());
  }

  return {
    isLoading,
    createRestaurant,
  };
};
