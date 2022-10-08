import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'book',
        name: 'book',
        meta: {
          isShow: true,
          title: '书籍管理'
        },
        component: () => import(/* webpackChunkName: "book" */ '../views/BookView.vue')
      },
      {
        path: 'chapter',
        name: 'chapter',
        component: () => import(/* webpackChunkName: "chapter" */ '../components/Chapter.vue')
      },
      {
        path: 'section',
        name: 'section',
        component: () => import(/* webpackChunkName: "section" */ '../components/Section.vue')
      },
      {
        path: 'section/:id',
        name: 'sectionDetail',
        component: () => import(/* webpackChunkName: "sectionDetail" */ '../components/SectionDetail.vue')
      },
      {
        path: 'createSection',
        name: 'createSection',
        component: () => import(/* webpackChunkName: "sectionDetail" */ '../components/SectionDetail.vue')
      },
      {
        path: 'blog',
        name: 'blog',
        meta: {
          isShow: true,
          title: '博客管理'
        },
        component: () => import(/* webpackChunkName: "blog" */ '../views/BlogView.vue')
      },
      {
        path: 'blog/:id',
        name: 'blogDetail',
        component: () => import(/* webpackChunkName: "blogDetail" */ '../components/BlogDetail.vue')
      },
      {
        path: 'createBlog',
        name: 'createBlog',
        component: () => import(/* webpackChunkName: "createBlog" */ '../components/BlogDetail.vue')
      },
      {
        path: 'video',
        name: 'video',
        meta: {
          isShow: true,
          title: '视频管理'
        },
        component: () => import(/* webpackChunkName: "video" */ '../views/VideoView.vue')
      },
      {
        path: 'resource',
        name: 'resource',
        meta: {
          isShow: true,
          title: '资源管理'
        },
        component: () => import(/* webpackChunkName: "resource" */ '../views/ResourceView.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          isShow: true,
          title: '用户管理'
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
      }
    ]
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
