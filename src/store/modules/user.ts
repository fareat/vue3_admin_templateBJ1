//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
//引入新的数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/tape'

/* //引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/tape' */
import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由常量
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import router from '@/router/index'
//引入深拷贝方法

import cloneDeep from 'lodash/cloneDeep'

//用于过滤当前用户需要的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    //includes是判断routes是否存在item.name，有则往下运行
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      //用本地持久化存储赋值
      token: GET_TOKEN(), //用户的唯一标识
      menuRoutes: constantRoute, //仓库存储生成菜单需要的路由
      username: '',
      avatar: '',
      button: [],
    }
  },
  //异步或者逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      console.log(result)

      //登录成功：200-》token
      //登陆失败：201-》登录失败信息
      if (result.code == 200) {
        this.token = result.data as string
        // console.log(this.token);
        //本地持久化存储
        SET_TOKEN(result.data as string)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息的方法
    async userInfo() {
      //获取用户信息进行存储仓库
      const result: userInfoReponseData = await reqUserInfo()
      //获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        //异步路由处理方法cloneDeep(asyncRoute)
        const userAsyncRounte = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        //菜单的数据
        ;(this.menuRoutes = [...constantRoute, ...userAsyncRounte, anyRoute]),
          [...userAsyncRounte, anyRoute].forEach((route: any) => {
            router.addRoute(route)
          })

        console.log(this.username, this.avatar, this.menuRoutes)
        //目前路由管理的只有常量路由：用户计算异步路由，任意路由动态追加

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      const result: any = await reqLogout()
      console.log(result)
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

//暴露小仓库
export default useUserStore
