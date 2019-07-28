import request from '@/utils/request'
// 获取接口
export function getModuleDefine(sign, data) {
  return request({
    url: `/api/xxxxx`,
    method: 'GET',
    data
  })
}

