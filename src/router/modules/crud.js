/** When your routing table is too long, you can split it into small modules **/
// import Layout from '@/layout'
import Layout from '@/layout'
const crudRouter = {
  path: '/site',
  redirect: '/site/index',
  component: Layout,
  name: 'site',
  icon: 'el-icon-message',
  meta: {
    title: 'CRUD'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/crud/index'),
      name: 'siteIndex',
      meta: {
        title: '场地管理'
      }
    },
    {
      path: 'add',
      component: () => import('@/components/Crud/Form/AddView'),
      name: 'siteAdd',
      hidden: true,
      meta: {
        title: '新增',
        hiddenNav: true,
        activeMenu: '/crud/site/index'
      }
    },
    {
      path: ':id',
      component: () => import('@/components/Crud/Form/EditView'),
      name: 'siteEdit',
      hidden: true,
      meta: {
        title: '编辑',
        hiddenNav: true,
        activeMenu: '/crud/site/index'
      }
    }
  ]
}
export default crudRouter
