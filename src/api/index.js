import Vue from 'vue'

const request = Vue.axios

// 登录
export const login = data => request.post('/login', data)

// 检验token是否有效
export const ttoken = () => request.post('/ttoken')
