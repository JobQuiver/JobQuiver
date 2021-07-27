import React, { FC, useState } from 'react';
import SearchResult from '../Components/SearchResult';

// import SearchBar from '../Components/SearchBar';
import Filters from '../Components/Filters';
import AllSearchResults from '../Components/AllSearchResults';

const SearchPage: FC<any> = (props: any) => {
  const [results, setResults] = useState<any>([]);

  // results.forEach(object => {
  //   <SearchResult
  //     // key={i++}
  //     companyName={object.companyName}
  //     title={object.title}
  //     description={object.description}
  //     location={object.location.name}
  //     link={object.link}
  //   />;
  // });

  return (
    <div>
      <Filters setResults={setResults} />
      <AllSearchResults state={results} />
    </div>
  );
};

export default SearchPage;
