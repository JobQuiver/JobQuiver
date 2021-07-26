import React, {FC, useState} from "react"; 
import { render } from "react-dom";
import SearchResult from "./SearchResult";

const SearchBar: FC<any> = (props: any) => {

//create logic for search button 
//create logic for enter keydown event


  const [results, setResults] = useState<object>([]);
  // const verifiedHandler = () => {
  //   setVerified(true);
  // }
  
  const getSearchResults = () => {
    fetch('/postings', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if(data.result === 'success')

setResults

    })
  }
  return (
    <div>
      <input type="search">Search Job Postings</input>
      <button type="button" onClick={() => getSearchResults()}>Search</button>
    </div>
  )
}

export default SearchBar; 