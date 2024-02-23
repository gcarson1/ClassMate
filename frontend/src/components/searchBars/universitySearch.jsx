import React, { useState } from 'react';
import "./universitySearchBar.css"

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='searchBar-container'>
            <input className='textBox'
                type="text"
                placeholder="Search University..."
                value={searchTerm}
                onChange={handleChange}
            />
            <button className='searchButton' onClick={() => console.log('Searching for:', searchTerm)}>
               Search
            </button>
        </div>
    );
}

export default SearchBar;
