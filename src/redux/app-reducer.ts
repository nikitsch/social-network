import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
  initialized: false
};

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED-SUCCESS':
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  };
};

// type ActionTypes = InitializedSuccessActionType

// type InitializedSuccessActionType = {
//   type: typeof 'SN/APP/INITIALIZED-SUCCESS'
// }

export const actions = {
  initializedSuccess: () => ({type: 'SN/APP/INITIALIZED-SUCCESS'} as const)
}

// type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

// export const initializeApp = (): ThunkType => (dispatch) => {
export const initializeApp = () => (dispatch: any) => {
let promise = dispatch(getAuthUserData());
  Promise.all([promise])
    .then(() => {
      dispatch(actions.initializedSuccess());
    })
}

export default appReducer;