<template>
  <div>
    <el-tabs
      tab-position="right"
      style="padding: 0 50px;"
      :value="activeTabsValue"
      :before-leave="handleLeave"
    >
      <el-tab-pane label="输入信息" style="padding: 0 25px;">
        <div :style="{ margin: '10px 0' }">
          <el-alert
            title="请输入完整的信息，提交审核"
            type="info"
            effect="dark"
            show-icon
            center
          ></el-alert>
        </div>
        <el-card>
          <el-form
            :model="applyForm"
            ref="applyForm"
            :rules="rules"
            label-position="right"
            label-width="100px"
            @submit.native.prevent="handleSubmit('applyForm')"
          >
            <el-form-item label="Sid" hidden>
              <el-input v-model="applyForm.Sid"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="Sname">
              <el-input v-model="applyForm.Sname"></el-input>
            </el-form-item>
            <el-form-item label="生日日期" prop="Sbirth">
              <el-date-picker
                v-model="applyForm.Sbirth"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                :picker-options="{
                  disabledDate: time => time.getTime() > Date.now()
                }"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="政治面貌" prop="Spolitics">
              <el-input v-model="applyForm.Spolitics"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="Sidcard">
              <el-input v-model="applyForm.Sidcard"></el-input>
            </el-form-item>
            <el-form-item label="所在学校" prop="Sschool">
              <el-input v-model="applyForm.Sschool"></el-input>
            </el-form-item>
            <el-form-item label="专业编号" prop="Smajor">
              <el-select
                v-model="applyForm.Smajor"
                placeholder="请选择"
                style="width: 100%;"
                @change="switchMajor"
              >
                <el-option
                  v-for="item of majorList"
                  :key="item.value"
                  :label="item.mname + ' ' + item.mid"
                  :value="item.mid"
                ></el-option>
              </el-select>
              <el-row class="major-course">
                <el-tag type="warning" v-show="activeMajors"
                  >考试科目编号</el-tag
                >
                <el-tag v-for="item of activeMajors" :key="item">
                  {{ item }}
                </el-tag>
              </el-row>
            </el-form-item>
            <el-form-item label="手机号码" prop="Sphone">
              <el-input v-model="applyForm.Sphone" readonly></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="缴费">
        <div :style="{ margin: '10px 0' }">
          <el-alert
            title="请转帐后，点已缴费按钮进入下一步"
            type="info"
            effect="dark"
            show-icon
            center
          ></el-alert>
          <div class="qrcode-container">
            <img class="qrcode" src="@/assets/qrcode_github.jpg" />
            <br />
            <br />
            <el-button type="primary" plain @click="handlePay"
              >已缴费</el-button
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审核">
        <el-alert
          v-if="process.check === 0"
          title="审核中（学会等待，不是盲目似的无的放矢，那是一种追求的执著与无悔。）"
          type="warning"
          effect="dark"
          show-icon
        ></el-alert>
        <el-alert
          v-else-if="process.check === 1"
          title="审核通过，等待考试"
          type="success"
          effect="dark"
          show-icon
        ></el-alert>
        <el-alert
          v-else-if="process.check === 2"
          title="审核不通过，请联系管理员"
          type="error"
          effect="dark"
          show-icon
        ></el-alert>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { submitApply, payMoney, getAllMajor } from '@/api'
export default {
  data() {
    return {
      activeTabsValue: '0',
      rules: {
        Sname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        Sbirth: [
          { required: true, message: '请输入选择日期', trigger: 'blur' }
        ],
        Spolitics: [
          { required: true, message: '请输入政治面貌', trigger: 'blur' }
        ],
        Sidcard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          {
            min: 18,
            max: 18,
            message: '请输入完整的身份证号码',
            trigger: 'blur'
          }
        ],
        Sschool: [
          { required: true, message: '请输入所在学校', trigger: 'blur' }
        ],
        Smajor: [
          { required: true, message: '请输入报考专业', trigger: 'change' }
        ],
        Sphone: [
          { required: true, message: '手机号码不能为空', trigger: 'change' }
        ]
      },
      applyForm: {
        Sid: this.$store.state.user.id,
        Sname: '',
        Sbirth: '',
        Spolitics: '',
        Sidcard: '',
        Sschool: '',
        Smajor: null,
        Sphone: this.$store.state.user.phone
      },
      majorList: [],
      // 报名进度
      process: {
        apply: 0,
        pay: 0,
        check: 0,
        addgrade: 0,
        offer: 0
      },
      activeMajors: null
    }
  },
  created() {},
  mounted() {
    this.checkProgress()
    this.getMajorList()
  },
  methods: {
    handleSubmit(form) {
      this.$refs[form].validate(async valid => {
        if (!valid) {
          this.$message.error('信息不完整，请检查')
          return false
        } else {
          // 校验通过后进行数据发送
          const res = await submitApply(this.applyForm)
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '信息提交成功，请点击，缴费菜单，进入下一步'
            })
            this.$store.dispatch('GET_PROCESS')
          }
        }
      })
    },
    async handlePay() {
      const res = await payMoney()
      if (res.code === 1) {
        this.$message({
          type: 'success',
          message: '信息提交成功，等待管理员审核'
        })
        this.$store.dispatch('GET_PROCESS')
      }
    },
    checkProgress() {
      this.process = this.$store.state.user.process
        ? this.$store.state.user.process
        : this.process
      const status = this.process
      if (status && status.apply === 0) {
        this.activeTabsValue = '0'
      } else if (status.pay === 0) {
        this.activeTabsValue = '1'
      } else if (
        status.check === 0 ||
        status.check === 1 ||
        status.check === 2
      ) {
        this.activeTabsValue = '2'
      } else {
        this.$message('当前操作尚未开启')
        this.$router.go(-1)
      }
      return this.activeTabsValue
    },
    handleLeave(activeName) {
      // prod
      // return false
      this.$store.dispatch('GET_PROCESS')
      const index = this.checkProgress()
      console.log(activeName, index)
      if (activeName !== index) {
        this.$message({
          message: '不可以随意切换菜单',
          type: 'warning'
        })
        return false
      }
      return true
    },
    async getMajorList() {
      const res = await getAllMajor()
      if (res.code === 1) {
        this.majorList = res.data
      }
    },
    switchMajor(major) {
      for (const item of this.majorList) {
        if (item.mid === major) {
          this.activeMajors = item.cids
          break
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.qrcode-container {
  text-align: center;
  .qrcode {
    width: 300px;
  }
}

.major-course {
  .el-tag {
    margin-left: 10px;
    transition: all 0.5s;
  }
}
</style>
