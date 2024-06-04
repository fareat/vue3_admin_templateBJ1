//进行axios二次封装：目的是使用请求与拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
//引入用户相关的仓库
import useUserStore from '@/store/modules/user'

//第一步：利用axios对象的create方法，区创建axios实例（其他的配置：基础路径，超时时间）
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径会携带/api
  timeout: 5000, //超时时间
})
//第二步：request实例添加请求与响应拦截器,-----可以定义参数
request.interceptors.request.use((config) => {
  //console.log(config);
  //获取用户相关的小仓库：获取仓库内部的token
  const useStore = useUserStore()
  if (useStore.token) {
    config.headers.token = useStore.token
  }
  //config配置对象，headers属性请求头，经常给服务器端携带公共参数
  //返回配置对象
  return config
})

//第三步：响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调:处理http网络错误的
    //定义一个变量：存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器异常'
        break
      default:
        message = '网络异常'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  },
)

//对外暴露
export default request
