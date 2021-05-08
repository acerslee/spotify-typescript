import React, { useState } from 'react';

interface Props {
  changeSearchState: Function
}

const SearchBar: React.FC<Props> = ({changeSearchState}) => {

  const [searchItem, setSearchItem] = useState<string>('');

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchItem(event.currentTarget.value)
    changeSearchState(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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