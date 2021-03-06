import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Grid, Image, Button } from '../elements/index'
import { commentActions } from '../redux/modules/comment'
import styled from 'styled-components'

//코멘트 쓰는 곳
//인풋 포커스 시 취소, 댓글 버튼 나타나야함
const CommentWrite = (props) => {
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state?.user?.user?.userProfile)
  const userNick = useSelector((state) => state?.user?.user?.userNick)
  const [comment, setComment] = useState('')
  const is_token = localStorage.getItem('token') ? true : false

  const postNum = props[0]
  const handleComment = (e) => {
    setComment(e.target.value)
  }

  console.log(props)

  const addComment = () => {
    if (comment === '') {
      window.alert('내용을 입력해주세요!')
      return
    }
    dispatch(
      commentActions.addCommentDB(comment, postNum, userNick, userProfile),
    )
    setComment('')
  }
  if (is_token) {
    return (
      <>
        <Contanier>
          <Grid isFlex_start>
            <Image shape="profile" src_01={userProfile} size="40" />
            <InputFiled
              type="text"
              placeholder="댓글 추가..."
              defaultValue={comment}
              onChange={handleComment}
            />
          </Grid>
          <Grid isFlex_end margin="20px">
            <Button text="취소" width="70px" margin="0 10px"></Button>
            <Button _onClick={addComment} text="댓글" width="70px"></Button>
          </Grid>
        </Contanier>
      </>
    )
  } else {
    ;<>.</>
  }
}

const Contanier = styled.div`
  width: 90%;
`

const InputFiled = styled.input`
  width: 100%;
  margin: 0 30px 0;
  border: none;
  border-bottom: 1px solid #aaa;
  background-color: transparent;
  box-sizing: border-box;
  position: relative;
  height: 30px;
  color: #fff;
  padding: 0 20px;
  font-size: 15px;
  &:focus {
    outline: none;
    border-bottom: 2px solid #fff;
    transition-duration: 0.25s;
  }
`

export default CommentWrite
