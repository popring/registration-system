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
            :percentage="Number.parseInt((score.grade / score.total) * 100)"
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
      scores: [
        {
          cname: '数据结构',
          grade: 50,
          total: 100
        },
        {
          cname: 'C语言',
          grade: 75,
          total: 100
        },
        {
          cname: '英语',
          grade: 91,
          total: 100
        },
        {
          cname: '总分',
          grade: 216,
          total: 300
        }
      ],
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
        const total = this.scores.reduce(
          (prev, current) => prev + current.total,
          0
        )
        this.scores.push({
          cname: '总分',
          grade,
          total
        })
      }
    }
  },
  mounted() {
    this.getScore()
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
