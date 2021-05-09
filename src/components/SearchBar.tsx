import React from 'react';
import styled from 'styled-components';

interface Props {
  changeSearchState: Function
}

const Searchbar = styled.form`
  width: 30rem;
`

const SearchBar: React.FC<Props> = ({changeSearchState}) => {

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    changeSearchState(event.currentTarget.value);
  };

  return(
    <Searchbar>
      <input
        type = 'text'
        placeholder = 'Enter song name or artist'
        onChange = {handleChange}
      />
    </Searchbar>
  )
};

export default SearchBar;