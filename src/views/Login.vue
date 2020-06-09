<template>
  <div class="page-container">
    <div class="logo"></div>
    <el-row type="flex" justify="space-around">
      <el-col :md="8" class="hidden-sm-only hidden-xs-only hidden-md-only">
        <div class="motto"></div>
      </el-col>
      <el-col :xs="20" :sm="20" :md="20" :lg="6">
        <el-card class="login-card">
          <el-form class="login-form">
            <div class="title-container">
              <h3>专升本报名系统</h3>
            </div>
            <el-form-item>
              <el-input
                v-model="user.username"
                placeholder="用户名/手机号"
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
              <el-select
                v-model="user.role"
                placeholder="请选择角色"
                @change="handleSwitch"
                style="width: 100%;"
              >
                <el-option label="学生" value="student"></el-option>
                <el-option label="管理员" value="admin"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin" class="btn-login"
                >登录</el-button
              >
            </el-form-item>
            <el-form-item>
              <router-link to="/signup" v-slot="{ href }">
                <span class="signup">
                  没有账号?
                  <a :href="href">点我注册</a>
                </span>
              </router-link>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import { login } from '@/api/'
export default {
  data() {
    return {
      user: {
        username: '202001',
        userpwd: '123',
        role: 'student'
      }
    }
  },
  methods: {
    async handleLogin() {
      const res = await login({
        username: this.user.username,
        userpwd: this.user.userpwd,
        role: this.user.role
      })
      if (res.code === 1) {
        const token = res.token
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('userinfo', JSON.stringify(res.payload))
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: res.message
        })
      }
    },
    handleSwitch() {
      const role = this.user.role
      if (role === 'student') {
        this.user = {
          username: '202001',
          userpwd: '123',
          role: 'student'
        }
      } else if (role === 'admin') {
        this.user = {
          username: 'admin',
          userpwd: '123',
          role: 'admin'
        }
      }
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
  background: url(../assets/login-bg.png) no-repeat;
  background-size: cover;
  padding: 50px 0 0;
  box-sizing: border-box;

  .logo {
    width: 400px;
    height: 100px;
    background: url(../assets/logo-college.png) no-repeat;
  }

  .motto {
    // float: left;
    width: 100%;
    height: 600px;
    background: url(../assets/motto.png) no-repeat;
    background-size: 100%;
  }

  .login-card {
    // float: right;
    // transform: translate(-60%, 30%);
    position: relative;
    // width: 520px;
    box-sizing: border-box;

    .login-form {
      .title-container {
        margin: 0 0 40px 0;
        text-align: center;
        color: #304156;
      }

      .btn-login {
        display: block;
        width: 100%;
        background-color: #304156;
        border: none;
      }

      .signup {
        float: right;
        color: #afb5bd;
        a {
          color: #9399a2;
        }
      }
    }
  }
}
</style>
