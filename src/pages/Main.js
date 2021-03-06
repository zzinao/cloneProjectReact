import React from 'react'
import Sidebar from '../components/Sidebar'
import PostList from '../components/PostList'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as postActions } from '../redux/modules/post'
import { Grid, Input, Text, Image } from '../elements/index'

const Main = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(postActions.getMainDB())
  }, [])

  return (
    <>
      <Grid isFlex>
        <Sidebar />
        <PostList />
      </Grid>
    </>
  )
}

export default Main
