import React from 'react'
import Sidebar from '../components/Sidebar'
import PostList from '../components/PostList'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as postActions } from '../redux/modules/post'
import { Grid, Input, Text, Image } from '../elements/index'
import Header from '../shared/Header'

const Main = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(postActions.getMainDB())
  }, [])

  return (
    <>
      <Header />
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
  width: 20%;
  height: 100vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`
export default Main
