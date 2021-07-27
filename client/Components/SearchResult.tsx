import React, { FC } from 'react';

const SearchResult: FC<any> = (props: any) => {
  {
    /* <p className="Salary-Range"></p> */
  }

  // const SavePost = () => {
  //   fetch('/TBD', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     // body: json.stringify({})
  //   });
  // };
  const description = (
    <p
      className="description"
      dangerouslySetInnerHTML={{ __html: props.description }}
    />
  );

  return (
    <div>
      <div className="SearchResult">
        <p className="companyName">{props.companyName}</p>
        <p className="title">{props.title}</p>
        {description}
        <p className="location">{props.location}</p>
        <p>
          {'See original posting '}
          <a href={props.link} className="link">
            here
          </a>
          .
        </p>
      </div>
      {/* <button type="button" onClick={() => SavePost()}>
        Save Posting
      </button> */}
    </div>
  );
};

export default SearchResult;
