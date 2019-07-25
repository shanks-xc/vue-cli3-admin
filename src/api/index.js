import fetch from '../utils/fetch'

export default (function request () {
  return function () {
    let args = Array.from(arguments)
    const config = args[0]
    const funcName = args[1]
    const data = args[2]

    if (typeof config[funcName] !== 'object') {
      throw new Error('调用api函数函数错误，请检查函数名称是否错误')
    }
    // 配置axios的config
    var newConfig = JSON.parse(JSON.stringify(config[funcName]))
    if (data) {
      if (config[funcName].method === 'get' || config[funcName].method === 'delete' || config[funcName].method === undefined) {
        newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
          var res = data[$1]
          delete data[$1]
          return res
        })
        newConfig.params = data
      } else {
        newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
          var res = data[$1]
          delete data[$1]
          return res
        })
        newConfig.data = data
      }
    }
    return fetch(newConfig)
  }
})()
