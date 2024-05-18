import { useSearchRestaurant } from '@/api/SearchApi';
import CuisineFilter from '@/components/CuisineFilter';
import LoadingSpinner from '@/components/LoadingSpinner';
import PaginationSelector from '@/components/PaginationSelector';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import SearchResultsCard from '@/components/SearchResultsCard';
import SearchResultsInfo from '@/components/SearchResultsInfo';
import SortOptionDropdown from '@/components/SortOptionDropdown';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import noResultsIcon from '../../public/NoResult.svg';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurant(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: '',
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption: sortOption,
      page: 1,
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!results?.data.data.length || !city) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <img src={noResultsIcon} alt='No results found' className='w-32' />
        <span className='text-sm font-semibold'>Oops!</span>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list'>
        <CuisineFilter
          onChange={setSelectedCuisines}
          seletedCuisines={searchState.selectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id='main-content' className='flex flex-col gap-5'>
        <SearchBar
          placeHolder='Search by Cuisine or Restaurant Name'
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          onReset={resetSearch}
        />
        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          <SearchResultsInfo
            total={results.data.pagination.total}
            city={city}
          />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results.data.data.map((restaurant) => (
          <SearchResultsCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          onPageChange={setPage}
          page={results.data.pagination.page}
          pages={results.data.pagination.pages}
        />
      </div>
    </div>
  );
};

export default SearchPage;
