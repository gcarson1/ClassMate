import { useState } from 'react';
import "./universitySearchBar.css"

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='searchBar-container'>
            <div className='searchBar'>
            <input className='textBox'
                type="text"
                placeholder="Search University..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
        </div>
        
    );
}

export default SearchBar;
