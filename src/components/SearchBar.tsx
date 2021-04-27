import React, { useState } from 'react';

interface Props {
  getMusic: Function;
}

const SearchBar: React.FC<Props> = ({getMusic}) => {

  const [searchItem, setSearchItem] = useState('');

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchItem(event.currentTarget.value)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getMusic(searchItem);
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