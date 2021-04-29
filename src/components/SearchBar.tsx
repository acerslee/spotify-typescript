import React, { useState } from 'react';


const SearchBar: React.FC = () => {

  const [searchItem, setSearchItem] = useState<string>('');

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchItem(event.currentTarget.value)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return(
    <form className = 'search-bar' onSubmit = {handleSubmit}>
      <input
        type = 'text'
        value = {searchItem}
        onChange = {handleChange}
      />
      <input type = 'submit' value = 'Submit' />
    </form>
  )
};

export default SearchBar;