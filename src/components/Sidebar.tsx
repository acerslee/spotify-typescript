import React from 'react';
import styled from 'styled-components';
import { FaMusic, FaList, FaMicrophone } from 'react-icons/fa';

interface Props {
  renderSidebarItem: Function
}

const SidebarContainer = styled.div`
  width: 7%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemText = styled.p`
  margin-top: 0.3em;
`;

const MenuItem = styled.div`
  font-family: Arial;
  color: white;
  margin: 1.5em 1.5em;
  text-align: center;
  &:hover {
    cursor: pointer;
    color: orange;
  }
`;

//try to add the user's playlists in the sidebar
const SidebarItems = ['Songs', 'Lyrics', 'Playlists'];

const renderSidebarIcons = (item: string) => {
  if (item === 'Songs') return <FaMusic />
  if (item === 'Lyrics') return <FaMicrophone />
  if (item === 'Playlists') return <FaList />
};

const Sidebar: React.FC<Props> = ({renderSidebarItem}) => (
  <SidebarContainer>
    {SidebarItems.map((item, index) => (
      <MenuItem
        key = {index}
        onClick = {() => renderSidebarItem(item)}
      >
        {renderSidebarIcons(item)}
        <ItemText>{item}</ItemText>
      </MenuItem>
    ))}
  </SidebarContainer>
);

export default Sidebar;