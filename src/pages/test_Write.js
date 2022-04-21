import React from 'react';

import styled from 'styled-components';

import { BiImageAdd } from 'react-icons/bi';

import DropDown from '../components/DropDown';
import post, { actionCreators as postActions } from '../redux/modules/post';
import { current } from 'immer';
import { useDispatch } from 'react-redux';

const Write = (props) => {
  const dispatch = useDispatch();
  //입력값 받아내기
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState();
  const [category, setCategory] = React.useState();
  const [fileImage, setFileImage] = React.useState(
    'https://user-images.githubusercontent.com/82128525/154899930-6333a730-9e2c-4123-a3b7-760d9e61b43f.png'
  );
  const [fileVideo, setFileVideo] = React.useState(
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlOeQ2%2Fbtrtys8M1UX%2FEXvjbkD77erg12mnimKaK0%2Fimg.png'
  );
  const [previewImg, setPreviewImg] = React.useState(
    'https://user-images.githubusercontent.com/82128525/154899930-6333a730-9e2c-4123-a3b7-760d9e61b43f.png'
  );
  const [previewVideo, setPreviewVideo] = React.useState(
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlOeQ2%2Fbtrtys8M1UX%2FEXvjbkD77erg12mnimKaK0%2Fimg.png'
  );

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const saveFileImage = (e) => {
    const img = e.target.files[0];
    setFileImage(img);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  const saveFileVideo = (e) => {
    const video = e.target.files[0];
    setFileVideo(video);
    setPreviewVideo(URL.createObjectURL(e.target.files[0]));
  };

  const addPost = () => {
    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('videoFile', fileVideo);
    data.append('imageFile', fileImage);
    data.append('category', category);

    dispatch(postActions.addPostAPI(data));
  };
  return (
    <>
      <Wrap>
        {/* 왼쪽 */}
        <Container flexDirection='column' width='90%'>
          {/* 세부정보 텍스트 */}
          <Container
            justifyContent='space-between'
            width='103%'
            alignItems='center'
          >
            <Text>세부정보</Text>
            <Text size='.7rem'>세부정보 재사용</Text>
          </Container>
          {/* 인풋 */}
          <Container flexDirection='column'>
            <Container
              flexDirection='column'
              border='1px solid #a0a0a0'
              width='100%'
              margin='.5rem 0'
              padding='.3rem'
            >
              <Text size='.5rem'>제목(필수 항목)</Text>
              <Input
                type='text'
                maxLength='40'
                placeholder='동영상을 설명하는 제목을 추가하세요'
                onChange={changeTitle}
              ></Input>
            </Container>
            <Container
              flexDirection='column'
              border='1px solid #a0a0a0'
              width='100%'
              margin='.5rem 0'
              padding='.3rem'
            >
              <Text size='.5rem'>설명</Text>
              <Textarea
                rows='5'
                placeholder='시청자에게 동영상에 대해 알려주세요'
                onChange={changeContent}
              ></Textarea>
            </Container>
          </Container>
          {/* 미리보기 이미지 */}
          <Container flexDirection='column'>
            <Text mBottom='5px' size='.7rem'>
              미리보기 이미지
            </Text>
            <Text size='.5rem' mBottom='5px'>
              동영상의 내용을 알려주는 사진을 선택하거나 업로드하세요. 시청자의
              시선을 사로잡을만한 이미지를 사용해 보세요.
              <span>자세히 알아보기</span>
            </Text>
            <Container>
              <Container
                width='6rem'
                height='2rem'
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
                  <BiImageAdd size='1rem' />
                  미리보기 이미지 업로드
                </label>
                <FileInput
                  id='input_img'
                  type='file'
                  accept='.png , .jpg , .png, .jpeg'
                  onChange={saveFileImage}
                ></FileInput>
              </Container>
              <Container
                width='6rem'
                height='2rem'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                border='1px solid #a0a0a0'
                padding='.7rem 0'
                margin='0 0 0 5px'
              >
                <img width='100%' height='100%' src={previewImg} alt='' />
              </Container>
            </Container>
          </Container>

          {/* 카테고리 */}
          <Container flexDirection='column' margin='5px 0 0 0'>
            <Text mBottom='5px' size='.7rem'>
              카테고리
            </Text>
            <Text size='.5rem' mBottom='5px'>
              카테고리를 선택해 추가하세요. 카테고리 별로 동영상을 찾기
              쉬워집니다.
              <span>자세히 알아보기</span>
            </Text>
            <DropDown setCategory={setCategory}></DropDown>
          </Container>

          {/* 시청자층 기능 없음 */}
          <Container flexDirection='column' margin='5px 0 0 0'>
            <Text mBottom='5px' size='.7rem'>
              시청자층
            </Text>
            <Text size='.5rem' mBottom='5px'>
              아동용 동영상인가요?(필수사항)
              <span>자세히 알아보기</span>
            </Text>
            <Text size='.3rem' mBottom='5px'>
              모든 크리에이터는 위치에 상관없이 아동 온라인 개인정보
              보호법(COPPA) 및 기타 법률을 준수해야 할 법적인 의무가 있습니다.
              아동용 동영상인지 여부는 크리에이터가 지정해야 합니다.
              <span>아동용 콘텐츠란 무엇인가요?</span>
            </Text>
          </Container>
        </Container>
        {/* 오른쪽 */}
        <Container className='right' width='100%'>
          <Container flexDirection='column'>
            <Container>
              <Video src={previewVideo}></Video>
            </Container>
            <Container flexDirection='column'>
              <Text size='.7rem'>파일 이름</Text>
            </Container>
            <Container>
              <label
                htmlFor='input_file'
                style={{
                  display: 'flex',
                  width: '50px',
                  height: '20px',
                  borderRadius: '20px',
                  border: '1px solid black',
                  fontSize: '.4rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: '2px',
                }}
              >
                업로드
              </label>
              <FileInput
                id='input_file'
                type='file'
                accept='.mp4'
                onChange={saveFileVideo}
              ></FileInput>
            </Container>
            {/* 업로드 버튼 */}
            <Container width='100%'>
              <button
                style={{
                  width: '100%',
                  height: '2rem',
                  marginTop: '5px',
                  backgroundColor: 'white',
                  borderRadius: '2rem',
                }}
                disabled={
                  title === '' ||
                  content === '' ||
                  category === '선택' ||
                  fileImage ===
                    'https://user-images.githubusercontent.com/82128525/154899930-6333a730-9e2c-4123-a3b7-760d9e61b43f.png' ||
                  fileVideo ===
                    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlOeQ2%2Fbtrtys8M1UX%2FEXvjbkD77erg12mnimKaK0%2Fimg.png'
                    ? true
                    : false
                }
                onClick={() => addPost()}
              >
                게시글 등록
              </button>
            </Container>
          </Container>
        </Container>
      </Wrap>
    </>
  );
};
const Wrap = styled.div`
  /* background-color: aliceblue; */
  display: grid;
  grid-template-columns: repeat(1, 7fr 3fr);
  grid-template-rows: auto;
  justify-content: space-between;
  width: 80%;
  /* height: 100vh; */
  margin: auto;
  @media screen and (min-width: 1607px) {
  }
  @media screen and (min-width: 960px) and (max-width: 1607px) {
  }
  @media screen and (min-width: 551px) and (max-width: 960px) {
  }
  @media screen and (min-width: 0px) and (max-width: 551px) {
    /* .right {
      display: none;
    } */
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Container = styled.div`
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

const Text = styled.p`
  font-size: ${(props) => props.size};
  padding: 0;
  margin: 0;
  margin-bottom: ${(props) => props.mBottom};
`;

const Input = styled.input`
  &:focus {
    outline: none;
  }
  border: none;
  margin-top: 2px;
  font-size: 0.5rem;
  padding: 0.5rem;
  width: 90%;
`;

const Textarea = styled.textarea`
  font-size: 0.5rem;
  padding: 0.5rem;
  width: 90%;
  border: none;
  margin-top: 2px;
  &:focus {
    outline: none;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 200px;
  border: 1 solid black;
  background-color: black;
`;

const FileInput = styled.input`
  display: none;
`;

export default Write;
