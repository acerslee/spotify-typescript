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
  font-family: Arial;
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemText = styled.p`
  margin-top: 0.3em;
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
          {item === 'Songs'
            ? <FaList style = {{color: 'white'}} />
            : <FaAmilia style = {{color: 'white'}} />
          }
          <ItemText>{item}</ItemText>
        </MenuItem>
      )
    })}
  </SidebarContainer>
);

export default Sidebar;