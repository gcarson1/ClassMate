// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import "./Home.css"

import { SearchBar } from "../components/searchBars/uniSearchBar/universitySearch";
import { SearchResultsList } from "../components/searchBars/uniSearchBar/uniSearchResultsList";


function Home() {

  const [results, setResults] = useState([]);

  return (
    <div className="home-container">
      <div className="searchBar">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
      </div>
      <div className="support">
        <p>Are we missing your school/class/professor? <br></br>Let us know! ClassMate@support.com</p>
      </div>
    </div>
      
  )
}

export default Home