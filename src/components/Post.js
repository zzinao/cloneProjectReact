import React from 'react'
import { Grid, Text, Image } from '../elements/index'
import styled from 'styled-components'
import { history } from '../redux/configureStore'
import ReactPlayer from 'react-player/lazy'

const Post = (props) => {
  console.log(props)

  return (
    <>
      <Container
        onClick={() => {
          history.push(`/detail/${props.postNum}`)
        }}
      >
        {/* <Preview src={props.postThumb} /> */}
        <ReactPlayer url={props.postVideo} playing={false} muted={false} />
        <Parent>
          <Image
            shape="profile"
            src_01={props.userInfo.userProfile}
            margin="5px 20px 0 0"
          />
          <TitleBox>
            <Text margin="0" size="16px" weight="700" color="#fff">
              {props.userInfo.userId}
            </Text>
            <Text margin="3px 0" size="14px" color="#aaa" weight="500">
              {props.postTitle}
            </Text>
            <Text margin="0" color="#aaa" size="14px">
              {props.postCnt} &nbsp; {props.postDate}
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
