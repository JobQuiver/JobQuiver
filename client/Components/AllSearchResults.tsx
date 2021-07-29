import React, { FC } from 'react';
import SearchResult from './SearchResult';

const AllSearchResults: FC<any> = (props: any) => {
  let searchResultArray = [];
  if (props.state) {
    props.state.forEach((object, i) => {
      searchResultArray.push(
        <SearchResult
          key={i++}
          companyName={object.companyName}
          title={object.title}
          description={object.description}
          location={object.location.name}
          link={object.link}
        />
      );
    });
  }

  return <div>{searchResultArray}</div>;
};

export default AllSearchResults;
