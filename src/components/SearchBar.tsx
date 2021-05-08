import React, { useState } from 'react';
import axios from 'axios';

const SearchBar: React.FC = () => {

  const [searchItem, setSearchItem] = useState<string>('');

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchItem(event.currentTarget.value)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const searchItemResults = () => {
    axios.post('http://localhost:4000/search')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.error(err))
  }

  return(
    <form className = 'search-bar' onSubmit = {handleSubmit}>
      <input
        type = 'text'
        placeholder = 'Enter song name or artist'
        value = {searchItem}
        onChange = {handleChange}
      />
      <input type = 'submit' value = 'Submit' />
    </form>
  )
};

export default SearchBar;