import { post } from './request'
export const addUser = (params) => post('user/addUser', params);
export const Login = (params) => post('user/login', params);
export const GetUserInfo = (params) => post('user/getUserInfo', params);
