/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const certificationRouter = {
  path: '/certification',
  component: Layout,
  name: '认证中心',
  icon: 'el-icon-date',
  redirect: '/certification/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views//certification'),
      name: '个人认证',
      meta: {
        title: 'account',
        icon: 'guide',
        noCache: true
      }
    }
  ]
}
export default certificationRouter
