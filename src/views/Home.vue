<template>
  <div class="home">
    <div class="title">欢迎进入专升本报名系统</div>
    <div v-if="role === 'student'">
      <el-steps :active="activeStep">
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
import { process } from '@/api'
export default {
  name: 'Home',
  data() {
    return {
      role: 'student',
      activeStep: 0,
      userSteps: {
        apply: 0,
        pay: 0,
        check: 0,
        addgrade: 0,
        offer: 0
      },
      steps: [
        {
          name: 'apply',
          step: 0,
          title: '报名申请',
          icon: 'el-icon-edit',
          url: '/apply'
        },
        {
          name: 'pay',
          step: 1,
          title: '缴费状态',
          icon: 'el-icon-wallet',
          url: ''
        },
        {
          name: 'check',
          step: 2,
          title: '审核状态',
          icon: 'el-icon-document-copy',
          url: ''
        },
        {
          name: 'addgrade',
          step: 3,
          title: '查询成绩',
          icon: 'el-icon-s-opportunity',
          url: '/score'
        },
        {
          name: 'offer',
          step: 4,
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
    },
    async checkProcess() {
      const res = await process()
      if (res.code === 1) {
        this.$store.commit('SET_PROCESS', res.data)
        this.userSteps = res.data
      }
      let activeStep = this.steps.length
      for (const item of this.steps) {
        if (this.userSteps[item.name] === 0 && item.step <= activeStep) {
          activeStep = item.step
        }
      }
      this.activeStep = activeStep
    }
  },
  mounted() {
    this.role = this.$store.state.user.role
    this.checkProcess()
  },
  watch: {
    activeStep: function() {
      for (const item of this.steps) {
        if (item.step !== this.activeStep) {
          item.url = ''
        }
      }
    }
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
