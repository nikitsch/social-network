import { userAPI } from '../api/api';
import { updataObjectInArray } from '../utils/object-helpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
// const PHOTO_URL = 'https://i.guim.co.uk/img/media/3cd8327353fe290e2bbfe195c1006b6e3f2f4be6/0_297_3415_2049/master/3415.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=34157ed80928d3d8722f5c9e69c52482';

let initialState = {
  users: [],
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

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

export const followSuccess = (userID) => ({
  type: FOLLOW,
  userID
});

export const unfollowSuccess = (userID) => ({
  type: UNFOLLOW,
  userID
});

export const setUsers = (users) => ({
  type: SET_USERS,
  users
});

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_COUNT,
  count: totalUsersCount
});

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

export const toggleFollowingProgress = (isFetching, userID) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userID
});

export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await userAPI.requestUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  };
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess)
  };
};

export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess)
  };
};

export default usersReducer;