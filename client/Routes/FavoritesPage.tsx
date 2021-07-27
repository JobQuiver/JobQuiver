import React, { FC } from 'react';
import PreviousSearches from '../Components/PreviousSearches';

const FavoritesPage: FC<any> = (props: any) => {
  return (
    <div>
      <p>My Recent Searches</p>
      <PreviousSearches />
    </div>
  );
};

export default FavoritesPage;
