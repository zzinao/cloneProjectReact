import React from 'react';
import { Button, Grid, Input, Text, Image } from '../elements';

import { useDispatch, useSelector } from 'react-redux';

import { AiFillLike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { RiShareForwardLine } from 'react-icons/ri';
import { GiSaveArrow } from 'react-icons/gi';
import { MdOutlinePlaylistAdd, MdOutlineMoreHoriz } from 'react-icons/md';
import { AiOutlineBell } from 'react-icons/ai';

import { actionCreators as commentsActions } from '../redux/modules/comments';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as userActions } from '../redux/modules/user';

import { history } from '../redux/configureStore';

const Video = (props) => {
  const dispatch = useDispatch();
  const postId = props.postId;
  const check = props.check.user.check;
  const checkOne = props.one_list.channelName;
  const post_list = useSelector((state) => state.post.list);
  const post = post_list.find((p) => p.postId === postId);

  const postOne = useSelector((state) => state.post.post);
  const likeChange = postOne.likes;
  const [isLogin, setIsLogin] = React.useState(false);
  const loginUser = localStorage.getItem('channelName');
  //좋아요 버튼 on/off

  let [isLike, setIsLike] = React.useState(false);
  let [isSubscribe, setIsSubscribe] = React.useState(false);
  //좋아요 버튼 토글 여부
  const clickLike = () => {
    // 로그인 유저가 아닌 경우 참여하기 불가
    if (loginUser === null) {
      window.alert(
        '회원이 아닌 경우, 참여하기가 불가능합니다. 로그인 해주세요~!'
      );
      history.replace('/login');
      return;
    }

    // 클릭시 isLike여부 토글 트루일때 좋아요취소_삭제
    setIsLike(!isLike);
    if (isLike) {
      dispatch(postActions.deleteLikeDB(postId));
    } else {
      dispatch(postActions.addLikeDB(postId));
    }
  };

  const clickSubscribe = () => {
    // 로그인 유저가 아닌 경우 참여하기 불가
    if (loginUser === null) {
      window.alert(
        '회원이 아닌 경우, 참여하기가 불가능합니다. 로그인 해주세요~!'
      );
      history.replace('/login');
      return;
    }
    // 클릭시 isLike여부 토글 트루일때 좋아요취소_삭제
    setIsSubscribe(!isSubscribe);
    if (isSubscribe) {
      dispatch(postActions.deleteSubscribeDB(post.channelName, postId));
    } else {
      dispatch(postActions.addSubscribeDB(post.channelName, postId));
    }
  };

  React.useEffect(() => {
    dispatch(userActions.loginCheckAPI());
  }, []);

  const likeCheck = () => {
    if (postOne.views) {
      for (let i = 0; i < postOne.likes.length; i++) {
        if (Object.values(postOne.likes)[i].channelName.includes(loginUser)) {
          setIsLike(true);
          return;
        } else {
          setIsLike(false);
        }
      }
      for (let i = 0; i < postOne.subscribes.length; i++) {
        if (Object.values(postOne.subscribes)[i].channelName === loginUser) {
          setIsSubscribe(true);
          return;
        } else {
          setIsSubscribe(false);
        }
      }
    }
  };
  React.useEffect(() => {
    if (!postOne.videoUrl) {
      dispatch(postActions.getOnePostDB(postId));
    }
    likeCheck();
  }, [postOne]);
  return (
    <section>
      {postOne.videoUrl === post.videoUrl && (
        <>
          <video
            width='100%'
            height='600px'
            frameBorder='0'
            // allowFullScreen
            controls
            autoPlay='autoplay'
            muted='muted'
          >
            <source src={`${postOne && postOne.videoUrl}`} type='video/mp4' />
          </video>
          <Grid>
            <Text color='#000' size='20px' bold>
              {postOne && postOne.title}
            </Text>
          </Grid>

          <Grid is_flex>
            <Text width='200px' color='#606060' margin='1px'>
              조회수 {postOne && postOne.views}회
            </Text>
            <Grid is_flex justifyContent='right'>
              {/* 좋아요 */}

              <Button
                bg='#fff'
                width='80px'
                fontSize='15px'
                alignItems='center'
                display='flex'
                padding='0'
                _onClick={() => {
                  clickLike();
                }}
              >
                {isLike ? (
                  <AiFillLike color='#000' size='25' />
                ) : (
                  <AiOutlineLike color='#000' size='25' />
                )}

                <Text color='#000'>
                  {' '}
                  &nbsp;&nbsp;{postOne && postOne.likes.length}
                </Text>
              </Button>

              {/* 싫어요 */}
              <Button
                bg='#fff'
                width='80px'
                alignItems='center'
                display='flex'
                padding='0'
              >
                <AiOutlineDislike color='#000' size='25' />{' '}
                <Text color='#000'> &nbsp;&nbsp;싫어요</Text>
              </Button>
              {/* 공유 */}
              <Button
                bg='#fff'
                width='70px'
                alignItems='center'
                display='flex'
                padding='0'
              >
                <RiShareForwardLine color='#000' size='25' />{' '}
                <Text color='#000'> &nbsp;&nbsp;공유</Text>
              </Button>
              {/* 오프라인 저장 */}
              <Button
                bg='#fff'
                width='120px'
                alignItems='center'
                display='flex'
                padding='0'
              >
                <GiSaveArrow color='#000' size='25' />{' '}
                <Text color='#000'> &nbsp;&nbsp;오프라인 저장</Text>
              </Button>
              {/* 저장 */}
              <Button
                bg='#fff'
                width='70px'
                alignItems='center'
                display='flex'
                padding='0'
              >
                <MdOutlinePlaylistAdd color='#000' size='25' />{' '}
                <Text color='#000'> &nbsp;&nbsp;저장</Text>
              </Button>
              {/* 메뉴 */}
              <Button
                bg='#fff'
                width='25px'
                alignItems='center'
                padding='0'
                _onClick={() => {
                  dispatch(postActions.clappingDeleteAPI(postId));
                }}
                display={checkOne === check.channelName ? '' : 'none'}
              >
                {/* <MdOutlineMoreHoriz color="#000" size="25" /> */}
                <Text color='#000'> 삭제</Text>
              </Button>
            </Grid>
          </Grid>
          <Grid borderBottom='1px solid #e0e0e0' borderTop='1px solid #e0e0e0'>
            <Grid is_flex>
              <Image
                shape='circle'
                src={postOne && postOne.profile}
                width='80px'
                margin='0 10px 0 0'
              />
              <Grid>
                <Text color='#000'>{post && post.channelName}</Text>
                <Text color='#000'>
                  구독자 {postOne && postOne.subscribes.length}명
                </Text>
              </Grid>
              {isSubscribe ? (
                <Grid is_flex justifyContent='right' width='100px'>
                  <Button
                    width='100px'
                    bg='#ececec'
                    color='red'
                    _onClick={() => {
                      clickSubscribe();
                    }}
                  >
                    구독중
                  </Button>
                  <AiOutlineBell size='1rem' />
                </Grid>
              ) : (
                <Grid width='100px'>
                  <Button
                    width='100px'
                    bg='#cc0a00'
                    color='#ffffff'
                    _onClick={() => {
                      clickSubscribe();
                    }}
                  >
                    구독
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid>
              <pre style={{ color: 'gray', margin: '10px 0 10px 80px' }}>
                더보기
              </pre>
            </Grid>
          </Grid>
        </>
      )}
    </section>
  );
};

export default Video;
