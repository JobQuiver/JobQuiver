// import Description from './Description';

// // TODO: update deletepost type
// interface PreviousSearchProps {
//   title: string;
//   location: string;
//   description: string;
//   link: string;
//   companyName: string;
//   id: number;
//   deletePost: any;
// }

// const PreviousSearch: FC<PreviousSearchProps> = ({
//   title,
//   location,
//   description,
//   link,
//   companyName,
//   id,
//   deletePost,
// }: PreviousSearchProps) => (
//   <div>
//     <div className="SearchResult">
//       <div className="TitleAndSave">
//         <p className="companyName">{companyName}</p>
//         <button id={id.toString()} type="button" onClick={deletePost}>
//           Un-save Post
//         </button>
//       </div>
//       <p className="title">{title}</p>
//       <Description description={description} />
//       <p className="location">{location}</p>
//       <p>
//         {'See original posting '}
//         <a href={link} className="link">
//           here
//         </a>
//       </p>
//     </div>
//   </div>
// );

// export default PreviousSearch;

import React, { FC, useState } from 'react';

import Description from './Description';

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
}: PreviousSearchProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const inlineStyling = isCollapsed
    ? null
    : { maxHeight: 'none', overflow: 'auto' };

  return (
    <div>
      <div className="SearchResult FavoritePage">
        <div className="TitleAndSave">
          <p className="companyName">{companyName}</p>
          <div className="FavoriteButtons">
            <button className="ExpandButton" onClick={handleClick}>
              {isCollapsed ? 'Expand +' : 'Hide -'}
            </button>
            <button
              className="unsavePost"
              id={id.toString()}
              type="button"
              onClick={deletePost}
            >
              Un-save Post
            </button>
          </div>
        </div>
        <p className="title">{title}</p>
        <div className="description-container" style={inlineStyling}>
          <Description description={description} />
        </div>
        <p className="location">{location}</p>
        <p>
          {'See original posting '}
          <a href={link} className="link">
            here
          </a>
        </p>
      </div>
    </div>
  );
};

export default PreviousSearch;
