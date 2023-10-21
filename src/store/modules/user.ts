//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo } from '@/api/user/index'
//引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/tape'
import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
//引入路由常量
import { constantRoute } from '@/router/routes'
//创建用户小仓库
let useUserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      //用本地持久化存储赋值
      token: GET_TOKEN(), //用户的唯一标识
      menuRoutes: constantRoute, //仓库存储生成菜单需要的路由
      username: '',
      avatar: '',
    }
  },
  //异步或者逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      //登录请求
      let result: loginResponseData = await reqLogin(data)
      console.log(result)

      //登录成功：200-》token
      //登陆失败：201-》登录失败信息
      if (result.code == 200) {
        this.token = result.data.token as string
        // console.log(this.token);
        //本地持久化存储
        SET_TOKEN(result.data.token as string)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    //获取用户信息的方法
    async userInfo() {
      //获取用户信息进行存储仓库
      let result = await reqUserInfo()
      //获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        console.log(this.username, this.avatar)
      } else {
      }
    },
  },
  getters: {},
})

//暴露小仓库
export default useUserStore
