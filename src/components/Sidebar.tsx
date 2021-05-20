import React from 'react';
import styled from 'styled-components';
import { FaMusic, FaList, FaMicrophone } from 'react-icons/fa';

interface Props {
  renderSidebarItem: Function
}

const SidebarContainer = styled.div`
  width: 8%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemText = styled.p`
  margin-top: 0.3em;
  color: white;
`;

const FaMusicIcon = styled(FaMusic)`
  color: white;
`;

const FaListIcon = styled(FaList)`
  color: white;
`;

const FaMicrophoneIcon = styled(FaMicrophone)`
  color: white;
`;

const MenuItem = styled.div`
  font-family: Arial;
  margin: 1.5em 1.5em;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  &:hover ${ItemText}{
    color: orange;
  }
  &:hover ${FaMusicIcon}{
    color: orange;
  }
  &:hover ${FaMicrophoneIcon}{
    color: orange;
  }
  &:hover ${FaListIcon}{
    color: orange;
  }
`;

//try to add the user's playlists in the sidebar
const SidebarItems = ['Songs', 'Lyrics', 'Playlists'];

const renderSidebarIcons = (item: string) => {
  if (item === 'Songs') return <FaMusicIcon />
  if (item === 'Lyrics') return <FaMicrophoneIcon />
  if (item === 'Playlists') return <FaListIcon />
};

const Sidebar: React.FC<Props> = ({renderSidebarItem}) => (
  <SidebarContainer>
    {SidebarItems.map((item, index) => {
      return(
        <MenuItem
          key = {index}
          onClick = {() => renderSidebarItem(item)}
        >
          {renderSidebarIcons(item)}
          <ItemText>{item}</ItemText>
        </MenuItem>
      )
    })}
  </SidebarContainer>
);

export default Sidebar;