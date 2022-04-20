import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, Image, Button } from '../elements/index';
import { commentActions } from '../redux/modules/comment';
import styled from 'styled-components';

//코멘트 쓰는 곳
//인풋 포커스 시 취소, 댓글 버튼 나타나야함
const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [comment, setComment] = useState('');
  // const post = useSelector((state) => state.comment.list.post)
  const comment_list = useSelector((state) => state.comment?.list?.comment);

  console.log(props[0]);
  const postNum = props[0];
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    if (comment === '') {
      window.alert('내용을 입력해주세요!');
      return;
    }
    dispatch(commentActions.addCommentDB(comment, postNum));
    setComment('');
  };

  return (
    <>
      <Contanier>
        <Grid isFlex_start>
          <Image shape='profile' src={props.src} size='40' />
          <InputFiled
            type='text'
            placeholder='댓글 추가...'
            defaultValue={comment}
            onChange={handleComment}
          />
        </Grid>
        <Grid isFlex_end margin='20px'>
          <Button text='취소' width='70px' margin='0 10px'></Button>
          <Button _onClick={addComment} text='댓글' width='70px'></Button>
        </Grid>
      </Contanier>
    </>
  );
};

const Contanier = styled.div`
  width: 90%;
`;

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
`;

export default CommentWrite;
