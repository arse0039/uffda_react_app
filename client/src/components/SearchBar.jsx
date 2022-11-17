import React from 'react';


const SearchBar = ({ headerData }) => {
    return (
        <div id="search-div">
            <select className='search-drop'>
            {headerData.map((header) => (
                <option value={header} name={header}>{header}</option> 
            ))}
            </select>

            <input type="text" className="search-input" placeholder="Name Filter"/>
        </div>

    )
}

export default SearchBar