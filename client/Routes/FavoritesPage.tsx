import React, { FC, useState, useEffect } from 'react';
import PreviousSearches from '../Components/PreviousSearches';

const MY_SAVED_RESULTS = 'My Saved Results';
const SAVED_RESULTS_ROUTE = '/savedResults';
const ERROR_TEXT = 'An error has occurred. Please refresh and try again.'
interface SavedResults {
  title: string,
  location: string,
  description: string,
  link: string,
  companyName: string,
  apiWebsite: string,
  apiId: number,
};

const FavoritesPage: FC<any> = (props: any) => {
  const [savedResults, setSavedResults] = useState<SavedResults[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(SAVED_RESULTS_ROUTE)
      .then(res => res.json())
      .then(newSavedResults => setSavedResults(newSavedResults))
      .catch(err => {
        console.log(`An error has occurred in the FavoritesPage component while getting saved results: ${err}`);
        setError(ERROR_TEXT);
      });
  }, []);

  return (
    <div>
      <p>{MY_SAVED_RESULTS}</p>
      {error && <div>{error}</div>}
      <PreviousSearches savedResults={savedResults}/>
    </div>
  );
};

export default FavoritesPage;
