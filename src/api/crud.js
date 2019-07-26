import request from '@/utils/request'
export function getModuleDefine(sign, data) {
  return request({
    url: `/api/common/crud/${sign}/moduledefine`,
    method: 'GET',
    data
  })
}
export function getQuery(sign, data) {
  // crud模块获取列表
  return request({
    url: `/api/common/crud/${sign}/query`,
    method: 'POST',
    data
  })
}

export function create(sign, data) {
  // crud模块新增
  return request({
    url: `/api/common/crud/${sign}/add`,
    method: 'post',
    data
  })
}
export function getDetail(sign, data) {
  // crud模块查看详情
  return request({
    url: `/api/common/crud/${sign}/get`,
    method: 'post',
    data
  })
}

export function update(sign, data) {
  // crud模块编辑
  return request({
    url: `/api/common/crud/${sign}/mod`,
    method: 'post',
    data
  })
}

export function del(sign, data) {
  // crud模块删除
  return request({
    url: `/api/common/crud/${sign}/del`,
    method: 'post',
    data
  })
}
export function getList(sign) {
  // crud请求列表一些字段的list
  return request({
    url: `/api${sign}`,
    method: 'get'
  })
}
