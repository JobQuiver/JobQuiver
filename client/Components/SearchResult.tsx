import React, { FC } from 'react';

import Description from './Description';

const SearchResult: FC<any> = (props: any) => (
  <div>
    <div className="SearchResult">
      <div className="TitleAndSave">
        <p className="companyName">{props.companyName}</p>
        <button className="SaveButton">save</button>
      </div>
      <p className="title">{props.title}</p>
      <Description description={props.description}/>
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
