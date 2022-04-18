// 작성과 수정 동시에 처리
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Image, Input, Text } from '../elements';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/picture';
import { actionCreators as videoActions } from '../redux/modules/picture';
import styled, { createGlobalStyle } from 'styled-components';
import { FaRegQuestionCircle } from 'react-icons/fa';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const preview = useSelector((state) => state.picture.preview);
  const video_preview = useSelector((state) => state.picture.video_preview);
  const posts = useSelector((state) => state.post.list);

  //수정 조건
  const postNum = props.match.params.num;
  const is_edit = postNum ? true : false;
  let _post = is_edit ? posts.find((p) => p.num === postNum) : null;

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

    reader.onloadend = () => {
      dispatch(videoActions.setVideoPreview(reader.result));
    };
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
  console.log(postTitle, postDesc);
  // 생성 블록
  const addPost = () => {
    if (!imageFileInput.current || imageFileInput.current.files.length === 0) {
      window.alert('게시물을 모두 작성해주세요.');
      return;
    }
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
    <React.Fragment>
      <Grid isFlex margin='20px 100px;' padding=''>
        <Grid>
          <input
            type='file'
            onChange={selectVideo}
            ref={videoFileInput}
            disabled={is_uploading}
          />
          <Text size='23px' weight='700'>
            세부정보
          </Text>

          <TitleBox>
            <Grid isFlex>
              <Grid isFelx_start>
                <Text size='13px' color='#606060' margin='0 11px 0 0'>
                  제목(필수 항목)
                </Text>
              </Grid>
              <FaRegQuestionCircle color='#606060' />
            </Grid>
            <TitleInput
              value={postTitle}
              onChange={changeTitle}
              placeholder='동영상을 설명하는 제목을 추가하세요'
            />
            <Text size='13px' color='#606060'>
              22/200자
            </Text>
          </TitleBox>

          <Input
            value={postDesc}
            _onChange={changeContent}
            multiLine
            placeholder='시청자에게 동영상에 대해 알려주세요'
          />
        </Grid>
        <Grid center>
          <Grid width='20%'>
            미리보기 영상
            <Image shape='rectangle' src_02={'https://ifh.cc/g/g0oyvr.png'} />
          </Grid>
          <Button width='10%'>업로드</Button>
        </Grid>
      </Grid>
      이미지
      <input
        type='file'
        onChange={selectImage}
        ref={imageFileInput}
        disabled={is_uploading}
      />
      <Grid width='30%'>
        미리보기 이미지
        <Image
          shape='rectangle'
          src_02={preview ? preview : 'https://ifh.cc/g/g0oyvr.png'}
        />
      </Grid>
      <Grid margin='100px 0px 0px 0px'>
        {is_edit ? (
          <Button width='50%' _onClick={editPost} text='게시글 수정' />
        ) : (
          <Button width='50%' _onClick={addPost} text='게시글 등록' />
        )}
      </Grid>
      <GlobalStyle />
    </React.Fragment>
  );
};

const GlobalStyle = createGlobalStyle`
body {
  background-color: #282828;
}
`;

const TitleBox = styled.div`
  width: 420px;
  border-radius: 5px;
  border: solid 1px #606060;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  opacity: 1;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 80px;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  margin-left: 10px;
  overflow: auto;
  z-index: -1;
  font-size: 15px;
  &: {
    outline: none;
    text-align: left;
  }
`;
export default PostWrite;
