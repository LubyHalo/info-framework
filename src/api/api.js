import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '@/router'
import vue from 'vue'

const service = axios.create({
  baseURL: '/', // 因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器(发送请求前将参数序列化)
service.interceptors.request.use(
  (config) => {
    // 判断请求是否为(post,put,delete),若是则序列化参数
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      // 序列化参数
      config.data = qs.stringify(config.data)
    }

    // 有鉴权token，在头部带上token
    // if (localStorage.token) {
    //   config.headers.Authorization = localStorage.token
    // }
    return config
  },
  (error) => {
    Message({
      // 消息弹框
      showClose: true,
      message: error,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
// 响应拦截器，返回状态判断
service.interceptors.response.use(
  function (response) {
    return response
  }, function (error) {
    return Promise.reject(error)
  }
  // (res) => {
  //   // 对响应数据操作
  //   if (res.data && !res.data.success) {
  //     Message({
  //       //  消息弹窗,弹出消息
  //       showClose: true,
  //       message: res.data.error.message.message
  //         ? res.data.error.message.message
  //         : res.data.error.message,
  //       type: 'error'
  //     })
  //     return Promise.reject(res.data.error.message)
  //   }
  //   return res
  // },
  // (error) => {
  //   // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
  //   // 直接丢localStorage或者sessionStorage
  //   // if (!window.localStorage.getItem('loginUserBaseInfo')) {
  //   //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
  //   //   router.push({
  //   //     path: '/login'
  //   //   })
  //   // } else {
  //   //   // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
  //   //   // 返回去登录页重新登录
  //   //   let lifeTime = JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime * 1000
  //   //   let nowTime = new Date().getTime() // 当前时间的时间戳
  //   //   console.log(nowTime, lifeTime)
  //   //   console.log(nowTime > lifeTime)
  //   //   if (nowTime > lifeTime) {
  //   //     Message({
  //   //       showClose: true,
  //   //       message: '登录状态信息过期,请重新登录',
  //   //       type: 'error'
  //   //     })
  //   //     router.push({
  //   //       path: '/login'
  //   //     })
  //   //   } else {
  //   //     // 下面是接口回调的satus ,会指向对应的报错页面
  //   //     if (error.response.status === 403) {
  //   //       router.push({
  //   //         path: '/error/403'
  //   //       })
  //   //     }
  //   //     if (error.response.status === 500) {
  //   //       router.push({
  //   //         path: '/error/500'
  //   //       })
  //   //     }
  //   //     if (error.response.status === 502) {
  //   //       router.push({
  //   //         path: '/error/502'
  //   //       })
  //   //     }
  //   //     if (error.response.status === 404) {
  //   //       router.push({
  //   //         path: '/error/404'
  //   //       })
  //   //     }
  //   //   }
  //   // }
  //   // // 返回 response 里的错误信息
  //   // let errorInfo = error.data.error ? error.data.error.message : error.data
  //   return Promise.reject(error)
  // }
)

// 封装axios的post请求
export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 封装axios请求
// export function request (url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, params)
//       .then(response => {
//         resolve(response.data)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

export default {
  infoRow (url, params) {
    return fetch(url, params)
  }
}
