import React, { FC } from 'react';
import { render } from 'react-dom';

import SearchResult from './SearchResult';

const AllSearchResults: FC<any> = (props: any) => {
  return (
    <div>
      {/* {this.props.state.map({CompanyName, Description, Position, ExperienceLevel} => {
        return <SearchResult key={[i]} CompanyName={CompanyName} Description={Description} Position={Position} ExperienceLevel={ExperienceLevel}/>;
      })} */}
    </div>
  );
};

export default AllSearchResults;
