import axios from 'axios'
import qs from 'qs'
// import store from '../store'
import router from '../router'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'

// import baseConfig from '@/config'

const BASE_URL = 'http://boss.test.hobay.com.cn/'

const TIMEOUT_MILLISECONDS = 8000

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  timeout: TIMEOUT_MILLISECONDS,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 *  解決重复请求
 *
 */
let pending = []
let CancelToken = axios.CancelToken
let removePending = (config, cancleHandle) => {
  let _config = JSON.parse(JSON.stringify(config))
  try {
    // console.log('_config', _config)
    if (
      _config.url.indexOf(_config.baseURL) === -1 ||
      _config.url.indexOf(_config.baseURL) !== 0
    ) {
      if (process.env.NODE_ENV === 'production') {
        // if (true) {
        _config.baseURL.substr(_config.baseURL.length - 1, 1) !== '/' &&
          (_config.url = '/' + _config.url)
      } else {
        _config.url =
          _config.url.indexOf('/') === 0
            ? _config.url.substr(1, _config.url.length)
            : _config.url
      }
      _config.url = _config.baseURL + _config.url
    }
    if (
      _config.method === 'post' &&
      typeof _config.data === 'string' &&
      _config.headers['Content-Type'] === 'application/json'
    ) {
      _config.data = JSON.parse(_config.data)
    }
    let _con = {
      baseURL: _config.baseURL,
      url: _config.url,
      method: _config.method,
      param:
        _config.method === 'get' || _config.method === 'delete'
          ? _config.params
          : _config.data
    }
    if (pending.indexOf(JSON.stringify(_con)) !== -1) {
      if (cancleHandle) {
        console.log('重复的请求已取消')
        // console.log('取消', _config)
        cancleHandle()
      } else {
        // console.log('请求回来删除数组记录', _config)
        pending.splice(pending.indexOf(JSON.stringify(_con)), 1)
      }
    } else {
      // console.log('首条', _config)
      pending.push(JSON.stringify(_con))
    }
  } catch (error) {
    console.log('出错', _config)
    pending = []
    console.log('取消重复请求出错' + error)
  }
  // console.log('removePending', pending)
}

/**
 *  axios请求拦截器
 *
 */
let noneHeaderArray = [
  'bosszuul/excel/import/getTask',
  'bosszuul/excel/import/startTask',
  'bosszuul/excel/import/sign',
  'bosszuul/excel/import/createTask'
]
instance.interceptors.request.use(
  config => {
    config.headers['versionKey'] = '2.5.1'
    noneHeaderArray.forEach(item => {
      if (config.url.indexOf(item) > -1) {
        config.headers.login = Cookies.get('login')
      }
    })
    if (
      config.method === 'post' &&
      config.headers['Content-Type'] !== 'application/json'
    ) {
      config.data = qs.stringify(config.data)
    }
    config.cancelToken = new CancelToken(c => {
      removePending(config, c)
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 *  axios响应拦截器
 *
 */
instance.interceptors.response.use(
  response => {
    removePending(response.config)
    return response.data
  },
  error => {
    removePending(error.config) // 不管成功与否都从记录中移除请求记录
    pending = []
    let url = [
      'product/operateProduct/batchOut',
      'product/operateProduct/batchPutaway',
      'product/operateProduct/batchCopyProduct'
    ]
    if (error.response) {
      if (error.response.status === 500) {
        if (!error.config.url.includes(...url)) {
          Message.error({
            message: '服务器异常！请稍后重试'
          })
        }
      } else if (error.response.status > 500) {
        if (!error.config.url.includes(...url)) {
          Message.error({
            message: error.response.data.message
          })
        }
        let loginCode = [202010, 202020, 202030, 202040, 202050]
        if (loginCode.includes(error.response.data.code)) {
          pending = []
          localStorage.removeItem('userInfo')
          Cookies.remove('login')
          router.push({
            name: '登录',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }
      }
    } else {
      if (
        error.code === 'ECONNABORTED' &&
        error.message.indexOf('timeout') !== -1
      ) {
        Message.error({
          message: '网络异常'
          // center: true
        })
      }
    }
    // switch (error.response && error.response.status) {
    //   case 400:
    //     error.message = '请求错误(400)'
    //     break
    //   case 401:
    //     error.message = '未授权，请重新登录(401)'
    //     break
    //   case 403:
    //     error.message = '拒绝访问(403)'
    //     break
    //   case 404:
    //     error.message = '请求出错(404)'
    //     break
    //   case 408:
    //     error.message = '请求超时(408)'
    //     Message.error({
    //       message: '请求超时,请刷新后连接!'
    //       // center: true
    //     })
    //     break
    //   case 500:
    //     error.message = '服务器错误(500)'
    //     Message.error({
    //       message: '服务器异常！'
    //       // center: true
    //     })
    //     break
    //   case 501:
    //     error.message = '服务未实现(501)'
    //     break
    //   case 502:
    //     error.message = '网络错误(502)'
    //     break
    //   case 503:
    //     error.message = '服务不可用(503)'
    //     break
    //   case 504:
    //     error.message = '网络超时(504)'
    //     break
    //   case 505:
    //     error.message = 'HTTP版本不受支持(505)'
    //     break
    //   case 510:
    //     Message.error({
    //       message: error.response.data.message
    //     })
    //     let loginCode = [202010, 202020, 202030, 202040, 202050]
    //     if (loginCode.includes(error.response.data.code)) {
    //       localStorage.removeItem('userInfo')
    //       router.push({
    //         name: '登录',
    //         query: {
    //           redirect: router.currentRoute.fullPath
    //         }
    //       })
    //     }
    //     break
    // }
    return Promise.reject(error)
  }
)
export default instance
