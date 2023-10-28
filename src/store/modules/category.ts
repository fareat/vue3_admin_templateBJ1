//商品分类全局组件的小仓库
import { reqC1 } from '@/api/product/attr/index'
import { defineStore } from 'pinia'
//
import type { CategoryResponseData } from '@/api/product/attr/type'
//
import type { CategoryState } from './types/type'

let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: '',
    }
  },
  actions: {
    //获取一级分类的方法
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
