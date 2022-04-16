import produce from "immer";
import { createAction, handleActions } from "redux-actions";

//액션
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

//액션 발생
const uploadImage = createAction(UPLOAD_IMAGE, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({
  preview,
}));

//초기값
const initialState = {
  image: "",
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
  },
  initialState
);

const actionCreators = {
  uploadImage,
  setPreview,
};

export { actionCreators };
