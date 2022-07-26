import $http from './index'

interface loginData {
  username: string
  password: string
}

export const login = (data: loginData) => $http({
  url: '/login',
  method: 'post',
  data
})

export const getList = (data: any) => $http({
  url: '/getlist',
  method: 'get',
  data
})

export const getRoleList = () => $http({
  url: '/getRoleList',
  method: 'get'
})

export const getUserList = () => $http({
  url: '/getUserList',
  method: 'get'
})

export const getAuthority = () => $http({
  url: '/geTauthority',
  method: 'get'
})

export const getRouter = () => $http({
  url: '/getRouter',
  method: 'get'
})