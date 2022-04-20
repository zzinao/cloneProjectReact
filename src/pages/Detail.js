import React from 'react';
import Header from '../shared/Header';
import { useParams } from 'react-router-dom';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

import { Grid, Text, Image, LikeIcons, Button } from '../elements/index';

import LikeIcon from '../components/LikeIcon';
import DisLikeIcon from '../components/DisLikeIcon';
import CommentWrite from '../components/CommentWrite';
// import CommentList from '../components/CommentList';

import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';

const Detail = (props) => {
  const dispatch = useDispatch();

  const { postNum } = useParams();

  const detail = useSelector((state) => state?.post?.detail?.post);
  const user_info = useSelector((state) => state?.user);
  const is_login = useSelector((state) => state?.user?.is_login);

  //게시물 불러오기
  React.useEffect(() => {
    dispatch(postActions.getOnePostDB(postNum));
  }, []);

  if (detail) {
    return (
      <>
        <Header />
        <ReactPlayer
          url={detail?.postVideo}
          playing={true}
          muted={false}
          light={true}
          controls
          width={'100%'}
          className='detail_video'
        />
        {/* <Preview /> */}
        <Container>
          <TitleBox>
            <Text weight='700' size='22px' color='#fff' margin='20px 0 0'>
              {detail?.postTitle}
            </Text>
            <Grid isFlex>
              <Text color='#aaa' size='14px' margin='10px 0 20px'>
                조회수 {detail?.postCnt}회 &nbsp; 공개 {detail?.postDate}
              </Text>
              <Grid isFlex>
                <LikeIcon />
                <DisLikeIcon />
                <Text color='#fff' weight='700' margin=' 0 8px'>
                  공유
                </Text>
                {/* 게시물 삭제 */}
                {is_login ? (
                  detail?.userId === user_info?.user?.userId ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm('게시물을 삭제하시겠어요?') === true
                        ) {
                          dispatch(postActions.deletePostDB());
                          history.replace('/');
                        }
                      }}
                    >
                      삭제
                    </button>
                  ) : null
                ) : null}
                {/* 게시물 수정 */}
                {is_login ? (
                  detail?.userId === user_info?.user?.userId ? (
                    <button
                      onClick={() => {
                        history.push(`/postWrite/${postNum}`);
                        window.location.reload();
                      }}
                    >
                      수정
                    </button>
                  ) : null
                ) : null}
              </Grid>
            </Grid>
          </TitleBox>

          <Hr />

          <UserInfoBox>
            <Parent>
              <Image
                shape='profile'
                src={detail?.userInfo.userProfile}
                margin='5px 20px 0 0'
                size='50'
              />
              <ContentBox>
                <Grid isFlex_start>
                  <Text
                    margin='0 30px 0 0'
                    size='16px'
                    weight='700'
                    color='#fff'
                  >
                    {detail?.userInfo.userNick}
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
                  구독자수 {detail?.userInfo.userSubscribe}
                </Text>
                <Text margin='25px 0' color='#fff' size='15px'>
                  {detail?.postDesc}
                </Text>
              </ContentBox>
            </Parent>
          </UserInfoBox>
          <Hr />
          <CommentBox>
            <Text color='#fff' weight='700'>
              댓글 3432개
            </Text>
            <CommentWrite {...postNum} />
            {/* <CommentList /> */}
          </CommentBox>
        </Container>
      </>
    );
  }
  {
    return (
      <div>
        <Text>......</Text>;
      </div>
    );
  }
};
const Container = styled.div`
  padding: 10px 40px;
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
  margin: 20px 0;
`;

const ContentBox = styled.div`
  margin: 5px;
  font-size: 1em;
  font-weight: bold;
  left: 30%;
  display: inline-block;
`;

const Parent = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0 0;
`;

export default Detail;
