// 작성과 수정 동시에 처리
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Image, Input } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/picture";
import { actionCreators as videoActions } from "../redux/modules/picture";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const preview = useSelector((state) => state.picture.preview);
  const posts = useSelector((state) => state.post.list);

  //수정 조건
  const postNum = props.match.params.num;
  const is_edit = postNum ? true : false;
  let _post = is_edit ? posts.find((p) => p.num === postNum) : null;

  //게시물 불러오기
  useEffect(() => {
    if (is_edit && !_post) {
      console.log("게시물 정보가 없습니다.");
      history.goBack();
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
  const selectImage = (e) => {
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
  const selectVideo = (e) => {
    const reader = new FileReader();
    const file = videoFileInput.current.files[0];

    reader.readAsArrayBuffer(file);
  };

  //제목과 설명 state
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const changeTitle = (e) => {
    setPostTitle(e.target.value);
  };
  const changeContent = (e) => {
    setPostDesc(e.target.value);
  };

  // 생성 블록
  const addPost = () => {
    const postImage = imageFileInput.current.files[0];
    const postVideo = videoFileInput.current.files[0];

    const formData = new FormData();

    formData.append("postTitle", postTitle);
    formData.append("postDesc", postDesc);
    formData.append("postImage", postImage);
    formData.append("postVideo", postVideo);

    return dispatch(postActions.addPostDB(formData));
  };

  //수정 블록
  const editPost = () => {
    const postImage = imageFileInput.current.files[0];
    const postVideo = videoFileInput.current.files[0];

    const formData = new FormData();

    formData.append("postTitle", postTitle);
    formData.append("postDesc", postDesc);
    formData.append("postImage", postImage);
    formData.append("postVideo", postVideo);

    return dispatch(postActions.editPostDB(postNum, formData));
  }
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Grid>
            <h1>세부정보</h1>
            {/* 제목 */}
            <Input
              value={postTitle}
              _onChange={changeTitle}
              multiLine
              placeholder="제목"
            />
            {/* 설명 */}
            <Input
              value={postDesc}
              _onChange={changeContent}
              multiLine
              placeholder="설명"
            />
          </Grid>
          {/* 동영상 */}
          <input
            onChange={selectVideo}
            ref={videoFileInput}
            disabled={is_uploading}
            id="video"
            type="file"
          />
          <Grid center>
            <Grid width="20%">
              미리보기 영상
              <Image shape="rectangle" src_02={"https://ifh.cc/g/g0oyvr.png"} />
            </Grid>
            <Button width="10%">업로드</Button>
          </Grid>
        </Grid>
        {/* 이미지 */}
        <input
          type="file"
          onChange={selectImage}
          ref={imageFileInput}
          disabled={is_uploading}
        />
        <Grid width="30%">
          미리보기 이미지
          <Image
            shape="rectangle"
            src_02={preview ? preview : "https://ifh.cc/g/g0oyvr.png"}
          />
        </Grid>
        <Grid margin="100px 0px 0px 0px">
          {is_edit ? (
            <Button width="50%" _onClick={editPost} text="게시글 수정" />
          ):(
            <Button width="50%" _onClick={addPost} text="게시글 등록" />
          )}
          
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
