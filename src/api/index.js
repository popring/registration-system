import Vue from 'vue'

const request = Vue.axios

// 登录
export const login = data => request.post('/login', data)

// 检验token是否有效
export const ttoken = () => request.post('/ttoken')

// 报名进度
export const process = () => request.get('/stu/process')

// 查看所有公告
export const findAllNotice = () => request.get('/stu/notice')

// 查看某一条公告
export const findOneNotice = nid => request.get(`/stu/notice/${nid}`)
