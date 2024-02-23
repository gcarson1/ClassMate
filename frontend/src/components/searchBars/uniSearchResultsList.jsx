// eslint-disable-next-line no-unused-vars
import React from "react";
import "./uniSearchResultsList.css"
import { SearchResult } from "./searchResult";
export const SearchResultsList = ({ results }) => {
    return  (
    <div className="results-list">
   
        {results.map((result, id) => {
            console.log(result.UniName);
            return <SearchResult result={result} key={id}/>
        })}
        </div>
    ) 
}