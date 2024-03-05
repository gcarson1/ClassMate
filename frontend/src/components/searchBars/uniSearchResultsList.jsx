// eslint-disable-next-line no-unused-vars
import React from "react";
import "./uniSearchResultsList.css"
import { SearchResult } from "./searchResult";
import { NavLink } from "react-router-dom";
export const SearchResultsList = ({ results }) => {
    return  (
    <div className="results-list">
   
        {results.map((result, id) => {
            console.log(result.UniName);
            return (
                <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} key={id} to={`/University/${result.UniName}`} className="result-link">
                  <SearchResult result={result} />
                </NavLink>
              );
        })}
        </div>
    ) 
}