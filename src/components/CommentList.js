import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentActions } from '../redux/modules/comment'
import { Grid } from '../elements/index'
import Comment from './Comment'

//코멘트 뿌리기
const CommentList = (props) => {
  const dispatch = useDispatch()
  const comment_list = useSelector((state) => state.comment?.list?.comment)

  const { postNum } = props

  React.useEffect(() => {
    if (!comment_list[postNum]) {
      // 코멘트 정보가 없으면 불러오기
      dispatch(commentActions.getCommentDB(postNum))
    }
  }, [])

  //값없어서 터지는 오류 방지
  if (!comment_list[postNum] || !postNum) {
    return null
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[postNum].map((comment) => {
          return <Comment key={comment.commentId} {...comment} />
        })}
      </Grid>
    </React.Fragment>
  )
}

export default CommentList
