import { profileAPI, userAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

let initialState = {
  postsData: [
    { id: 1, message: "It's my first post", likeCount: 521 },
    { id: 2, message: "Ba-da-boom!", likeCount: 5 },
    { id: 3, message: "Hi, how are you?", likeCount: 55 },
  ],
  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 4,
        message: action.newPostText,
        likeCount: 0,
      };
      return {
        ...state,
        newPostText: '',
        postsData: [...state.postsData, newPost]
      }

    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }

    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter(p => p.id !== action.id)
      }

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos
        }
      }

    default:
      return state;
  };
};

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText
});

export const setUsersProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  id
});

export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});

export const getUsersProfile = (userId) => async (dispatch) => {
  let response = await userAPI.getProfile(userId);
  dispatch(setUsersProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    };
  } catch (error) {
    alert("Erorrrrrr")
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  };
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.id;
  const response = await profileAPI.saveProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch(getUsersProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;