<template>
  <div class="page-container">
    <el-card class="login-card">
      <el-form ref="signin" class="login-form" :model="user" :rules="rules">
        <div class="title-container">
          <h3>专升本报名管理信息系统 注册页面</h3>
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
          <el-button type="primary" @click="handleSignUp">注册</el-button>
          <el-button @click="() => this.$router.push('/login')">取消</el-button>
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
