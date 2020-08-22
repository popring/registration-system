<template>
  <div>
    <button @click="handleClick">refresh</button>
    <r-table :labels="tableopt.labels" :url="tableopt.url" ref="rtable">
      <template v-slot:control="{ row }">
        <el-button type="primary" size="mini" @click="handlePass(row)"
          >通过</el-button
        >
        <el-button type="danger" size="mini" @click="handleReject(row)"
          >拒绝通过</el-button
        >
      </template>
    </r-table>
  </div>
</template>

<script>
import { auditApi } from '@/api'

export default {
  data() {
    return {
      tableopt: {
        url: '/admin/audit',
        labels: [
          { prop: 'Sid' },
          { prop: 'Student.Sname', label: '姓名' },
          { prop: 'Student.Sidcard', label: '身份证' },
          { prop: 'Student.Sphone', label: '电话号码' },
          {
            prop: 'pay',
            label: '缴费状态',
            formatter: (row, column, cellValue) =>
              cellValue === 1 ? '已缴费' : '未缴费'
          },
          { slot: 'control', label: '操作', width: '200' }
        ]
      }
    }
  },
  methods: {
    async handlePass(row) {
      const res = await auditApi(row.Sid, 1)
      if (res.code === 1) {
        this.$message(`${row.Student.Sname} 审核通过`)
      } else {
        this.$message.error(res.message)
      }
      this.$refs.rtable.reload()
    },
    async handleReject(row) {
      const res = await auditApi(row.Sid, 2)
      if (res.code === 1) {
        this.$message(`${row.Student.Sname} 审核不通过`)
      } else {
        this.$message.error(res.message)
      }
      this.$refs.rtable.reload()
    },
    handleClick() {
      this.$refs.rtable.reload()
    }
  }
}
</script>

<style lang="less" scoped></style>
