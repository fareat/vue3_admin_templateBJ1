//统一管理项目用户的接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from './tape'
//项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//登录接口:携带密码，账号，两个数据进行请求
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)

//------------------伪接口的获取方式---------------------
/* import type { loginForm, loginResponseData, userResponseData } from './tape'
//统一接口管理
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

//暴露请求函数
//登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息接扣方法
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL) */
