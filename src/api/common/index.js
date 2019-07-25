import request from '../index'
const config = {
  // 登录
  login: {
    url: 'bosszuul/user/operateUser/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  },
  // 退出
  logout: {
    url: 'bosszuul/user/operateUser/logout',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  },
  // 通过userId查询正常状态仓主信息
  getValidStorageByUserId: {
    url: 'bosszuul/product/storage/getValidStorageByUserId',
    method: 'get'
  },
  // 获取用户信息
  getLoginInfo: {
    url: 'bosszuul/user/operateUser/getLoginInfo',
    method: 'get'
  }
}

export default function req (funcName, data) {
  return request(config, funcName, data)
}
