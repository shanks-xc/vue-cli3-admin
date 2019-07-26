/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout/index.vue'

const accountRouter = {
  path: '/account',
  component: Layout,
  name: 'account',
  icon: 'el-icon-message',
  redirect: '/account/index',
  meta: {
    title: '系统账号管理'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/account/index.vue'),
      name: 'account',
      meta: {
        title: '账号管理',
        icon: 'guide',
        noCache: true
      }
    },
    {
      path: 'permisssion',
      component: () => import('@/views/account/permission.vue'),
      name: 'account',
      meta: {
        title: '权限管理',
        icon: 'guide',
        noCache: true
      }
    }
  ]
}
export default accountRouter
