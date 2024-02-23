// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import "./App.css"

import NavBar from "./components/navBar/navBar"
import { SearchBar } from "./components/searchBars/universitySearch"
import { SearchResultsList } from "./components/searchBars/uniSearchResultsList";


function App() {

  const [results, setResults] = useState([]);

  return (
    <div className="content">
      <div className="navBar-wrapper">
        <NavBar />
      </div>
      <div className="searchBar">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
      </div>

    </div>



  )
}

export default App