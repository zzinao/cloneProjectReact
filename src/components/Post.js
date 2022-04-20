import React from 'react'
import { Grid, Text, Image } from '../elements/index'
import { history } from '../redux/configureStore'
import { changeTime } from '../shared/ChangeTime'
import ReactPlayer from 'react-player/lazy'
import styled from 'styled-components'
const Post = (props) => {
  console.log(props)
  return (
    <>
      <Container>
        <Image />
        <Parent>
          <Image />

          <Text>테스트</Text>
        </Parent>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
`

const Parent = styled.div`
  display: flex;
`

export default Post
