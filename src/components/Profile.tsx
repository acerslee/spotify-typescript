import React from 'react';

interface Props{
  userInfo: object
}

const Profile: React.FC<Props> = ({userInfo}) => {
  return(
    <div>
      {/* {userInfo.email !== '' &&
        <div>hi</div>
      } */}
    </div>
  )
};

export default Profile;