import { createSelector } from 'reselect';
import { AppStateType } from '../../../redux/redux-store';

export const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter(u => true);
})

// export const getUsers = (state) => {
//   return state.usersPage.users;
// }

// export const getUsersSuperSelector = createSelector(getUsers, getIsFetching, (users, isFetching) => {
//   return users.filter(u => true);
// })

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
}