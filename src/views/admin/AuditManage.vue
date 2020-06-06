<template>
  <div>
    <el-table :data="willAuditData">
      <el-table-column prop="sid" label="sid"></el-table-column>
      <el-table-column prop="sname" label="姓名"></el-table-column>
      <el-table-column prop="sidcard" label="身份证号码"></el-table-column>
      <el-table-column prop="sphone" label="电话号码"></el-table-column>
      <el-table-column prop="payState" label="缴费状态"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="primary" size="mini" @click="handlePass(row)"
            >通过</el-button
          >
          <el-button type="danger" size="mini" @click="handleReject(row)"
            >拒绝通过</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      willAuditData: [
        {
          sid: 202001,
          sname: '李四',
          sbirth: '2016-07-18',
          sidcard: '430121199712055914',
          spolitics: '团员',
          sschool: '武汉城市学院',
          smajor: '计算机网络技术',
          smid: 3001,
          sphone: '13245678901',
          payState: 1
        }
      ]
    }
  },
  methods: {
    handlePass(row) {
      console.log('通过' + row)
    },
    handleReject(row) {
      console.log('不通过' + row)
    }
  }
}
</script>

<style lang="less" scoped></style>
