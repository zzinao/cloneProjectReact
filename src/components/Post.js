import React from 'react'
import { Grid, Text, Image } from '../elements/index'
import { history } from '../redux/configureStore'
import { changeTime } from '../shared/ChangeTime'
import ReactPlayer from 'react-player/lazy'
import styled from 'styled-components'
const Post = (props) => {
  return (
    <>
      <Container
        onClick={() => {
          history.push(`/detail/${props.postNum}`)
        }}
      >
        <Image shape="rectangle" src_01={props.postThumb} />
        {/* <Preview src={props.postThumb} /> */}
        {/* <ReactPlayer url={props.postVideo} playing={false} muted={false} /> */}
        <Parent>
          <Image
            shape="profile"
            src_01={props.userInfo.userProfile}
            margin="5px 20px 0 0"
          />
          <TitleBox>
            <Text margin="0" size="16px" weight="700" color="#fff">
              {props.postTitle}
            </Text>
            <Text margin="3px 0" size="14px" color="#aaa" weight="500">
              {props?.userInfo?.userId}
            </Text>
            <Text margin="0" color="#aaa" size="14px">
              {props.postCnt} &nbsp; {changeTime(props.postDate)}
            </Text>
          </TitleBox>
        </Parent>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 293px;
  margin: 20px;
  cursor: pointer;
  padding: 1rem;
  min-height: 170px;
  flex-direction: column;
`

const Preview = styled.div`
  width: 100%;
  height: 180px;
  background-color: #aaa;
`

const Parent = styled.div`
  display: flex;
  align-items: flex-start;
  height: 50px;
  margin: 10px 0 0;
`
const TitleBox = styled.div`
margin: 5px;
font-size: 1em;
font-weigth: bold;
left: 30%,
display: inline-block;
width: 70%
`

export default Post
