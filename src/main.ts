import { createApp } from 'vue'
//引入element-plus插件的样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//配置element-plus的国际化
//忽略以下导入的文件
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import App from '@/App.vue'
//import SvgIcon from 'E:/vue_1/demo2/src/components/index.vue'
//引入模板全局样式
import '@/styles/index.css'
//引入路由
import router from './router/index'
//测试假的接口能否使用
import axios from 'axios'
//引入自定义插件对象：注册整个项目的全局组件
import gloalComponent from '@/components/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  //中文
  locale: zhCn,
})
app.use(ElementPlus)
//console.log(import.meta.env)
//app.component('SvgIcon',SvgIcon)

//安装自定义插件
app.use(gloalComponent)

//登录接口
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
})
app.use(router)
app.mount('#app')
