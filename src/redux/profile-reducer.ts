import { profileAPI } from "../api/profile-api";
import { FormAction, stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

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

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/profile/ADD-POST':
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

    case 'SN/profile/SET-STATUS':
      return {
        ...state,
        status: action.status
      }

    case 'SN/profile/SET-USER-PROFILE':
      return {
        ...state,
        profile: action.profile
      }

    case 'SN/profile/DELETE-POST':
      return {
        ...state,
        postsData: state.postsData.filter(p => p.id !== action.id)
      }

    case 'SN/profile/SAVE-PHOTO-SUCCESS':
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

export const actions = {
  addPostActionCreator: (newPostText: string) => ({
    type: 'SN/profile/ADD-POST',
    newPostText
  } as const),
  setUsersProfile: (profile: ProfileType) => ({
    type: 'SN/profile/SET-USER-PROFILE',
    profile
  } as const),
  setStatus: (status: string) => ({
    type: 'SN/profile/SET-STATUS',
    status
  } as const),
  deletePost: (id: number) => ({
    type: 'SN/profile/DELETE-POST',
    id
  } as const),
  savePhotoSuccess: (photos: PhotosType) => ({
    type: 'SN/profile/SAVE-PHOTO-SUCCESS',
    photos
  } as const)
}

export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userId);
  dispatch(actions.setUsersProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    };
  } catch (error) {
    alert("Erorrrrrr")
  }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  };
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.id;
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === 0) {
    if (userId != null) {
      dispatch(getUsersProfile(userId));
    } else {
      throw new Error ("userId can't be null")
    }
  } else {
    dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>