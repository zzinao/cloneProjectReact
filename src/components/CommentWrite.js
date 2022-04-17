import React from 'react'
import { Grid, Image, Button } from '../elements/index'
import styled from 'styled-components'

//코멘트 쓰는 곳
//인풋 포커스 시 취소, 댓글 버튼 나타나야함
const CommentWrite = (props) => {
  return (
    <>
      <Contanier>
        <Grid isFlex_start>
          <Image shape="profile" src={props.src} size="40" />
          <InputFiled type="text" placeholder="댓글 추가..." />
        </Grid>
        <Grid isFlex_end margin="20px">
          <Button text="취소" width="70px" margin="0 10px"></Button>
          <Button text="댓글" width="70px"></Button>
        </Grid>
      </Contanier>
    </>
  )
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
