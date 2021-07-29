import React, { FC, useState } from 'react';
import Filters from '../Components/Filters';
import AllSearchResults from '../Components/AllSearchResults';
import {useHistory, Redirect} from 'react-router-dom';

const SearchPage: FC<any> = (props: any) => {
  const [results, setResults] = useState<any>([]);
  const history = useHistory();

  const checkLoggedin = () => {
    fetch('login/verifyToken', {
      method: 'POST',
    })
      .then((response: any) => response.json())
      .then((data: any) => {
        if (!data.verified)
          // useHistory.push('/login');
          <Redirect to='/login'/>
      });
  };

  checkLoggedin();

  const logout = async () => {
    await fetch('/login/logout');
    history.push('/login');
  }
  return (
    <div className="SearchPageContainer">
      <p className="Header">+ JobQuiver<button onClick={logout}>LOGOUT</button></p>
      <Filters setResults={setResults} />
      <AllSearchResults state={results} />
    </div>
  );
};

export default SearchPage;
