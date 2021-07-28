import React, { FC } from 'react';

// TODO: update deletepost type
interface PreviousSearchProps {
  title: string,
  location: string,
  description: string,
  link: string,
  companyName: string,
  id: number,
  deletePost: any,
};

const PreviousSearch: FC<PreviousSearchProps> = ({
  title,
  location,
  description,
  link,
  companyName,
  id,
  deletePost,
}: PreviousSearchProps) => (
  <div id={id.toString()}>
    <div className="PreviousSearch">
      <p className="SavedName">{title}</p>
      <p className="CompanyName">{companyName}</p>
      <p className="Description">{description}</p>
      <p className="Location">{location}</p>
      <p className="Link">{link}</p>
    </div>
    <button type="button" onClick={deletePost}>
      Delete Post
    </button>
  </div>
);

export default PreviousSearch;
