//커밋
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

//액션
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const SET_PREVIEW = 'SET_PREVIEW';
const SET_VIDEOPREVIEW = 'SET_VIDEOPREVIEW';

//액션 발생
const uploadImage = createAction(UPLOAD_IMAGE, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({
  preview,
}));
const setVideoPreview = createAction(SET_PREVIEW, (video_preview) => ({
  video_preview,
}));

//초기값
const initialState = {
  image: '',
  uploading: false,
  preview: null,
  video: null,
};

//리듀서
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image = action.payload.image;
        draft.uploading = false;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [SET_VIDEOPREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.video_preview = action.payload.video_preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  setPreview,
  setVideoPreview,
};

export { actionCreators };
