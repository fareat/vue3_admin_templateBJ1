//路由鉴权
import router from "./router/index";
//引入标题名字
import setting from "./setting";
//进度条组件
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//取消进度条的加载圈
nprogress.configure({showSpinner:false})
//接收小仓库的token，想引入小仓库时必须引入大仓库
//小仓库
import useUserStore from "./store/modules/user";
//大仓库
import pinia from "./store/index";
let userStore=useUserStore(pinia)
console.log(userStore)

//全局守卫：项目当中任意路由切换都会触发的钩子
//全局的前置守卫
router.beforeEach(async(to:any, from:any, next:any) => {
    document.title=`${setting.title} - ${to.meta.title}`
    //to：你要访问那个路由
    //from：你从哪个路由而来
    //next：路由的放行函数
    //进度条组件
    nprogress.start()
    //判断用户登录还是未登录
    let token=userStore.token
    //获取用户的名字
    let username=userStore.username
    if(token){
        //用户登录之后
        if(to.path=='/login'){
            next({path:'/'})
        }else{
            //登录成功后，其他的路由，除了login全部放行
            //判断是否有用户信息
            if(username){
                //有，放行
                next()
            }else{
                try {
                    //无，获取用户信息
                    await userStore.userInfo()
                    //放行
                    next()
                } catch (error) {
                    //token过期，或者token被本地修改，才会触发这个错误
                    //处理：1.退出登录，先把本地的相关数据清空
                    await userStore.userLogout()
                    next({path:'/login',query:{redirect:to.path}})                    
                }
            }
        }
    }else{
        //用户未登录之后
        if(to.path=='/login'){
            //路由放行
            next()
        }else{
            //未登录指向login,这是登录之后要进入的路由query:{redirect:to.path}
            next({path:'/login',query:{redirect:to.path}})
        }
    }
    
})
//全局的后置守卫
router.afterEach((to:any, from:any) => {
    nprogress.done()
    
    
})

//第一个问题：进度条的实现

//第二个问题：路由鉴权（路由组件访问权限设置）
//全部路有组件：登录|404|任意路由|首页|数据大屏|权限管理（3个子路由）|商品管理（4个子路由）
//用户未登录：可以访问login，其余6个路由不能访问（都指向login）
//登录成功：不能访问login


