import React from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Text, Image } from '../elements';
<container />
const Post = (props) => {
  const postOne = useSelector((state) => state.post.detail);
  return (
    <React.Fragment>
      <Grid>
        <ReactPlayer url={{data.postVideo}} />
        {/* <video
          width='100%'
          height='600px'
          frameBorder='0'
          controls
          autoPlay='autoPlay'
          muted='muted'
        >
          <source
            src={'https://www.youtube.com/watch?v=N3WgD1LCPJc'}
            type='video/mp4'
          />
        </video> */}
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
};

export default Post;
