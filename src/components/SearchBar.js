import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <FaSearch />
      <input
        type="text"
        placeholder="Search Song, Artist"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;