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
};

interface PreviousSearchesProps {
  savedResults: SavedResults[],
}

const PreviousSearches: FC<PreviousSearchesProps> = (
  { savedResults }: PreviousSearchesProps
) => {
  const formattedResults = savedResults.map((result: SavedResults, i: number) => (
    <PreviousSearch
      key={`PreviousSearch${i}`}
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
