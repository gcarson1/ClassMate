// eslint-disable-next-line no-unused-vars
import React from "react";
import "./uniSearchResultsList.css"
import { SearchResult } from "./searchResult";
import { useNavigate } from "react-router-dom";


export const SearchResultsList = ({ results }) => {
  const navigate = useNavigate();

  const handleItemClick = (result) => {
    // Navigate to the UniversityPage with the selected result as state
    navigate(`/University/${result.UniID}`, { state: { result: result } });
  };

  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <div
            key={id}
            className="result-link"
            style={{ color: "inherit", textDecoration: "inherit", cursor: "pointer" }}
            onClick={() => handleItemClick(result)}
          >
            <SearchResult result={result} />
          </div>
        );
      })}
    </div>
  );
};