import React, {FC} from "react"; 
import { render } from "react-dom";
import {BrowserRouter as Router, Route, Switch, Link, Redirect}  from "react-router"; 


import SearchBar from "../Components/SearchBar";
import Filter from "../Components/FilterButtons";
import SearchResults from "../Components/AllSearchResults";


const SearchPage: FC<any> = (props: any) => {

  return (
    <div>    
      <SearchBar />
      <Filter name="Industry" className="SearchRequirement"/>
      <Filter name="Experience Level" className="SearchRequirement"/>
      <Filter name="Location" className="SearchRequirement"/>
      <Filter name="Salary" className="SearchRequirement"/>
      <SearchResults />
    </div>
  )
}

export default SearchPage; 