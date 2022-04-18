import React from 'react';
import Post from './Post';
import { Grid, Text, Image } from '../elements/index';
import styled from 'styled-components';

const PostList = (props) => {
  return (
    <VideoList>
      <>
        <Post />
        <Parent>
          <Image shape='profile' src={props.src} margin='5px 20px 0 0' />
          <TitleBox>
            <Text margin='0' size='16px' weight='700' color='#fff'>
              {/* 제목이 있는곳 */}
              {props.postTitle}
            </Text>
            <Text margin='3px 0' size='14px' color='#aaa' weight='500'>
              {/* 항해 클론 5조 */}
              {props.userNick}
            </Text>
            <Text margin='0' color='#aaa' size='14px'>
              {/* 조회수 100만회 &nbsp; 3일 전 */}
              {props.postDate}
            </Text>
          </TitleBox>
        </Parent>
      </>
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

const Profile = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 70%;
  margin: 5px 20px 0 0;
  background-color: #aaa;
`;
const Parent = styled.div`
  display: flex;
  align-items: flex-start;
  height: 50px;
  margin: 10px 0 0;
`;
const TitleBox = styled.div`
margin: 5px;
font-size: 1em;
font-weigth: bold;
left: 30%,
display: inline-block;
width: 70%
`;
export default PostList;
