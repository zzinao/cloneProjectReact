import React from 'react'
import Sidebar from '../components/Sidebar'
import PostList from '../components/PostList'
import styled from 'styled-components'
import { Grid, Input, Text, Image } from '../elements/index'

const Main = () => {
  return (
    <>
      <Grid isFlex>
        <Sidebar />
        <Container>
          <PostList />
        </Container>
      </Grid>
    </>
  )
}

const Container = styled.div`
  background-color: #181818;
  margin-left: 220px;
  width: 100%;
  height: 100vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`
export default Main
