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

const app = createApp(App)

app.use(ElementPlus, {
  //中文
  locale: zhCn,
})
app.use(ElementPlus)
console.log(import.meta.env)

app.mount('#app')
