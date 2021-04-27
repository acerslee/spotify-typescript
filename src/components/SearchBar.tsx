import React, { useState } from 'react';

const SearchBar = () => {

  const [searchItem, setSearchItem] = useState('');

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchItem(event.currentTarget.value)
    console.log(searchItem);
  };

  return(
    <form className = 'search-bar'>
      <input
        type = 'text'
        value = {searchItem}
        onChange = {handleChange}
      />
    </form>
  )
};

export default SearchBar;