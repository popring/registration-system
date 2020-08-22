<template>
  <div>
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      v-loading="listLoading"
      :data="tableData.rows"
      :stripe="true"
    >
      <el-table-column
        v-for="(label, index) of labels"
        :key="label.prop || index"
        :type="label.type"
        :prop="label.prop"
        :label="label.label"
        :formatter="label.formatter"
        :width="label.width"
        :show-overflow-tooltip="label.showOverflowTooltip"
      >
        <slot v-if="label.slot" :name="label.slot"></slot>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.count"
      :page-size="params.limit"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { getListApi } from '@/api'
export default {
  name: 'RTable',
  props: {
    labels: Array,
    url: String
  },
  data() {
    return {
      listLoading: false,
      params: {
        limit: 4,
        offset: 0
      },
      tableData: {}
    }
  },
  mounted() {
    const url = this.url
    if (typeof url === 'string' && url.length > 0) this.getList(this.params)
  },
  methods: {
    async getList(params) {
      this.listLoading = true
      const data = await getListApi({
        url: this.url,
        params: params
      })
      if (data.code != 1) {
        this.$message.error(data.message)
      }
      this.tableData = data.tableData
      this.listLoading = false
      return this.tableData
    },
    reload() {
      return this.getList(this.params)
    },
    handleCurrentChange(currentPage) {
      let offset = (currentPage - 1) * this.params.limit
      if (offset < 0) offset = 0
      this.params.offset = offset
      this.getList(this.params)
    }
  }
}
</script>

<style lang="less" scoped></style>
