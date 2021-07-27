import React, { FC } from 'react';

import SearchBar from '../Components/SearchBar';
import Filters from '../Components/Filters';
import AllSearchResults from '../Components/AllSearchResults';

const SearchPage: FC<any> = (props: any) => {
  return (
    <div>
      <SearchBar />
      <Filters />
      <AllSearchResults />
    </div>
  );
};

export default SearchPage;
