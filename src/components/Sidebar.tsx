import React from 'react';
import styled from 'styled-components';
import { FaList, FaAmilia } from 'react-icons/fa';

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
`;

const MenuItem = styled.div`

`;

const Sidebar = () => {
  return(
    <SidebarContainer>
      <MenuItem>
        <FaList />
        Songs
      </MenuItem>
      <MenuItem>
        <FaAmilia />
        Lyrics
      </MenuItem>
    </SidebarContainer>
  )
};

export default Sidebar;