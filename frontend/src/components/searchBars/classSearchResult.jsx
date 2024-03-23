// eslint-disable-next-line no-unused-vars
import React from "react";
import "./searchResult.css"

export const ClassSearchResult = ( {result} ) => {
return <div className="searchResult">{result.FullName}</div>
}