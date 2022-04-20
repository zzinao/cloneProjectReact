import React from 'react'
import { Text, Grid } from '../elements/index'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AiTwotoneDislike, AiOutlineDislike } from 'react-icons/ai'
import { actionCreators as postAction } from '../redux/modules/post'

const DisLikeIcon = (props) => {
  const isMyLike = props.likeCheck
  let isMyUnlike = props.unlikeCheck

  const [unlike, setUnLike] = React.useState(isMyUnlike)
  const dispatch = useDispatch()

  //likeCheck, unLikeCheck
  const { postNum } = useParams()

  const toggleDisLike = () => {
    // console.log(',,,')
    // if (unlike) {
    dispatch(postAction.unlikeDB(postNum, isMyLike, !isMyUnlike))
    setUnLike(!unlike)
  }
  // }
  if (unlike) {
    return (
      <Grid isFlex margin="0 15px;">
        <AiTwotoneDislike color="#fff" onClick={toggleDisLike} /> &nbsp;
        <Text margin="0 8px" color="#fff">
          {props.postUnlikeNum}개
        </Text>
      </Grid>
    )
  } else {
    return (
      <Grid isFlex margin="0 15px;">
        <AiOutlineDislike color="#fff" onClick={toggleDisLike} /> &nbsp;
        <Text margin="0 8px" color="#fff">
          {props.postUnlikeNum}개
        </Text>
      </Grid>
    )
  }
}

export default DisLikeIcon
