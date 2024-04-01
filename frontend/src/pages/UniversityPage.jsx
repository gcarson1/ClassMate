import { useState } from "react";
import "./UniversityPage.css"
import { ClassSearchBar } from "../components/searchBars/classSearchBar/classSearchBar";
import { ClassSearchResultsList } from "../components/searchBars/classSearchBar/classSearchResultList"
import { useLocation } from "react-router-dom";




export default function UniversityPage() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  
  const result  = location.state.result;

  return (
    <div className="container">
        <h1 className="university-header">{result ? result.UniName : "Loading..."}</h1>
        <div className="searchBar">
        <ClassSearchBar setResults={setResults} uniID={ result.UniID } />
        <ClassSearchResultsList results={results} Uni={result.UniID}/>
      </div>
        </div>
  )
}
