<template>
  <div class="page-container">
    <el-row>
      <el-col :sm="12">
        <div class="logo"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="login-container">
      <el-col :md="8" class="hidden-sm-only hidden-xs-only hidden-md-only">
        <div class="motto"></div>
      </el-col>
      <el-col class="hidden-sm-and-down" :md="2"></el-col>
      <el-col :xs="20" :sm="20" :md="20" :lg="7">
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
                <span class="login">
                  已有账号?
                  <a :href="href">点我登录</a>
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
  background: url(../assets/login-bg.png) no-repeat;
  background-size: cover;
  padding: 50px 0 0;
  box-sizing: border-box;

  .logo {
    // width: 400px;
    height: 100px;
    background: url(../assets/logo-college.png) no-repeat center;
  }

  .login-container {
    padding: 80px 0 0;

    .motto {
      width: 100%;
      height: 600px;
      background: url(../assets/motto.png) no-repeat;
      background-size: 100%;
      transform: scale(1.3);
    }
  }

  .login-card {
    position: relative;
    box-sizing: border-box;

    .login-form {
      .title-container {
        margin: 0 0 40px 0;
        text-align: center;
        color: #304156;
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
