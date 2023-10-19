import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
//引入element-plus提供的组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
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
    //将element图标注册给全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
