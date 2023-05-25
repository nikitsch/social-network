import axios from 'axios';
import { UserType } from '../types/types';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '554413f3-0efe-4111-880a-a4852cf6f5a8' // TODO: move api key in .env
  }
});

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D
  messages: string[] // ИЛИ Array<string>
  resultCode: RC
}