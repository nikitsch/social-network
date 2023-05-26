import { Action } from "redux";
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptcha,  } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

// const SET_USER_DATA = 'SN/auth/SET-USER-DATA';
// const GET_CAPTCHA_URL_SUCCESS = 'SN/auth/GET-CAPTCHA-URL-SUCCESS';

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null as string | null // если null, значит капча не требуется
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/auth/SET-USER-DATA':
    case 'SN/auth/GET-CAPTCHA-URL-SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  };
};

// type ActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

// type SetAuthUserDataActionPayloadType = {
//   id: number | null,
//   email: string | null,
//   login: string | null,
//   isAuth: boolean
// }

// type SetAuthUserDataActionType = {
//   type: typeof 'SN/auth/SET-USER-DATA',
//   payload: SetAuthUserDataActionPayloadType
// }

// type GetCaptchaUrlSuccessActionType = {
//   type: typeof 'SN/auth/GET-CAPTCHA-URL-SUCCESS',
//   payload: { captchaUrl: string } //это то же описание типа
// }

export const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SN/auth/SET-USER-DATA',
    payload: { id, email, login, isAuth }
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'SN/auth/GET-CAPTCHA-URL-SUCCESS',
    payload: { captchaUrl }
  } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me()
  if (meData.resultCode === ResultCodeEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  };
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha)
  if (loginData.resultCode === ResultCodeEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  };
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl()
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  let logoutData = await authAPI.logout()
  if (logoutData.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  };
};

export default authReducer;


export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>