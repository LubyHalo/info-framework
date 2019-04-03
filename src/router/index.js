import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/',
    name: 'HomeIndex',
    hidden: true,
    component: () => import('@/containers/Home'),
    redirect: '/welcome',
    children: [
      { path: 'welcome', name: '欢迎页', icon: 'speedometer', component: () => import('@/views/Welcome') }
    ]
  },
  {
    path: '/panel',
    name: '我的面板',
    redirect: '/panel/information',
    component: () => import('@/containers/Home'),
    children: [
      { path: 'setting-password', name: '修改密码', icon: 'speedometer', component: () => import('@/views/PasswordSetting') },
      { path: 'information', name: '订单信息', icon: 'speedometer', component: () => import('@/views/order/Information') }
    ]
  }
]

export default new Router({
  // mode: 'history',
  routes: routerMap
})
