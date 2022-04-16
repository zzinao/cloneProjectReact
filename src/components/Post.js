import React from 'react'
import { Grid, Text, Image } from '../elements/index'
import styled from 'styled-components'

const Post = (props) => {
  return (
    <Grid>
      <Preview />
      <Grid isFelx>
        <Profile />
        <Text color="#fff">여긴 타이틀</Text>
        <Text color="#eee">유저 닉네임</Text>
        <Grid Is Flex_start>
          <Text color="#eee">조회수 : 회</Text>
          <Text color="#eee">1개월 전</Text>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Preview = styled.div``

const Profile = styled.div``

export default Post
