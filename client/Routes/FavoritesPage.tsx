import React, { FC, useState, useEffect } from 'react';

import PreviousSearches from '../Components/PreviousSearches';
// import Header from '../Components/Header';

const MY_SAVED_RESULTS = 'My Saved Results';
const SAVED_RESULTS_ROUTE = '/savedResults';
const ERROR_TEXT = 'An error has occurred. Please refresh and try again.';
const DELETE = 'DELETE';
const HEADERS = {
  'Content-Type': 'application/json',
};

interface SavedResult {
  title: string;
  location: string;
  description: string;
  link: string;
  companyName: string;
  apiWebsite: string;
  apiId: number;
  id: number;
}

const FavoritesPage: FC<any> = () => {
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(SAVED_RESULTS_ROUTE)
      .then(res => res.json())
      .then(newSavedResults => setSavedResults(newSavedResults))
      .catch(err => {
        console.log(
          `An error has occurred in the FavoritesPage component while getting saved results: ${err}`
        );
        setError(ERROR_TEXT);
      });
  }, []);

  // TODO: update event type.
  const deletePost = e => {
    const { id } = e.target;

    fetch(SAVED_RESULTS_ROUTE + '/' + id, {
      method: DELETE,
      headers: HEADERS,
    })
      .then(() => {
        const updatedSavedResults: SavedResult[] = savedResults.filter(
          result => result.id !== Number(id)
        );

        setSavedResults(updatedSavedResults);
      })
      .catch(err => {
        console.log(
          `An error has occurred in the FavoritesPage component while un-saving a result: ${err}`
        );
        setError(ERROR_TEXT);
      });
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="FavoritePageHeaderContainer">
        <p className="FavoriteHeader">+ JobQuiver</p>
        <a
          className="FavoritePageSecondaryHeaderText"
          href="http://localhost:8080/#/SearchPage"
        >
          Search Page
        </a>
      </div>
      <div className="FavoritePageContainer">
        <p className="FavoritePageHeading">{MY_SAVED_RESULTS}</p>
        {error && <div>{error}</div>}
        <PreviousSearches savedResults={savedResults} deletePost={deletePost} />
      </div>
    </div>
  );
};

export default FavoritesPage;
