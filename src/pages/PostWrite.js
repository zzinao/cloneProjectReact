import React, { useRef, useState, useEffect } from 'react';
import { Grid, Text, Image, Input, Button } from '../elements';
import styled, { createGlobalStyle } from 'styled-components';

import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/picture';
import Header from '../shared/Header';

//icons
import { RiImageAddFill } from 'react-icons/ri';
import { FaRegQuestionCircle } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
//코드가 너무 길어져서 나중에 기능들 컴포넌트화 해서 빼면 좋을 것 같습니다.
const PostWrite = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getMainDB(postNum));

    console.log('getpost 가져오기');
  }, []);

  // const { history } = props;

  const posts = useSelector((state) => state.post.list);
  if (posts) {
    console.log(posts);
  }
  //수정 조건
  const postNum = props.match.params.postNum;
  console.log(Number(postNum));

  const is_edit = postNum ? true : false;
  console.log(is_edit);

  console.log(posts.posts);
  let _post = is_edit
    ? posts.posts.find((p) => p.postNum === Number(postNum)).postTitle
    : null;
  console.log(_post);

  console.log(posts.posts);
  let title = is_edit
    ? posts.posts.find((p) => p.postNum === Number(postNum)).postTitle
    : null;
  console.log(title);

  console.log(posts.posts);
  let desc = is_edit
    ? posts.posts.find((p) => p.postNum === Number(postNum)).postDesc
    : null;
  console.log(desc);

  console.log(posts.posts);
  let thumb = is_edit
    ? posts.posts.find((p) => p.postNum === Number(postNum)).postThumb
    : null;
  console.log(thumb);

  //게시물 불러오기
  useEffect(() => {
    if (is_edit && !_post) {
      console.log('게시물 정보가 없습니다.');
      // history.goBack();
      return;
    }
    if (is_edit) {
      dispatch(imageActions.setPreview(thumb));
    } else {
      dispatch(imageActions.setPreview(null));
    }
  }, []);

  //썸네일 업로드
  const [postThumb, setPostThumb] = useState(
    'https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137'
  );
  const [preview, setPreview] = useState(
    _post
      ? thumb
      : 'https://pbs.twimg.com/profile_images/1226774390387294210/OeCeNAcZ_400x400.jpg'
  );

  const selectImage = (e) => {
    const img = e.target.files[0];
    setPostThumb(img);
    setPreview(window.webkitURL.createObjectURL(e.target.files[0]));
  };

  //동영상 업로드
  const [previewVideo, setPreviewVideo] = useState('');
  const [postVideo, setPostVideo] = useState('');
  const selectVideo = (e) => {
    const vid = e.target.files[0];
    setPostVideo(vid);
    setPreviewVideo(window.webkitURL.createObjectURL(e.target.files[0]));
  };

  //제목과 설명 state
  const [postTitle, setPostTitle] = useState(_post ? title : '');
  const [postDesc, setPostDesc] = useState(_post ? desc : '');
  const changeTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const changeContent = (e) => {
    setPostDesc(e.target.value);
  };

  // 생성 블록
  const addPost = () => {
    const formData = new FormData();

    formData.append('postTitle', postTitle);
    formData.append('postDesc', postDesc);
    formData.append('postThumb', postThumb);
    formData.append('postVideo', postVideo);

    return dispatch(postActions.addPostDB(formData));
  };

  //수정 블록
  const editPost = () => {
    // const postThumb = imageFileInput.current.files[0];

    const formData = new FormData();

    formData.append('postTitle', postTitle);
    formData.append('postDesc', postDesc);
    formData.append('postThumb', postThumb);

    return dispatch(postActions.editPostDB(postNum, formData));
  };
  return (
    <>
      <Header />
      <Container>
        <LeftBox>
          <Text color='#fff' size='25px' weight='600'>
            세부정보
          </Text>

          <Title>
            <Grid isFlex_start>
              <Text size='13px' color='#aaa' margin='10px'>
                제목
              </Text>

              <FaRegQuestionCircle color='#aaa' />
            </Grid>
            <TitleInput
              type='textarea'
              value={postTitle}
              maxLength='200'
              onChange={changeTitle}
              placeholder='동영상을 설명하는 제목을 추가하세요'
            />
            <Grid isFlex_end>
              <Text margin='10px' size='13px' color='#606060'>
                {postTitle.length}/100자
              </Text>
            </Grid>
          </Title>

          <Content>
            <Grid isFlex_start>
              <Text size='13px' color='#aaa' margin='10px'>
                설명
              </Text>
              <FaRegQuestionCircle color='#aaa' />
            </Grid>
            <ContentInput
              type='textarea'
              value={postDesc}
              maxLength='1000'
              onChange={changeContent}
              placeholder='시청자에게 동영상에 대해 알려주세요'
            />
            <Grid isFlex_end>
              <Text margin='10px' size='13px' color='#606060'>
                {postDesc.length}/500자
              </Text>
            </Grid>
          </Content>

          {/* 썸네일 */}
          <Text color='#fff' size='18px' weight='600' margin='20px 0 0'>
            미리보기 이미지
          </Text>
          <Text color='#aaa' size='14px'>
            동영상의 내용을 알려주는 사진을 선택하거나 업로드하세요. 시청자의
            시선을 사로잡을만한 이미지를 사용해 보세요.
          </Text>
          <Text
            margin='0 0 30px'
            color='#3FA5FE'
            size='14px'
            onClick={() =>
              window.open(
                'https://support.google.com/youtube/answer/72431?hl=ko',
                '_blank'
              )
            }
          >
            자세히 알아보기
          </Text>
          <Cont>
            <Cont
              width='10rem'
              height='6rem'
              flexDirection='column'
              alignItems='center'
              border='1px solid #a0a0a0'
              padding='.7rem 0'
            >
              <label
                htmlFor='input_img'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '6rem',
                  fontSize: '.4rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: '2px',
                }}
              >
                <RiImageAddFill size='25' color='#aaa' />
                <Text margin='5px;' color='#aaa'>
                  미리보기 이미지 업로드
                </Text>
              </label>
              <FileInput
                id='input_img'
                type='file'
                accept='.png , .jpg , .png, .jpeg'
                onChange={selectImage}
              ></FileInput>
            </Cont>
            <Cont
              width='10rem'
              height='6rem'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              border='1px solid #a0a0a0'
              padding='.7rem 0'
              margin='0 0 0 5px'
            >
              <img width='100%' height='100%' src={preview} alt='' />
            </Cont>
          </Cont>
        </LeftBox>

        <RightBox>
          <Grid>
            {/* 동영상 */}
            <Text color='#fff' size='25px' weight='600'>
              동영상 업로드
            </Text>

            <Cont>
              <Video src={previewVideo}></Video>
            </Cont>
            <Cont flexDirection='column'>
              <Text size='.7rem'>파일 이름</Text>
            </Cont>
            <Cont>
              <label
                htmlFor='input_file'
                style={{
                  display: 'flex',
                  width: '100px',
                  height: '30px',
                  borderRadius: '20px',
                  border: '1px solid white',
                  fontSize: '1rem',
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: '2px',
                  marginBottom: '35px',
                }}
              >
                업로드
              </label>
              <FileInput
                id='input_file'
                type='file'
                accept='.mp4'
                onChange={selectVideo}
              ></FileInput>
            </Cont>
            {is_edit ? (
              <Button
                bg='#0583F2'
                width='50%'
                disabled={
                  (postTitle.length ||
                    postDesc.length ||
                    postThumb.length ||
                    postVideo.length) > 0
                    ? false
                    : true
                }
                _onClick={editPost}
                text='게시글 수정'
              />
            ) : (
              <Button
                bg='#0583F2'
                width='50%'
                disabled={postTitle.length > 0 ? false : true}
                _onClick={addPost}
                text='게시글 등록'
              />
            )}
          </Grid>
        </RightBox>
      </Container>
      <GlobalStyle />
    </>
  );
};
const GlobalStyle = createGlobalStyle`
body { margin: 0 auto;
}
`;
const Container = styled.div`
  margin: 50px auto;
  max-width: 1300px;
  display: flex;
  border-radius: 30px;
  padding: 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;

const LeftBox = styled.div``;
const RightBox = styled.div`
  margin: 0 100px;
  height: 200px;
`;

const Title = styled.div`
  width: 720px;
  border-radius: 5px;
  border: solid 1px #606060;
  align-items: center;
  opacity: 1;
  &:focused {
    border: solid 1px #fff;
  }
  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;
const TitleInput = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  margin-left: 10px;
  overflow: auto;
  z-index: -1;
  font-size: 15px;
  color: #fff;

  &:focus {
    outline: none;
    text-align: left;
  }
  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;
const Content = styled.div`
  width: 720px;
  margin: 20px 0;
  border-radius: 5px;
  border: solid 1px #606060;
  align-items: center;
  opacity: 1;
  &:focused {
    border: solid 1px #fff;
  }
  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;
const ContentInput = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  margin-left: 10px;
  overflow: auto;
  z-index: -1;
  font-size: 15px;
  color: #fff;

  &:focus {
    outline: none;
    text-align: left;
  }
  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;

const Cont = styled.div`
  display: flex;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;

const FileInput = styled.input`
  display: none;
`;

const Video = styled.video`
  width: 100%;
  height: 200px;
  border: 1 solid black;
  background-color: black;
`;
export default PostWrite;
