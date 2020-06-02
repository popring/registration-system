import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import { Home, Login, About, Common } from '@/views/'
import { NotFound } from '@/components/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'

Vue.use(VueRouter)

// 解决访问同一路由报错情况
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error => error)
}

const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          title: '主页',
          roles: 'student'
        }
      },
      {
        path: '/registration',
        name: 'registration',
        component: About,
        meta: {
          title: '报名',
          roles: 'student'
        }
      },
      {
        path: '/common',
        component: Common,
        meta: {
          title: 'common',
          roles: 'student'
        }
      },
      {
        path: '/studenManagement',
        name: 'studenManagement',
        component: About,
        meta: {
          title: '学生管理',
          roles: 'admin'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: Login
  },
  {
    path: '/404',
    name: 'Notfound',
    component: NotFound,
    hidden: true,
    meta: {
      title: '404'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  // 进度条
  NProgress.start()

  // 权限管理
  const roles = store.state.user.roles
  if (roles) {
    // 渲染 siderbar 菜单栏
    if (store.state.permission.routes.length === 0) {
      const routes = []
      constantRoutes.forEach(route => {
        const newList = createPath(route, roles)
        if (typeof newList === 'object') routes.push(...newList)
      })
      store.commit('SET_ROUTES', routes)
    }
  }

  // 权限管理
  if (to.meta.roles !== roles && to.path !== '/404') {
    next({ path: '/404' })
  }

  // 设置标题
  document.title = '专升本报名系统' + (' - ' + to.meta.title || '')

  next()
})

router.afterEach(() => {
  NProgress.done()
})

// 创建左边siderbar 当前角色可访问的菜单
function createPath(route, roles) {
  // 含有Children属性
  const createOutPath = (routes, roles) => {
    return routes.filter(route => {
      return createChildrenPath(route, roles)
    })
  }

  // 无children属性
  const createChildrenPath = (route, roles) => {
    if (route.meta && route.meta.roles === roles && !route.hidden) {
      return [route]
    }
    return false
  }

  if (route.children) {
    return createOutPath(route.children, roles)
  }
  return createChildrenPath(route, roles)
}

export default router
