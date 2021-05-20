import React from 'react';

interface Props {
  name: string,
  image: [],
  tracks: number
}

const Playlist: React.FC<Props> = ({name, image, tracks}) => {
  return(
    <div>
      hello
    </div>
  )
};

export default Playlist