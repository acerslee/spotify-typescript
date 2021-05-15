import React from 'react';
import styled from 'styled-components';

interface Props {
  changeSearchState: Function
}

const InputSearch = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0.5rem;
`;

const SearchBar: React.FC<Props> = ({changeSearchState}) => {

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    changeSearchState(event.currentTarget.value);
  };

  return(
    <form className = 'search-bar'>
      <InputSearch
        type = 'text'
        placeholder = 'Enter song name or artist'
        onChange = {handleChange}
      />
    </form>
  );
};

export default SearchBar;