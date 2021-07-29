import React, { FC } from "react";

import Description from "./Description";

// TODO: update deletepost type
interface PreviousSearchProps {
  title: string;
  location: string;
  description: string;
  link: string;
  companyname: string;
  id: number;
  deletePost: any;
}

const PreviousSearch: FC<PreviousSearchProps> = ({
  title,
  location,
  description,
  link,
  companyname: companyName,
  id,
  deletePost,
}: PreviousSearchProps) => (
  <div>
    <div className="SearchResult">
      <div className="TitleAndSave">
        <p className="companyName">{companyName}</p>
        <button id={id.toString()} type="button" onClick={deletePost}>
          Un-save Post
        </button>
      </div>
      <p className="title">{title}</p>
      <Description description={description} />
      <p className="location">{location}</p>
      <p>
        {"See original posting "}
        <a href={link} className="link">
          here
        </a>
      </p>
    </div>
  </div>
);

export default PreviousSearch;
