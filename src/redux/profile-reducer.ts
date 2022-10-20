import { profileAPI, userAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../types/types";

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
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: ""
};
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        } as ProfileType
      }

    default:
      return state;
  };
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST
  newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({
  type: ADD_POST,
  newPostText
});

type SetUsersProfileType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}

export const setUsersProfile = (profile: ProfileType): SetUsersProfileType => ({
  type: SET_USER_PROFILE,
  profile
});

type SetStatusType = {
  type: typeof SET_STATUS
  status: string
}

export const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status
});

type DeletePostType = {
  type: typeof DELETE_POST
  id: number
}

export const deletePost = (id: number): DeletePostType => ({
  type: DELETE_POST,
  id
});

type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});

export const getUsersProfile = (userId: number) => async (dispatch: any) => {
  let response = await userAPI.getProfile(userId);
  dispatch(setUsersProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    };
  } catch (error) {
    alert("Erorrrrrr")
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  };
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
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