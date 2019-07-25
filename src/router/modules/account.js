/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout/index.vue'

const accountRouter = {
  path: '/account',
  component: Layout,
  name: '系统账号管理',
  icon: 'el-icon-message',
  redirect: '/account/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/account/index.vue'),
      name: '账号管理',
      meta: {
        title: 'account',
        icon: 'guide',
        noCache: true
      }
    },
    {
      path: 'permisssion',
      component: () => import('@/views/account/permission.vue'),
      name: '权限管理',
      meta: {
        title: 'account',
        icon: 'guide',
        noCache: true
      }
    }
  ]
}
export default accountRouter
