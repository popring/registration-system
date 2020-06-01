<template>
  <div class="page-container">
    <el-card class="login-card">
      <el-form class="login-form">
        <div class="title-container">
          <h3>专升本报名管理信息系统</h3>
        </div>
        <el-form-item>
          <el-input
            v-model="user.username"
            placeholder="账号"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="user.userpwd"
            show-password
            placeholder="密码"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClick">登录</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import { login } from '@/api/'
export default {
  data() {
    return {
      user: {
        username: 'admin',
        userpwd: 'root'
      }
    }
  },
  methods: {
    async handleClick() {
      // let res = await login({
      //   username: this.username,
      //   userpwd: this.userpwd
      // })
      // console.log(res)

      this.$router.push({ path: '/index' })
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  min-width: 100%;
  min-height: 100%;
  background-color: #000033;
  padding: 160px 0 0 0;
  box-sizing: border-box;
}
.login-card {
  position: relative;
  width: 520px;
  margin: 0 auto;
  box-sizing: border-box;

  .login-form {
    .title-container {
      margin: 0 0 40px 0;
      text-align: center;
    }
  }
}
</style>
