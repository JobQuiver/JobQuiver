import React, { FC } from 'react';

import Description from './Description';
import SaveButton from './SaveButton';

const SearchResult: FC<any> = (props: any) => (
  <div className="SearchResultsContainer">
    <div className="SearchResult">
      <div className="TitleAndSave">
        <div>
          <p className="companyName">{props.companyName}</p>
        </div>
        <div>
          <button className="ExpandButton">expand +</button>
          <SaveButton {...props} />
        </div>
      </div>
      <p className="title">{props.title}</p>
      <Description description={props.description} />
      <p className="location">{props.location}</p>
      <p>
        {'See original posting '}
        <a href={props.link} className="link">
          here
        </a>
      </p>
    </div>
  </div>
);

export default SearchResult;
