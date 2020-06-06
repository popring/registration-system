<template>
  <div>
    <div v-if="!$route.query.type">
      <el-row :gutter="12">
        <el-col :span="4">
          <el-button type="primary" @click="addScore">添加成绩</el-button>
        </el-col>
      </el-row>
      <el-table :data="scoreData" stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="sid" label="SID"></el-table-column>
        <el-table-column prop="sname" label="姓名"></el-table-column>
        <el-table-column prop="mname" label="专业名称"></el-table-column>
        <el-table-column label="科目分数">
          <template v-slot="{ row }">
            <div>
              <p v-for="score of row.scores" :key="score.cid" ref>
                {{ score.cname }} {{ score.score }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="warning" plain size="mini" @click="editScore(row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else-if="$route.query.type === 'add'">
      <el-page-header
        @back="() => this.$router.go(-1)"
        content="添加考生成绩"
      />
      <el-form :model="addData" label-position="right" label-width="100px">
        <el-form-item></el-form-item>
        <el-form-item hidden>
          <el-input v-model="addData.sid" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="addData.sidcard" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addData.sname" readonly :disabled="!addData.sid" />
        </el-form-item>
        <el-form-item label="专业名称">
          <el-input v-model="addData.mname" readonly :disabled="!addData.sid" />
        </el-form-item>
        <el-form-item
          v-for="single of addData.scores"
          :key="single.cid"
          :label="single.cname"
        >
          <el-input v-model="single.score" :disabled="!addData.sid" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scoreData: [
        {
          sid: 202001,
          sname: '张三',
          mname: '计算机',
          sidcard: '430121199712055914',
          scores: [
            {
              cid: 1,
              cname: '高等数学',
              score: 80
            },
            {
              cid: 2,
              cname: '高等数学',
              score: 80
            },
            {
              cid: 3,
              cname: '高等数学',
              score: 80
            }
          ]
        }
      ],
      addData: {
        sid: 202001,
        sname: '张三',
        mname: '计算机',
        sidcard: '430121199712055914',
        scores: [
          {
            cid: 1,
            cname: '高等数学',
            score: 80
          },
          {
            cid: 2,
            cname: '高等数学',
            score: 80
          },
          {
            cid: 3,
            cname: '高等数学',
            score: 80
          }
        ]
      }
    }
  },
  methods: {
    handleClick(row) {
      console.log(row.scores)
    },
    editScore(row) {
      console.log(row)
    },
    addScore() {
      this.$router.push('/admin/score?type=add')
    }
  }
}
</script>

<style lang="less" scoped></style>
