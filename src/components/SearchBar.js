import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      className="SearchBar"
      placeholder="Search users..."
      onChange={handleSearch}
    />
  );
};

export default SearchBar;