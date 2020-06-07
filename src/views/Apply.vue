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
            label-position="right"
            label-width="100px"
            @submit.native.prevent="handleSubmit('applyForm')"
          >
            <el-form-item label="sid" hidden>
              <el-input v-model="applyForm.sid"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="applyForm.sname"></el-input>
            </el-form-item>
            <el-form-item label="生日日期">
              <el-date-picker
                v-model="applyForm.sbirth"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="政治面貌">
              <el-input v-model="applyForm.spolitics"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="applyForm.sidcard"></el-input>
            </el-form-item>
            <el-form-item label="所在学校">
              <el-input v-model="applyForm.sschool"></el-input>
            </el-form-item>
            <el-form-item label="专业编号">
              <el-select
                v-model="applyForm.smajor"
                placeholder="请选择"
                style="width: 100%;"
              >
                <el-option
                  v-for="item of majorList"
                  :key="item.value"
                  :label="item.mname + ' ' + item.mid"
                  :value="item.mid"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="applyForm.sphone" readonly></el-input>
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
            <el-image
              class="qrcode"
              src="https://github.com/popring/assets-repo/blob/master/img/qrcode_github.jpg?raw=true"
              fit="cover"
            />
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
          v-if="!$store.state.user.process.check"
          title="审核中（学会等待，不是盲目似的无的放矢，那是一种追求的执著与无悔。）"
          type="warning"
          effect="dark"
          show-icon
        ></el-alert>
        <el-alert
          v-else-if="$store.state.user.process.check === 1"
          title="审核通过，等待考试"
          type="success"
          effect="dark"
          show-icon
        ></el-alert>
        <el-alert
          v-else-if="$store.state.user.process.check === 2"
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
      activeTabsValue: this.$store.state.user.process,
      applyForm: {
        sid: this.$store.state.user.id,
        sname: '',
        sbirth: '',
        spolitics: '',
        sidcard: '',
        sschool: '',
        smajor: null,
        sphone: ''
      },
      majorList: []
    }
  },
  async created() {
    await this.$store.dispatch('GET_PROCESS')
    this.checkProgress()
    this.getMajorList()
  },
  methods: {
    async handleSubmit(form) {
      const res = await submitApply(form)
      if (res.code === 1) {
        this.$message({
          type: 'success',
          message: '信息提交成功，请点击，缴费菜单，进入下一步'
        })
        this.$store.dispatch('GET_PROCESS')
      }
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
      const status = this.$store.state.user.process
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
</style>
