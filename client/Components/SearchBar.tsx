import React, { FC, useState } from 'react';
import AllSearchResults from './AllSearchResults';

const SearchBar: FC<any> = (props: any) => {
  //create logic for search button
  //create logic for enter keydown event

  const [results, setResults] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');

  const getSearchResults = () => {
    fetch('/search')
      .then(response => response.json())
      .then(data => {
        setResults(data);
      });
  };

  return (
    <div>
      <input type="search" className="SearchBar" />
      <button type="button" onClick={() => getSearchResults()}>
        Search
      </button>
      <AllSearchResults state={results} />
    </div>
  );
};

export default SearchBar;
