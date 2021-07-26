import React, {FC} from "react"; 
import { render } from "react-dom"; 

const SearchResult: FC<any> = (props: any) => {

  {/* <p className="Salary-Range"></p> */}

  return (
    <div className="SearchResult">
      <p className="Company-Name"></p>
      <p className="Description"></p>
      <p className="Position"></p>
      <p className="Experience-level"></p>
    </div>
  )
}

export default SearchResult; 