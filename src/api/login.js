import axios from 'axios'

export const login = (params) => {
  if (isHttps()) {
    return Promise.resolve({ 'code': 200, 'info': '登录成功‘' })
  }
  return axios.post('http://interview.emicmh.com/login', params).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export const signup = (params) => {
  if (isHttps()) {
    return Promise.resolve({ 'code': 200, 'info': '注册成功‘' })
  }
  return axios.post('//interview.emicmh.com/signup', params).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export const getUser = () => {
  if (isHttps()) {
    return Promise.resolve({ 'code': 200, 'data': [{ 'name': '2', 'password': '3' }, { 'name': '11', 'password': '23213' }, { 'name': '111', 'password': '111' }, { 'name': '123', 'password': '123' }, { 'name': '222', 'password': '222' }, { 'name': '333', 'password': '444' }, { 'name': '444', 'password': '555' }, { 'name': '555', 'password': '555' }, { 'name': '888', 'password': '888' }, { 'name': '1112', 'password': '11' }, { 'name': '4545', 'password': '545454' }, { 'name': '33322', 'password': '1' }, { 'name': '111222', 'password': '222' }, { 'name': '121212', 'password': '222' }, { 'name': '123123', 'password': '1' }, { 'name': '354354', 'password': '3454354' }, { 'name': '2343243', 'password': '234234324' }, { 'name': '111222111', 'password': '11' }] })
  }
  return axios.get('//interview.emicmh.com/getUser').then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export const logout = (params) => {
  if (isHttps()) {
    return Promise.resolve({ 'code': 200, 'info': '退出成功' })
  }
  return axios.get('//interview.emicmh.com/logout').then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

function isHttps() {
  return window.location.protocol === 'https:'
}