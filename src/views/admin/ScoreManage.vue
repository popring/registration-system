<template>
  <div>
    <div v-if="!$route.query.type">
      <el-row :gutter="12">
        <el-col :span="4">
          <el-button type="primary" @click="addScore">添加成绩</el-button>
        </el-col>
      </el-row>

      <r-table :url="tableopt.url" :labels="tableopt.labels">
        <template v-slot:control="{ row }">
          <el-button type="warning" size="mini" @click="editScore(row)"
            >修改</el-button
          >
        </template>
      </r-table>
    </div>
    <div
      v-else-if="$route.query.type === 'add' || $route.query.type === 'edit'"
    >
      <el-page-header @back="() => this.$router.go(-1)" :content="tabTitle" />
      <el-form :model="stuInfo" label-position="right" label-width="100px">
        <el-form-item></el-form-item>
        <el-form-item label="SID">
          <el-input v-model="stuInfo.Sid" @blur="getStuInfo" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="stuInfo.Sidcard" readonly />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="stuInfo.Sname" readonly :disabled="!stuInfo.Sid" />
        </el-form-item>
        <el-form-item label="专业名称">
          <el-input
            :value="stuInfo.Major && stuInfo.Major.mname"
            readonly
            :disabled="!stuInfo.Sid"
          />
        </el-form-item>
        <el-form-item
          v-for="single of couInfo"
          :key="single.cid"
          :label="single.cname"
        >
          <el-input
            v-model="single.score"
            :disabled="!single.cid"
            :placeholder="`满分${single.callgrade}`"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getStuAndCouInfoApi, putStuScoreApi, updateStuScoreApi } from '@/api'
export default {
  data() {
    return {
      tabTitle: '添加考生成绩',
      tableopt: {
        url: '/admin/score',
        labels: [
          { prop: 'Sid', label: 'SID' },
          { prop: 'Sname', label: '姓名' },
          { prop: 'Smajor', label: '专业编号' },
          { prop: 'total_score', label: '总分' },
          { slot: 'control', label: '操作' }
        ]
      },
      stuInfo: {},
      couInfo: []
    }
  },
  methods: {
    handleClick(row) {
      console.log(row.scores)
    },
    async editScore(row) {
      console.log(row)
      this.$router.push('/admin/score?type=edit')
      this.stuInfo.Sid = row.Sid
      await this.getStuInfo()
    },
    addScore() {
      this.$router.push('/admin/score?type=add')
    },
    // 获取学生详细信息
    async getStuInfo() {
      const sid = this.stuInfo.Sid
      if (!sid) return
      const res = await getStuAndCouInfoApi(sid, this.$route.query.type)
      if (res.code === 1) {
        this.stuInfo = res.data.stuInfo
        this.couInfo = res.data.couInfo
      } else {
        this.stuInfo = { Sid: sid }
        this.couInfo = []
      }
    },
    // 提交 添加/编辑 信息
    async handleSubmit() {
      let scores = this.couInfo.map(v => ({ cid: v.cid, score: v.score }))
      let data = { Sid: this.stuInfo.Sid, scores }
      const res =
        this.$route.query.type === 'add'
          ? await putStuScoreApi(data)
          : await updateStuScoreApi(data)
      if (res.code === 1) {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        if (this.$route.query.type === 'add') {
          this.stuInfo = {}
          this.couInfo = []
        } else {
          this.$router.go(-1)
        }
      }
    }
  },
  watch: {
    '$route.query.type': function(newType) {
      this.tabTitle = newType === 'add' ? '添加考生成绩' : '修改考生成绩'
      this.stuInfo = {}
      this.couInfo = []
    }
  }
}
</script>

<style lang="less" scoped></style>
