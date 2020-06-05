<template>
  <div class="home">
    <div class="title">欢迎进入专升本报名系统</div>
    <div v-if="role === 'student'">
      <el-steps :active="3">
        <el-step
          v-for="step of steps"
          :key="step.title"
          :title="step.title"
          :icon="step.icon"
          @click.native="handleClick(step.url)"
        ></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      role: 'student',
      steps: [
        {
          title: '报名申请',
          icon: 'el-icon-edit',
          url: '/apply'
        },
        {
          title: '缴费状态',
          icon: 'el-icon-wallet',
          url: ''
        },
        {
          title: '审核状态',
          icon: 'el-icon-document-copy',
          url: ''
        },
        {
          title: '查询成绩',
          icon: 'el-icon-s-opportunity',
          url: '/score'
        },
        {
          title: '录取结果',
          icon: 'el-icon-finished',
          url: '/offer'
        }
      ]
    }
  },
  methods: {
    handleClick(url) {
      this.$router.push(url)
      console.log(url)
    }
  },
  mounted() {
    this.role = this.$store.state.user.role
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .title {
    font-size: 26px;
    padding: 100px 0;
    text-align: center;
  }
}
</style>
