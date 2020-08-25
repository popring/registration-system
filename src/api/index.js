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

// 分数查询
export const queryScore = () => request.get('/stu/score')

// 提交个人信息
export const submitApply = data => request.post('/stu/apply', data)

// 缴费
export const payMoney = () => request.get('/stu/pay')

// 获取所有专业信息
export const getAllMajor = () => request.get('/stu/major')

// 注册
export const signUpapi = data => request.post('/signup', data)

// 表格请求
export const getListApi = opt =>
  request.get(opt.url, {
    params: opt.params
  })

// 审核通过/不通过
export const auditApi = (sid, check = 2) =>
  request.put(`/admin/audit/`, { Sid: sid, check: check })

// 添加公告
export const createNoticeApi = data => request.post('/admin/notice', data)

// 删除公告
export const deleteNoticeApi = nid => request.delete(`/admin/notice/${nid}`)
