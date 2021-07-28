import React, { FC } from 'react';
import PreviousSearch from './PreviousSearch';

interface SavedResults {
  title: string,
  location: string,
  description: string,
  link: string,
  companyName: string,
  apiWebsite: string,
  apiId: number,
  id: number,
};

interface PreviousSearchesProps {
  savedResults: SavedResults[],
  deletePost: Function,
}

const PreviousSearches: FC<PreviousSearchesProps> = (
  { savedResults, deletePost }: PreviousSearchesProps
) => {
  const formattedResults = savedResults.map((result: SavedResults, i: number) => (
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
