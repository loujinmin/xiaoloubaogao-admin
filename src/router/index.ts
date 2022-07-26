import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue';
import {getRouter} from '@/http/api';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    // children: [
    //   {
    //     path: 'order',
    //     name: 'order',
    //     meta: {
    //       isShow: true,
    //       title: '订单列表'
    //     },
    //     component: () => import(/* webpackChunkName: "order" */ '../views/OrderView.vue')
    //   },
    //   {
    //     path: 'user',
    //     name: 'user',
    //     meta: {
    //       isShow: true,
    //       title: '用户列表'
    //     },
    //     component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
    //   },
    //   {
    //     path: 'role',
    //     name: 'role',
    //     meta: {
    //       isShow: true,
    //       title: '角色列表'
    //     },
    //     component: () => import(/* webpackChunkName: "role" */ '../views/RoleView.vue')
    //   },
    //   {
    //     path: 'authority',
    //     name: 'authority',
    //     meta: {
    //       isShow: false,
    //       title: '权限列表'
    //     },
    //     component: () => import(/* webpackChunkName: "authority" */ '../views/AuthorityView.vue')
    //   }
    // ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由拦截器
router.beforeEach(async (to, from, next) => {
  // 如果没有登录则只能进入登录界面
  const token: string | null = localStorage.getItem('token')
  if(!token && to.path !== '/login'){
    next('/login')
  }
  else if(to.path !== '/login' && token){
    if(router.getRoutes().length === 2) {

      // 添加动态路由
      let routerData: any = await getRouter()
      routerData = routerData.data
      console.log(routerData, '   1');
      
      routerData.forEach((v: any) => {
        const routerObj: RouteRecordRaw = {
          path: v.name,
          name: v.name,
          meta: v.meta,
          // component: () => import(/* webpackChunkName: "order" */ '../views/OrderView.vue') 
          component: () => import(/* webpackChunkName: "[request]" */ `../views/${v.path}.vue`)
        }
        router.addRoute('home', routerObj)
      })
      
      router.replace(to.path)
    }
    next()
  }
  else if(to.path === '/login' && token){
    next('/')
  }
  else{
    next()
  }
})

export default router
