import { SearchState } from '@/pages/SearchPage';
import { Restaurant, RestaurantSearchResponse } from '@/types';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurantById = (restaurantId?: string) => {
  const getRestaurantRequestById = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/detail/${restaurantId}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch restaurant');
    }

    return response.json();
  };

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery('fetchRestaurant', getRestaurantRequestById, {
    enabled: !!restaurantId,
    retry: false,
  });

  if (error) {
    toast.error(error.toString());
  }

  return {
    restaurant,
    isLoading,
  };
};

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();

    params.set('searchQuery', searchState.searchQuery);
    params.set('page', searchState.page.toString());
    params.set('selectedCuisines', searchState.selectedCuisines.join(','));
    params.set('sortOption', searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch restaurant');
    }

    return response.json();
  };

  const {
    data: results,
    isLoading,
    isRefetching,
    error,
  } = useQuery(['searchRestaurants', searchState], createSearchRequest, {
    enabled: !!city,
    retry: false,
  });

  if (error && !isLoading && !isRefetching) {
    if (results) {
      results.data.data = [];
      results.data.pagination.total = 0;
    }
    toast.error('Failed to fetch restaurant');
  }

  return {
    results,
    isLoading,
  };
};
