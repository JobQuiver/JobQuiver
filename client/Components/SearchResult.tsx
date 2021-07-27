import React, { FC } from 'react';
import { render } from 'react-dom';

const SearchResult: FC<any> = (props: any) => {
  {
    /* <p className="Salary-Range"></p> */
  }

  return (
    <div className="SearchResult">
      <p className="CompanyName"></p>
      <p className="Description"></p>
      <p className="Position"></p>
      <p className="ExperienceLevel"></p>
    </div>
  );
};

export default SearchResult;
