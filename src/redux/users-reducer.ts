import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { userAPI } from '../api/api';
import { UserType } from '../types/types';
import { updataObjectInArray } from '../utils/object-helpers';
import { AppStateType, InferActionsTypes } from './redux-store';

// const PHOTO_URL = 'https://i.guim.co.uk/img/media/3cd8327353fe290e2bbfe195c1006b6e3f2f4be6/0_297_3415_2049/master/3415.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=34157ed80928d3d8722f5c9e69c52482';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 20, // as number | null или as number
  totalUsersCount: 0, // as number | null,
  currentPage: 1, // as number | null,
  isFetching: true, // as boolean | null,
  followingInProgress: [] as Array<number>
};
export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {

  switch (action.type) {

    case 'FOLLOW':
      return {
        ...state,
        users: updataObjectInArray(state.users, action.userID, "id", { followed: true })
      }

    case 'UNFOLLOW':
      return {
        ...state,
        users: updataObjectInArray(state.users, action.userID, "id", { followed: false })
      }

    case 'SET_USERS':
      return { ...state, users: action.users }

    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage }

    case 'SET_TOTAL_COUNT':
      return { ...state, totalUsersCount: action.count }

    case 'TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching }

    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter(id => id !== action.userID)
      }
    }
    default:
      return state;
  };
};

type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
  followSuccess: (userID: number) => ({
    type: 'FOLLOW',
    userID
  } as const),

  unfollowSuccess: (userID: number) => ({
    type: 'UNFOLLOW',
    userID
  } as const),

  setUsers: (users: Array<UserType>) => ({
    type: 'SET_USERS',
    users
  } as const),

  setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage
  } as const),

  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_COUNT',
    count: totalUsersCount
  } as const),

  toggleIsFetching: (isFetching: boolean) => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching
  } as const),

  toggleFollowingProgress: (isFetching: boolean, userID: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userID
  } as const)
}


//1 type
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionTypes>;
//2 type
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const requestUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    let data = await userAPI.requestUsers(currentPage, pageSize)
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionTypes) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  };
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), actions.followSuccess)
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), actions.unfollowSuccess)
  };
};

export default usersReducer;