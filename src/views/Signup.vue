<template>
  <div class="page-container">
    <div class="logo"></div>
    <div class="motto"></div>
    <el-card class="login-card">
      <el-form ref="signin" class="login-form" :model="user" :rules="rules">
        <div class="title-container">
          <h3>欢迎注册</h3>
        </div>
        <el-form-item required prop="sphone">
          <el-input
            v-model="user.sphone"
            placeholder="手机号"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item required prop="userpwd">
          <el-input
            v-model="user.userpwd"
            show-password
            placeholder="密码"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item prop="userpwdCheck">
          <el-input
            v-model="user.userpwdCheck"
            show-password
            placeholder="密码"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSignUp" class="btn-signup"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <router-link to="/login" v-slot="{ href }">
            <span class="login">已有账号?<a :href="href">点我登录</a></span>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { signUpapi } from '@/api/'
export default {
  data() {
    return {
      user: {
        sphone: '',
        userpwd: '',
        userpwdCheck: ''
      },
      rules: {
        sphone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            min: 11,
            max: 11,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          },
          { validator: this.validatorSphone, trigger: 'blur' }
        ],
        userpwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        userpwdCheck: [{ validator: this.validatorCheck, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSignUp() {
      this.$refs.signin.validate(async valid => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }

        const data = await signUpapi({
          sphone: this.user.sphone,
          userpwd: this.user.userpwd
        })
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: data.message
          })
          this.$router.push('/login')
        }
      })
    },
    validatorCheck(rule, value, callback) {
      if (value !== this.user.userpwd) {
        return callback(new Error('两次输入的密码不一样'))
      } else {
        callback()
      }
    },
    validatorSphone(rule, value, callback) {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('手机号有误，请检查'))
      } else {
        callback()
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
  background: url(../assets/login-bg.png);
  padding: 50px 0 0 50px;
  box-sizing: border-box;

  .logo {
    width: 400px;
    height: 100px;
    background: url(../assets/logo-college.png) no-repeat;
  }

  .motto {
    float: left;
    width: 300px;
    height: 300px;
    background: url(../assets/motto.png) no-repeat;
    background-size: contain;
    transform: scale(2.5) translate(50%, 30%);
  }

  .login-card {
    float: right;
    transform: translate(-60%, 30%);
    position: relative;
    width: 520px;
    margin: 0 auto;
    box-sizing: border-box;

    .login-form {
      .title-container {
        margin: 0 0 40px 0;
        text-align: center;
      }

      .btn-signup {
        display: block;
        width: 100%;
        background-color: #304156;
        border: none;
      }

      .login {
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
