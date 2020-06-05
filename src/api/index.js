import Vue from 'vue'

const request = Vue.axios

// 登录
export const login = data => request.post('/login', data)
