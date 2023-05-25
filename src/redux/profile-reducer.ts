import { profileAPI } from "../api/profile-api";
import { userAPI } from "../api/users-api";
import { stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

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

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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

type ActionTypes = AddPostActionCreatorType | SetUsersProfileType | SetStatusType | DeletePostType | SavePhotoSuccessType

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

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userId);
  dispatch(setUsersProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(setStatus(status));
    };
  } catch (error) {
    alert("Erorrrrrr")
  }
};

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  };
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.id;
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === 0) {
    dispatch(getUsersProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;