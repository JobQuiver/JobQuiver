import React, { FC } from 'react';

const SearchResult: FC<any> = (props: any) => {
  {
    /* <p className="Salary-Range"></p> */
  }

  const SavePost = () => {
    fetch('/TBD', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: json.stringify({})
    });
  };

  return (
    <div>
      <div className="SearchResult">
        <p className="CompanyName"></p>
        <p className="Description"></p>
        <p className="Position"></p>
        <p className="ExperienceLevel"></p>
      </div>
      <button type="button" onClick={() => SavePost()}>
        Save Posting
      </button>
    </div>
  );
};

export default SearchResult;
