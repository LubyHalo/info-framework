import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/info/getinfo',
    method: 'get',
    params
  })
}

export function getList1 (params) {
  return request({
    url: '/info/getinfo2',
    method: 'get',
    params
  })
}

export function saveList (params) {
  return request({
    url: '/info/saveinfo',
    method: 'POST',
    params
  })
}
