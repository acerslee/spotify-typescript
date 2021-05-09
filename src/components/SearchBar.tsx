import React from 'react';

interface Props {
  changeSearchState: Function
}

const SearchBar: React.FC<Props> = ({changeSearchState}) => {

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    changeSearchState(event.currentTarget.value);
  };

  return(
    <form className = 'search-bar'>
      <input
        type = 'text'
        placeholder = 'Enter song name or artist'
        onChange = {handleChange}
      />
    </form>
  )
};

export default SearchBar;