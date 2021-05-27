import React from 'react';
import styled from 'styled-components';

type UserInfo = {
  username: string,
  email: string,
  image: string,
  product: string
}

interface Props{
  userInfo: UserInfo
}

const ProfilePageContainer = styled.div`
  color: white;
`;

const Profilepage: React.FC<Props> = ({ userInfo }) => {
  return(
    <ProfilePageContainer>
      <h1>hello</h1>
    </ProfilePageContainer>
  )
}


export default Profilepage;