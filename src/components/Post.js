import React from 'react'
import { Grid, Text, Image } from '../elements/index'
import styled from 'styled-components'
import { history } from '../redux/configureStore'

const Post = (props) => {
  return (
    <Container
      onClick={() => {
        history.push('/watch')
      }}
    >
      <Preview />
      <Parent>
        <Image shape="profile" src={props.src} margin="5px 20px 0 0" />
        <TitleBox>
          <Text margin="0" size="16px" weight="700" color="#fff">
            여기에 타이틀이 들어갑니다요
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
//포스트 시간 변환 필요
Post.defaultProps = {
  post: [
    {
      postTitle: '드림코딩 자바스크립트 뽀개기',
      postCnt: 100,
      postDate: '3시간 전',
      userInfo: {
        userNick: '드림코딩엘리',
      },
    },
  ],
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
