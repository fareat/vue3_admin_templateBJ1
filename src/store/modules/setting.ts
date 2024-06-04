//小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用于控制菜单折叠收起还是控制
      refsh: false, //仓库的这个属性用于控制刷新效果
    }
  },
})

export default useLayOutSettingStore
