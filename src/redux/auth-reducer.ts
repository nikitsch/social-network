import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { ResultCodeEnum, ResultCodeForCaptcha,  } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = 'SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS';

// export type InitialStateType = {
//   id: number | null
//   email: string | null
//   login: string | null
//   isAuth: boolean
//   isFetching: boolean
//   captchaUrl: string | null
// }

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null as string | null // если null, значит капча не требуется
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  };
};

type ActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

type SetAuthUserDataActionPayloadType = {
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
}
type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth }
});

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl: string } //это то же описание типа
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl }
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me()
  if (meData.resultCode === ResultCodeEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(setAuthUserData(id, email, login, true));
  };
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
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
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  let logoutData = await authAPI.logout()
  if (logoutData.data.resultCode === ResultCodeEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  };
};

export default authReducer;