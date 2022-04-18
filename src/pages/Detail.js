import React from 'react';
import { Grid, Text, Image, LikeIcons, Button, Input } from '../elements/index';
import LikeIcon from '../components/LikeIcon';
import DisLikeIcon from '../components/DisLikeIcon';
import Header from '../shared/Header';
import styled from 'styled-components';
import CommentWrite from '../components/CommentWrite';
import CommentList from '../components/CommentList';
import Post from '../redux/modules/post';

const Detail = (props) => {
  return (
    <React.Fragment>
      <Header />
      {/* <Preview /> */}
      <>
        <Post />
      </>
      <Container>
        <TitleBox>
          <Text weight='700' size='22px' color='#fff' margin='20px 0 0'>
            여기에 타이틀 들어감
          </Text>
          <Grid isFlex>
            <Text color='#aaa' size='14px' margin='10px 0 20px'>
              조회수 23423553회 &nbsp; 최초 공개 2022.4.1
            </Text>
            <Grid isFlex>
              <LikeIcon />
              <DisLikeIcon />
              <Text color='#fff' weight='700' margin=' 0 8px'>
                공유
              </Text>
            </Grid>
          </Grid>
        </TitleBox>

        <Hr />

        <UserInfoBox>
          <Parent>
            <Image
              shape='profile'
              src={props.src}
              margin='5px 20px 0 0'
              size='50'
            />
            <ContentBox>
              <Grid isFlex_start>
                <Text margin='0 30px 0 0' size='16px' weight='700' color='#fff'>
                  유저 닉네임
                </Text>
                <Button
                  width='50px'
                  padding='5px 10px'
                  marign='0'
                  text='구독'
                  bg='#CC0000'
                ></Button>
              </Grid>
              <Text margin='3px 0' size='12px' color='#aaa' weight='500'>
                구독자수 140만명
              </Text>
              <Text margin='25px 0' color='#fff' size='15px'>
                컨텐츠 내용 블라블라 이것 저것 붙여놔
              </Text>
            </ContentBox>
          </Parent>
        </UserInfoBox>

        <Hr />
        <CommentBox>
          <Text color='#fff' weight='700'>
            댓글 3432개
          </Text>
          <CommentWrite />
          {/* <CommentList /> */}
        </CommentBox>
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  padding: 10px 40px;
`;

const Preview = styled.div`
  width: 100%;
  height: 500px;
  background-color: black;
`;

const TitleBox = styled.div``;

const CommentBox = styled.div``;

const Hr = styled.hr`
  border: none;
  height: 0.3px;
  color: #3d3d3d;
  background-color: #3d3d3d;
`;

const UserInfoBox = styled.div`
margin 20px 0`;

const ContentBox = styled.div`
margin: 5px;
font-size: 1em;
font-weigth: bold;
left: 30%,
display: inline-block;
`;

const Parent = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0 0;
`;

export default Detail;
