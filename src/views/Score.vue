<template>
  <div class="score-container">
    <el-card>
      <h3 style="text-align: center; font-size: 20px;">考试成绩</h3>
      <el-row :gutter="24" type="flex" justify="center">
        <el-col
          v-for="score of scores"
          :key="score.cname"
          :span="6"
          class="score"
        >
          <el-progress
            type="circle"
            :percentage="Number.parseInt((score.grade / score.callgrade) * 100)"
            :color="colors"
          ></el-progress>
          <p class="course-name">{{ score.cname }}</p>
          <p class="course-name">{{ score.grade + '分' }}</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { queryScore } from '@/api'
export default {
  data() {
    return {
      pscore: this.$store.state.user.process.addgrade,
      scores: [],
      colors: [
        { color: '#f56c6c', percentage: 59 },
        { color: '#5cb87a', percentage: 75 },
        { color: '#6f7ad3', percentage: 90 }
      ]
    }
  },
  methods: {
    async getScore() {
      const res = await queryScore()
      if (res.code === 1) {
        this.scores = res.data
        const grade = this.scores.reduce(
          (prev, current) => prev + current.grade,
          0
        )
        const callgrade = this.scores.reduce(
          (prev, current) => prev + current.callgrade,
          0
        )
        this.scores.push({
          cname: '总分',
          grade,
          callgrade
        })
      }
    }
  },
  mounted() {
    if (this.pscore === 0) {
      this.$message('敬请等待分数查询通知')
      this.$router.go(-1)
    } else {
      this.getScore()
    }
  },
  created() {
    this.$store.dispatch('GET_PROCESS')
  }
}
</script>

<style lang="less" scoped>
.score-container {
  .score {
    text-align: center;
  }
  .course-name {
    text-align: center;
  }
}
</style>
