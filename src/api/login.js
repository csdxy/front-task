import axios from 'axios'

export const login = (params) => {
  return axios.post('//interview.emicmh.com/login', params).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export const signup = (params) => {
  return axios.post('//interview.emicmh.com/signup', params).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export const getUser = () => {
  return axios.get('//interview.emicmh.com/getUser').then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export const logout = (params) => {
  return axios.get('//interview.emicmh.com/logout').then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}