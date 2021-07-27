import React, { FC, useState } from 'react';
import { render } from 'react-dom';
import SearchResults from './SearchResults';
import AllSearchResults from './AllSearchResults';

const SearchBar: FC<any> = (props: any) => {
  //create logic for search button
  //create logic for enter keydown event

  const [results, setResults] = useState<object>([]);

  const getSearchResults = () => {
    fetch('/postings')
      .then(response => response.json())
      .then(data => {
        data.forEach(responseObject => {
          setResults(results.push(responseObject));
        });
      });
  };
  return (
    <div>
      <input type="search">Search Job Postings</input>
      <button type="button" onClick={() => getSearchResults()}>
        Search
      </button>
      <AllSearchResults state={results} />
    </div>
  );
};

export default SearchBar;
