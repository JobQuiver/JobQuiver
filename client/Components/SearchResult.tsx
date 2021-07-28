import React, { FC } from 'react';

import SaveButton from './SaveButton';

const SearchResult: FC<any> = (props: any) => {
  const description = (
    <p
      className="description"
      dangerouslySetInnerHTML={{ __html: props.description }}
    />
  );

  return (
    <div>
      <div className="SearchResult">
        <div className="TitleAndSave">
          <p className="companyName">{props.companyName}</p>
          <SaveButton {...props}/>
        </div>
        <p className="title">{props.title}</p>
        {description}
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
};

export default SearchResult;
