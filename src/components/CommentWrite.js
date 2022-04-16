import React from 'react'
import { Grid, Image } from '../elements/index'
import styled from 'styled-components'

//코멘트 쓰는 곳
const CommentWrite = (props) => {
  return (
    <Grid isFlex_start>
      <Image shape="profile" src={props.src} size="40" />
      <InputFiled type="text" placeholder="댓글 추가..." />
    </Grid>
  )
}

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
  width: 90%;
  &:focus {
    outline: none;
    border-bottom: 2px solid #fff;
    transition-duration: 0.25s;
  }
`

export default CommentWrite
