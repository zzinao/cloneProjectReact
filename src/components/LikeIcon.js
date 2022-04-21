import React from 'react'
import { Text, Grid } from '../elements/index'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { actionCreators as postAction } from '../redux/modules/post'
//변수명 좀 쉽게 다시 쓰귀.....
const LikeIcon = (props) => {
  const isMyLike = props.likeCheck
  let isMyUnlike = props.unlikeCheck
  const likeNum = props.postLikeNum

  const [like, setLike] = React.useState(isMyLike)
  const dispatch = useDispatch()

  //likeCheck, unLikeCheck
  const { postNum } = useParams()

  const toggleLike = () => {
    dispatch(postAction.isLikeDB(postNum, like, isMyUnlike, likeNum))
    setLike(!like)
  }
  // }

  if (!like) {
    return (
      <Grid isFlex margin="0 15px;">
        <AiOutlineLike color="#fff" onClick={toggleLike} /> &nbsp;
        <Text margin="0 8px" color="#fff">
          {props.postLikeNum}개
        </Text>
      </Grid>
    )
  } else {
    return (
      <Grid isFlex margin="0 15px;">
        <AiFillLike onClick={toggleLike} color="#fff" /> &nbsp;
        <Text margin="0 8px" color="#fff">
          {props.postLikeNum}개
        </Text>
      </Grid>
    )
  }
}

export default LikeIcon
