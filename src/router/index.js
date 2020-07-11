import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import views from '@/views/'
import { NotFound } from '@/components/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'
import { createMenuItem } from '../utils/createMenu'
import defaultSetting from '@/settings'

Vue.use(VueRouter)

// 解决访问同一路由报错情况
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
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
        component: views['Home'],
        meta: {
          title: '系统主页',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: '/notice',
        name: 'Notice',
        component: views['Notice'],
        meta: {
          title: '通知公告',
          role: 'student',
          icon: 'el-icon-bell'
        }
      },
      {
        path: '/apply',
        name: 'Apply',
        component: views['Apply'],
        meta: {
          title: '现在报名',
          role: 'student',
          icon: 'el-icon-notebook-2'
        }
      },
      {
        path: '/score',
        name: 'Score',
        component: views['Score'],
        meta: {
          title: '成绩查询',
          role: 'student',
          icon: 'el-icon-data-board'
        }
      },
      {
        path: '/offer',
        name: 'Offer',
        component: views['Offer'],
        meta: {
          title: '录取查询',
          role: 'student',
          icon: 'el-icon-time'
        }
      },
      {
        path: '/admin/student',
        name: 'AdminStudent',
        component: views['StudentManage'],
        meta: {
          title: '考生管理',
          role: 'admin',
          icon: 'el-icon-s-custom'
        }
      },
      {
        path: '/admin/audit',
        name: 'AdminAudit',
        component: views['AuditManage'],
        meta: {
          title: '审核管理',
          role: 'admin',
          icon: 'el-icon-s-check'
        }
      },
      {
        path: '/admin/score',
        name: 'AdminScore',
        component: views['ScoreManage'],
        meta: {
          title: '成绩管理',
          role: 'admin',
          icon: 'el-icon-s-marketing'
        }
      },
      {
        path: '/admin/notice',
        name: 'AdminNotice',
        component: views['NoticeManage'],
        meta: {
          title: '公告管理',
          role: 'admin',
          icon: 'el-icon-message-solid'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: views['Login']
  },
  {
    path: '/signup',
    name: 'SignUp',
    hidden: true,
    component: views['SignUp']
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

  // 未登录不允许访问
  const token = window.localStorage.getItem('token')
  const userinfo = window.localStorage.getItem('userinfo')
  if (to.path === '/login') {
    next()
  } else if (!token && !(!to.meta || !to.meta.role)) {
    console.log(!token && !(!to.meta || !to.meta.role))
    next({ path: '/login', replace: true })
    // next切换路由，不会激活当前的afterEach函数钩子
    NProgress.done()
  } else if (store.state.user.id === 0 && userinfo) {
    // 已登录
    store.commit('SET_USERINFO', JSON.parse(userinfo))
    next()
  } else {
    next()
  }

  // 权限管理
  const role = store.state.user.role
  if (to.meta.role && to.meta.role !== role && to.path !== '/404') {
    next({ path: '/404' })
  }

  // 渲染 siderbar 菜单栏
  if (role) {
    if (store.state.permission.routes.length === 0) {
      const routes = []
      constantRoutes.forEach(route => {
        const newList = createMenuItem(route, role)
        if (typeof newList === 'object') routes.push(...newList)
      })
      store.commit('SET_ROUTES', routes)
    }
  }

  // 设置标题
  if (to.meta.title) {
    document.title = defaultSetting.title + ' - ' + to.meta.title
  } else {
    document.title = defaultSetting.title
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
