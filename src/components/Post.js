import React from 'react'
import { Grid, Text, Image } from '../elements/index'
import styled from 'styled-components'

const Post = (props) => {
  return (
    // <div className="video">
    //   <div ClassName="video_top">
    //     <img src="" alt="" />
    //   </div>
    //   <div className="video_title">Create</div>
    //   <div className="video_details">
    //     <span>조회수 5회</span>
    //     <span>5일 전</span>
    //   </div>
    //   <div className="video_channel">
    //     <img src="" alt="" />
    //     <p>유저 닉네임</p>
    //   </div>
    // </div>

    <Container>
      <Preview />
      <Parent>
        <Profile />
        <TitleBox>
          <Text margin="0" size="16px" weight="700" color="#fff">
            타이틀 제목이 들어갈거임
          </Text>
          <Text margin="3px 0" size="14px" color="#aaa" weight="500">
            항해 클론 5조
          </Text>
          <Text margin="0" color="#aaa" size="14px">
            조회수 100만회 &nbsp; 3일 전
          </Text>
        </TitleBox>
      </Parent>
    </Container>
  )
}

const Container = styled.div`
  width: 293px;
  margin: 20px;
  cursor: pointer;
`

const Preview = styled.div`
  width: 100%;
  height: 180px;
  background-color: #aaa;
`

const Profile = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 70%;
  margin: 5px 20px 0 0;
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
