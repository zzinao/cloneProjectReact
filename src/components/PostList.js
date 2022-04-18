import React from 'react';
import Post from './Post';
import styled from 'styled-components';

const PostList = (props) => {
  return (
    <VideoList>
      <Post />
      <Post />
      <Post />
      <Post />
    </VideoList>
  );
};

const VideoList = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

export default PostList;
