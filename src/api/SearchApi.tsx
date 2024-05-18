import { SearchState } from '@/pages/SearchPage';
import { RestaurantSearchResponse } from '@/types';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    error,
  } = useQuery(['searchRestaurants', searchState], createSearchRequest, {
    enabled: !!city,
    retry: false,
    cacheTime: 0,
  });

  if (error) {
    toast.error('Failed to fetch restaurant');
  }

  return {
    results,
    isLoading,
  };
};
