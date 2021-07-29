import React, { FC, useState } from 'react';

import Description from './Description';
import SaveButton from './SaveButton';

const SearchResult: FC<any> = (props: any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const inlineStyling = isCollapsed
    ? null
    : { maxHeight: 'none', overflow: 'auto' };

  return (
    <div>
      <div className="SearchResult">
        <div className="TitleAndSave">
          <p className="companyName">{props.companyName}</p>
          <button className="ExpandButton" onClick={handleClick}>
            {isCollapsed ? 'expand +' : 'hide -'}
          </button>
          <SaveButton {...props} />
        </div>
        <p className="title">{props.title}</p>
        <div className="description-container" style={inlineStyling}>
          <Description description={props.description} />
        </div>
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

// import React, { FC } from 'react';

// import Description from './Description';
// import SaveButton from './SaveButton';

// const SearchResult: FC<any> = (props: any) => (
//   <div className="SearchResultsContainer">
//     <div className="SearchResult">
//       <div className="TitleAndSave">
//         <div>
//           <p className="companyName">{props.companyName}</p>
//         </div>
//         <div>
//           <button className="ExpandButton">expand +</button>
//           <SaveButton {...props} />
//         </div>
//       </div>
//       <p className="title">{props.title}</p>
//       <Description description={props.description} />
//       <p className="location">{props.location}</p>
//       <p>
//         {'See original posting '}
//         <a href={props.link} className="link">
//           here
//         </a>
//       </p>
//     </div>
//   </div>
// );

// export default SearchResult;
