import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { AppStateType } from "./redux-store";


const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS';

export type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false
};

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  };
};

type ActionTypes = InitializedSuccessActionType

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS
});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const initializeApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise])
    .then(() => {
      dispatch(initializedSuccess());
    })
}

export default appReducer;