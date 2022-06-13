import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentActions } from '../redux/modules/comment'
import { Grid } from '../elements/index'
import Comment from './Comment'

//코멘트 뿌리기
const CommentList = (props) => {
  const dispatch = useDispatch()
  const comment_list = useSelector((state) => state?.comment?.list)

  const { postNum } = useParams()

  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(postNum))
  }, [])

  return (
    <React.Fragment>
      {comment_list ? (
        comment_list.map((c, i) => {
          return (
            <Grid key={c.commentNum}>
              <Comment {...c} />
            </Grid>
          )
        })
      ) : (
        <div> 댓글이 없네용</div>
      )}
    </React.Fragment>
  )
}

export default CommentList
