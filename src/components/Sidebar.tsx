import React from 'react';
import styled from 'styled-components';
import { FaList, FaAmilia } from 'react-icons/fa';

interface Props {
  renderSidebarItem: Function
}

const SidebarContainer = styled.div`
  position: fixed;
  height: auto;
  left: 0;
`;

const MenuItem = styled.div`
  height: 10vh;
  border: 1px solid;
  border-color: white;
`;

const ItemText = styled.p`
  color:white;
`;

const SidebarItems = ['Songs', 'Lyrics'];

const Sidebar: React.FC<Props> = ({renderSidebarItem}) => (
  <SidebarContainer>
    {SidebarItems.map((item, index) => {
      return(
        <MenuItem
          key = {index}
          onClick = {() => renderSidebarItem(item)}>
          {item === 'Songs' ? <FaList /> : <FaAmilia />}
          <ItemText>{item}</ItemText>
        </MenuItem>
      )
    })}
  </SidebarContainer>
);

export default Sidebar;