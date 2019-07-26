/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const certificationRouter = {
  path: '/certification',
  component: Layout,
  name: 'certification',
  icon: 'el-icon-date',
  meta: {
    title: '认证中心'
  },
  redirect: '/certification/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views//certification'),
      name: 'accountIndex',
      meta: {
        title: '个人认证',
        icon: 'guide',
        noCache: true
      }
    }
  ]
}
export default certificationRouter
