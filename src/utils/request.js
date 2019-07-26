import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import qs from 'qs'
import store from '../store'
axios.defaults.withCredentials = true
// create an axios instance
const service = axios.create({
  baseURL: 'http://padshow.sqpon.cn', // api 的 base_url
  timeout: 50000 // request timeout
})
// const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// const CancelToken = axios.CancelToken
// const removePending = (config) => {
//   for (const p in pending) {
//     if (pending[p].u === config.url + '&' + config.method) { // 当当前请求在数组中存在时执行函数体
//       pending[p].f() // 执行取消操作
//       pending.splice(p, 1) // 把这条记录从数组中移除
//     }
//   }
// }
// request interceptor
service.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['content-type'] = 'application/x-www-form-urlencoded'
    if (
      config.data &&
      config.method === 'post' &&
      config.data.constructor !== FormData
    ) {
      // 判断config.data.constructor不是formdata，则不qs格式化data
      config.data = qs.stringify(config.data, {
        arrayFormat: 'repeat'
      }) // 数组需要格式化一下，格式化模式有三种：indices、brackets、repeat
    }
    // removePending(config) // 在一个ajax发送前执行一下取消操作
    // config.CancelToken = new CancelToken((c) => {
    //   // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    //   pending.push({ u: config.url + '&' + config.method, f: c })
    // })
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// response interceptor
// 后端只有4个返回状态码：4003、501、500、400、200
service.interceptors.response.use(
  response => {
    //  removePending(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    if (response.data.success) {
      return response.data
    } else {
      // 后台抛异常
      // 如果是302，会出现两个异常，一个是302本身，走error，另外一个是login-result，状态码4003
      if (response.data.code === 4003 && store.state.user.flag) {
        // 登录状态丢失，退出登录
        // 登录超时弹窗
        store.commit('SET_FLAG', false) // 关闭拦截弹窗
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象和全局flag 避免bug
            })
          })
          .catch(() => {
            store.commit('SET_FLAG', true) // 点击取消重新开启拦截弹窗
          })
        return response.data
      } else {
        // 其他异常
        if (
          response.data.code === 400 ||
          response.data.code === 500 ||
          response.data.code === 501
        ) {
          // 后端重写状态码
          Message({
            type: 'error',
            message: response.data.msg || '系统错误！！！'
          })
        }
        // 接口异常返回数据，主要为了捕获状态码
        return response
      }
    }
  },
  error => {
    let message
    switch (process.env.ENV) {
      case 'development':
        console.log('err' + error)
        message = error.message
        break

      default:
        message = '网络错误, 请稍后重试'
        break
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
