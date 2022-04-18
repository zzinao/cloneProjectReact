import React from 'react';
import { Text, Grid } from '../elements/index';
import styled from 'styled-components';
import { AiTwotoneDislike, AiOutlineDislike } from 'react-icons/ai';

const DisLikeIcon = (props) => {
  //유저정보 받아와서 확인
  //메인에서 DislikeNum 가져오기

  // const isMyDisLike = ....

  // if(isMyDisLike){
  return (
    <Grid isFlex>
      <AiTwotoneDislike color='#fff' /> &nbsp;
      <Text margin='0 10px' color='#fff'>
        40만개
      </Text>
    </Grid>
  );
  // }else{
  //   return(
  //     <Container>
  //     <AiOutlineDislike color="#fff"/> &nbsp;
  //     <Text>40만개</Text>
  //   </Container>
  //   )
  // }

  // ;
};

// const Container = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-itmes: center;
// `

export default DisLikeIcon;
