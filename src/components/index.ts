import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
//全局对象
const allGloablComponent = { SvgIcon, Pagination }

//对外暴露插件
export default {
  //务必叫做install
  install(app) {
    //注册项目全部的全局组件
    console.log(app)
    Object.keys(allGloablComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGloablComponent[key])
    })
  },
}
