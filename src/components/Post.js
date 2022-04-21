import React, { useState } from 'react';
import { Grid, Text, Image } from '../elements/index';
import { history } from '../redux/configureStore';
import { changeTime } from '../shared/ChangeTime';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
const Post = (props) => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <Container
        onClick={() => {
          history.push(`/detail/${props.postNum}`);
        }}
      >
        <div
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          {hover ? (
            <ReactPlayer
              url={props.postVideo}
              playing={true}
              muted={true}
              width='293px'
              height='170.5px'
              style={{ margin: '0px 0px 15px 0px' }}
            />
          ) : (
            <Image shape='rectangle' src_01={props.postThumb} />
          )}
        </div>
        <Parent>
          <Image
            shape='profile'
            src_01={props.userInfo.userProfile}
            margin='5px 20px 0 0'
          />
          <TitleBox>
            <Text margin='0' size='16px' weight='700' color='#fff'>
              {props.postTitle}
            </Text>
            <Text margin='3px 0' size='14px' color='#aaa' weight='500'>
              {props?.userInfo?.userId}
            </Text>
            <Text margin='0' color='#aaa' size='14px'>
              {props.postCnt} &nbsp; {changeTime(props.postDate)}
            </Text>
          </TitleBox>
        </Parent>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 293px;
  margin: 20px;
  cursor: pointer;
  padding: 1rem;
  min-height: 170px;
  flex-direction: column;
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
  font-weight: bold;
  left: 30%;
  display: inline-block;
  width: 70%;
`;

export default Post;
