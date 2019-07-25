import config from '@/config'
export default {
  // 去重
  removeRepeat: function (array) {
    return Array.from(new Set(array))
  },
  // 上传图片url拼接
  joinImgUrl: function (url) {
    if (url) {
      return `${config.imgUrl}${url}`
    } else {
      return ''
      // throw new Error('缺少url参数')
    }
  },
  // 节流 func执行函数 wait执行时间
  throttle: function (fn, delay, atleast) {
    var timer = null
    var previous = null
    return function () {
      var now = +new Date()
      if (!previous) previous = now
      if (atleast && now - previous > atleast) {
        fn()
        // 重置上一次开始时间为本次结束时间
        previous = now
        clearTimeout(timer)
      } else {
        clearTimeout(timer)
        timer = setTimeout(function () {
          fn()
          previous = null
        }, delay)
      }
    }
  },
  // 格式化时间戳
  formatDateTime: function (inputTime, flag) {
    if (inputTime === '' || inputTime === null) {
      return ''
    }
    let date = new Date(inputTime)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    return flag ? y + '-' + m + '-' + d : y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  },
  // 导出excel
  downloadExcel: function (data, name) {
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    })
    if ('download' in document.createElement('a')) {
      const downloadElement = document.createElement('a')
      const href = window.URL.createObjectURL(blob)
      downloadElement.href = href
      downloadElement.download = name + '.xls'
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    } else {
      navigator.msSaveBlob(blob, name + '.xls')
    }
  }
}
