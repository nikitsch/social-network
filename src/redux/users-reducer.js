const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

// const PHOTO_URL = 'https://i.guim.co.uk/img/media/3cd8327353fe290e2bbfe195c1006b6e3f2f4be6/0_297_3415_2049/master/3415.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=34157ed80928d3d8722f5c9e69c52482';

let initialState = {
  users: [
    // { id: 1, photoUrl: PHOTO_URL, followed: true, fullName: 'Anastasia', status: 'Junior', location: { city: 'Minsk', country: 'Belarus' } },
    // { id: 2, photoUrl: PHOTO_URL, followed: true, fullName: 'Elle', status: 'Junior', location: { city: 'Athens', country: 'Greece' } },
    // { id: 3, photoUrl: PHOTO_URL, followed: false, fullName: 'Julie', status: 'Junior', location: { city: 'Paris', country: 'France' } }
  ],
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
        users: state.users.map(u => {
          if (u.id === action.userID) {
            return { ...u, followed: true }
          }
          return u;
        })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userID) {
            return { ...u, followed: false }
          }
          return u;
        })
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

export const follow = (userID) => ({
  type: FOLLOW,
  userID
});

export const unfollow = (userID) => ({
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

export default usersReducer;