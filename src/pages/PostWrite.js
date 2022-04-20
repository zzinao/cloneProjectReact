import React, { useRef, useState, useEffect } from 'react';
import { Grid, Text, Image, Input, Button } from '../elements';
import styled, { createGlobalStyle } from 'styled-components';

import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/picture';
import { actionCreators as videoActions } from '../redux/modules/picture';
import Header from '../shared/Header';

//icons
import { RiImageAddFill } from 'react-icons/ri';
import { FaRegQuestionCircle } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
//코드가 너무 길어져서 나중에 기능들 컴포넌트화 해서 빼면 좋을 것 같습니다.
// 뷰 수정사항: 프리뷰 이미지 사이즈
const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const preview = useSelector((state) => state.picture.preview);
  const post = useSelector((state) => state?.post?.list);
  console.log(post?.posts);

  //수정 조건
  const postNum = props.match.params.postNum;
  const is_edit = postNum ? true : false;
  let _post = is_edit ? post.find((p) => p.postNum === postNum) : null;
  console.log(postNum);

  //게시물 불러오기
  useEffect(() => {
    if (is_edit && !_post) {
      console.log('게시물 정보가 없습니다.');
      // history.goBack();
      return;
    }
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image));
    } else {
      dispatch(imageActions.setPreview(null));
    }
  }, []);

  //썸네일 이미지 업로드
  const imageFileInput = useRef(null);
  const selectImage = () => {
    const reader = new FileReader();
    const file = imageFileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };
  const is_uploading = useSelector((state) => state.picture.uploading);

  //동영상 업로드
  const videoFileInput = useRef(null);
  const selectVideo = () => {
    const reader = new FileReader();
    const file = videoFileInput.current.files[0];

    reader.readAsArrayBuffer(file);
  };

  //제목과 설명 state
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const changeTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const changeContent = (e) => {
    setPostDesc(e.target.value);
  };

  // 생성 블록
  const addPost = () => {
    const postThumb = imageFileInput.current.files[0];
    const postVideo = videoFileInput.current.files[0];

    const formData = new FormData();

    formData.append('postTitle', postTitle);
    formData.append('postDesc', postDesc);
    formData.append('postThumb', postThumb);
    formData.append('postVideo', postVideo);

    return dispatch(postActions.addPostDB(formData));
  };

  //수정 블록
  const editPost = () => {
    const postThumb = imageFileInput.current.files[0];
    const postVideo = videoFileInput.current.files[0];

    const formData = new FormData();

    formData.append('postTitle', postTitle);
    formData.append('postDesc', postDesc);
    formData.append('postThumb', postThumb);
    formData.append('postVideo', postVideo);

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
              onChange={changeTitle}
              placeholder='동영상을 설명하는 제목을 추가하세요'
            />
            <Grid isFlex_end>
              <Text margin='10px' size='13px' color='#606060'>
                22/100자
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
              onChange={changeContent}
              placeholder='시청자에게 동영상에 대해 알려주세요'
            />
            <Grid isFlex_end>
              <Text margin='10px' size='13px' color='#606060'>
                22/500자
              </Text>
            </Grid>
          </Content>

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
          <PreviewBox>
            <PreviewBtn
              onClick={() => {
                imageFileInput.current.click();
              }}
            >
              <RiImageAddFill size='25' color='#aaa' />
              <Text margin='5px;' color='#aaa'>
                미리보기 이미지 업로드
              </Text>
              <input
                type='file'
                style={{ display: 'none' }}
                ref={imageFileInput}
                onChange={selectImage}
                disabled={is_uploading}
              />
            </PreviewBtn>
            <Image
              shape='rectangle'
              margin='30px 0 0'
              src_02={
                preview
                  ? preview
                  : 'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png'
              }
            />
          </PreviewBox>
        </LeftBox>

        <RightBox>
          {/* 동영상 */}
          <Text color='#fff' size='25px' weight='600'>
            동영상 업로드
          </Text>
          <input
            type='file'
            onChange={selectVideo}
            ref={videoFileInput}
            disabled={is_uploading}
          />
          <Grid>
            <Grid>
              {/* 미리보기 영상 */}
              <Image shape='rectangle' src_02={'https://ifh.cc/g/g0oyvr.png'} />
            </Grid>

            {is_edit ? (
              <Button
                bg='#0583F2'
                width='50%'
                _onClick={editPost}
                text='게시글 수정'
              />
            ) : (
              <Button
                bg='#0583F2'
                width='50%'
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
  background-color: #282828;
  border-radius: 30px;
  padding: 50px;
`;

const LeftBox = styled.div``;
const RightBox = styled.div`
  margin: 0 100px;
  height: 200px;
`;

const Title = styled.div`
  width: 420px;
  border-radius: 5px;
  border: solid 1px #606060;
  align-items: center;
  opacity: 1;
  &:focused {
    border: solid 1px #fff;
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
`;
const Content = styled.div`
  width: 420px;
  margin: 20px 0;
  border-radius: 5px;
  border: solid 1px #606060;
  align-items: center;
  opacity: 1;
  &:focused {
    border: solid 1px #fff;
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
`;

const PreviewBox = styled.div`
  display: flex;
`;

const PreviewBtn = styled.div`
  text-align: center;
  margin: 0 20px 0 0;
  padding: 20px;
  width: 140px;
  height: 60px;
  background-color: transparent;
  border: 1px solid #aaa;
  border-style: dashed;
  border-radius: 3px;
`;

export default PostWrite;
