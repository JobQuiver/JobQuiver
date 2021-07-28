import React, { FC } from 'react';

const SearchResult: FC<any> = (props: any) => {
  const description = (
    <p
      className="description"
      dangerouslySetInnerHTML={{ __html: props.description }}
    />
  );

  // const Collapse = ({ collapsed, children }) => {
  //   const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  return (
    <div>
      <div className="SearchResult">
        <div className="TitleAndButtons">
          <div>
            <p className="companyName">{props.companyName}</p>
          </div>
          <div>
            <button className="ExpandButton">expand +</button>
            {/* <button className="ExpandButton" onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? 'Expand +' : 'Hide'} content</button> */}
            <button className="SaveButton">save</button>
          </div>
        </div>
        <p className="title">{props.title}</p>
        {/* <Collapsible trigger="content">{description}</Collapsible> */}
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
