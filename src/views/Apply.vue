<template>
  <div>
    <el-tabs
      tab-position="right"
      style="padding: 0 50px;"
      value="1"
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
            @submit.native.prevent="handleSubmit(applyForm)"
          >
            <el-form-item label="sid" hidden>
              <el-input v-model="applyForm.sid"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="applyForm.sname" readonly></el-input>
            </el-form-item>
            <el-form-item label="生日日期">
              <el-input v-model="applyForm.sbirth"></el-input>
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
              <el-input v-model="applyForm.smajor" type="number"></el-input>
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
            <el-button type="primary" plain>已缴费</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审核中">
        <el-alert
          title="审核中（学会等待，不是盲目似的无的放矢，那是一种追求的执著与无悔。）"
          type="success"
          effect="dark"
          show-icon
        ></el-alert>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applyForm: {
        sid: 202001,
        sname: '张三丰',
        sbirth: '2002-01-01',
        spolitics: '团员',
        sidcard: '441800198903289750',
        sschool: '武汉学院',
        smajor: '3001',
        sphone: '15935678909'
      }
    }
  },
  methods: {
    handleSubmit(form) {
      console.log(form)
    },
    handleLeave() {
      // prod
      // return false

      //   this.$message({
      //     message: '不可以随意切换菜单',
      //     type: 'warning'
      //   })
      return true
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
