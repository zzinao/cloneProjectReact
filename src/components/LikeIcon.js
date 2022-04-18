import React from 'react';
import { Text, Grid } from '../elements/index';
import styled from 'styled-components';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

const LikeIcon = (props) => {
  //유저정보 받아와서 확인
  //메인에서 likeNum 가져오기

  // const isMyLike = ....

  // if(isMyLike){
  return (
    <Grid isFlex>
      <AiFillLike color='#fff' /> &nbsp;
      <Text margin='0 8px' color='#fff'>
        40만개
      </Text>
    </Grid>
  );
  // }else{
  //   return(
  //     <Container>
  //     <AiOutlineLike color="#fff"/> &nbsp;
  //     <Text>40만개</Text>
  //   </Container>
  //   )
  // }

  // ;
};

export default LikeIcon;
