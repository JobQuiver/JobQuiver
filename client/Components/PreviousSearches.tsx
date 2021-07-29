import React, { FC } from 'react';
import PreviousSearch from './PreviousSearch';

interface SavedResult {
  title: string,
  location: string,
  description: string,
  link: string,
  companyname: string,
  apiWebsite: string,
  apiId: number,
  id: number,
};

interface PreviousSearchesProps {
  savedResults: SavedResult[],
  deletePost: Function,
}

const PreviousSearches: FC<PreviousSearchesProps> = (
  { savedResults, deletePost }: PreviousSearchesProps
) => {
  const formattedResults = savedResults.map((
    result: SavedResult, i: number
  ) => (
    <PreviousSearch
      key={`PreviousSearch${i}`}
      deletePost={deletePost}
      {...result}
    />
  ));

  return (
    <div>
      {formattedResults}
    </div>
  );
};

export default PreviousSearches;
