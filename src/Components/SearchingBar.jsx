import React from 'react';

const SearchBar = ({ searchValue, setSearchValue }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search cities..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;