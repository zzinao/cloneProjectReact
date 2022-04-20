import React from 'react'
import { Grid, Text, Image, Button } from '../elements/index'
import { useDispatch } from 'react-redux'
import { commentActions } from '../redux/modules/comment'
import { changeTime } from '../shared/ChangeTime'
import styled from 'styled-components'
//icons
import { FaEdit, FaTrash } from 'react-icons/fa'

const Comment = (props) => {
  console.log(props)

  const dispatch = useDispatch()
  const commentNum = props.commentNum
  const contents = props.contents
  const deleteComment = () => {
    dispatch(commentActions.deleteCommentDB(commentNum))
  }
  const updateComment = () => {
    dispatch(commentActions.updateCommentDB(contents, commentNum))
  }
  // 왜 오류 뜨는지 확인하기....
  // const userProfile = props.userInfo.userProfile

  return (
    <>
      <Grid>
        <Parent>
          <Image
            src_01={props.userProfile}
            size="40"
            shape="profile"
            margin="10px 10px 0 0"
          />
          <CommentBox margin="5px">
            <Grid isFlex>
              <Grid isFlex_start>
                <Text weight="700" color="#fff" margin="0 20px 0 0">
                  {props.userNick}
                </Text>
                <Text size="12px" color="#aaa">
                  {changeTime(props.commentDate)}
                </Text>
              </Grid>
              <Grid isFelx_end>
                <FaEdit
                  color="#aaa"
                  className="rgIcons"
                  onClick={updateComment}
                />
                <FaTrash
                  color="#aaa"
                  className="rgIcons"
                  onClick={deleteComment}
                />
              </Grid>
            </Grid>

            <Text size="14px" weight="700" color="#fff">
              {props.contents}
            </Text>
          </CommentBox>
        </Parent>
      </Grid>
    </>
  )
}

const CommentBox = styled.div`
  width: 85%;
`

const Parent = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  margin: 10px 0 0;
`

export default Comment
