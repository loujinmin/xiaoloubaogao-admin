import axios from 'axios'
import { ElMessage } from 'element-plus'

enum MSGS {
  '操作成功' = 20000,
  '密码错误',
  '账号错误',
  '请求异常',
  '登录失败' = 40000
}

// 创建http实例
const $http = axios.create({
  baseURL: 'http://43.138.110.98:7001/api',
  timeout: 2000
})

// 请求拦截
$http.interceptors.request.use(config => {
  config.headers = config.headers || {}
  if(localStorage.getItem('token')){
    config.headers.token = localStorage.getItem('token') || ''
  }
  return config
})

// 响应拦截
$http.interceptors.response.use(res => {
  const code: number = res.data.code
  
  if(code !== 20000){
    ElMessage.error(MSGS[code])
    return Promise.reject(res.data)
  }

  return res.data

}, err => {
  console.log(err)
})

export default $http