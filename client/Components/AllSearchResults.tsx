import React, { FC } from 'react';

import SearchResult from './SearchResult';

const AllSearchResults: FC<any> = props => {
  return (
    <div>
      {props.state.map(
        ({ CompanyName, Description, Position, ExperienceLevel }, i) => {
          return (
            <SearchResult
              key={[i]}
              CompanyName={CompanyName}
              Description={Description}
              Position={Position}
              ExperienceLevel={ExperienceLevel}
            />
          );
        }
      )}
    </div>
  );
};

export default AllSearchResults;
