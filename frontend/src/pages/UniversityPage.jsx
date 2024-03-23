import { useState } from "react";
import "./UniversityPage.css"
import { ClassSearchBar } from "../components/searchBars/classSearchBar";
import { ClassSearchResultsList } from "../components/searchBars/classSearchResultList"
import { useLocation } from "react-router-dom";




export default function UniversityPage() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  
  const result  = location.state.result;



   // Checking if result exists before rendering
   if (!result) {
    // Handle the case where result is not available
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
        <h1 className="university-header">{result ? result.UniName : "Loading..."}</h1>
        <div className="searchBar">
        <ClassSearchBar setResults={setResults} uniID={ result.UniID } />
        <ClassSearchResultsList results={results}/>
      </div>
        </div>
  )
}
