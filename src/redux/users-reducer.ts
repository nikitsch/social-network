import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { userAPI } from '../api/api';
import { UserType } from '../types/types';
import { updataObjectInArray } from '../utils/object-helpers';
import { AppStateType } from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
// const PHOTO_URL = 'https://i.guim.co.uk/img/media/3cd8327353fe290e2bbfe195c1006b6e3f2f4be6/0_297_3415_2049/master/3415.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=34157ed80928d3d8722f5c9e69c52482';

// type UserType = {
//   items: UserItemsType
//   totalCount: number
//   error: string
// }

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

    case FOLLOW:
      return {
        ...state,
        users: updataObjectInArray(state.users, action.userID, "id", { followed: true })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updataObjectInArray(state.users, action.userID, "id", { followed: false })
      }

    case SET_USERS:
      return { ...state, users: action.users }

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }

    case SET_TOTAL_COUNT:
      return { ...state, totalUsersCount: action.count }

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

type ActionTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType | TotalUsersCountType | ToggleIsFetchingType | ToggleFollowingProgressType

type FollowSuccessType = {
  type: typeof FOLLOW
  userID: number
}
export const followSuccess = (userID: number): FollowSuccessType => ({
  type: FOLLOW,
  userID
});

type UnfollowSuccessType = {
  type: typeof UNFOLLOW
  userID: number
}
export const unfollowSuccess = (userID: number): UnfollowSuccessType => ({
  type: UNFOLLOW,
  userID
});

type SetUsersType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({
  type: SET_USERS,
  users
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

type TotalUsersCountType = {
  type: typeof SET_TOTAL_COUNT
  count: number
}
export const setTotalUsersCount = (totalUsersCount: number): TotalUsersCountType => ({
  type: SET_TOTAL_COUNT,
  count: totalUsersCount
});

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userID: number
}
export const toggleFollowingProgress = (isFetching: boolean, userID: number): ToggleFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userID
});
//1 тип
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionTypes>;
//2тип
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const requestUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await userAPI.requestUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  };
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess)
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess)
  };
};

export default usersReducer;