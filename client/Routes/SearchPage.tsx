import React, { FC, useState } from 'react';
// import Header from '../Components/Header';
import Filters from '../Components/Filters';
import AllSearchResults from '../Components/AllSearchResults';

const SearchPage: FC<any> = (props: any) => {
  const [results, setResults] = useState<any>([]);

  return (
    <div className="SearchPageContainer">
      <p className="Header">JobQuiver</p>
      <Filters setResults={setResults} />
      <AllSearchResults state={results} />
    </div>
  );
};

export default SearchPage;
