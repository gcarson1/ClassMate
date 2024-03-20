import { useParams } from "react-router-dom"
import { useState } from "react";
import "./UniversityPage.css"
import { ClassSearchBar } from "../components/searchBars/classSearchBar";
import { SearchResultsList } from "../components/searchBars/uniSearchResultsList"




export default function UniversityPage() {
  const [results, setResults] = useState([]);
  const { id } = useParams();

  return (

    <div className="container">
        <h1 className="university-header">{ id }</h1>
        <div className="searchBar">
        <ClassSearchBar setResults={setResults} university={id} />
        <SearchResultsList results={results}/>
      </div>
        </div>
  )
}
