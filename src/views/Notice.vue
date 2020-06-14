<template>
  <div class="notice-container">
    <el-table
      v-if="!$route.query.nid"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="title" label="标题" width="200">
        <template slot-scope="scope">
          <router-link :to="'/notice?nid=' + scope.row.Nid">
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="Aname"
        label="发布人"
        width="200"
      ></el-table-column>
      <el-table-column label="日期" width="150">
        <template v-slot="{ row }">{{ row.time | formatDate }}</template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>
    <el-card v-else>
      <el-page-header @back="goBack" content="详情页面"></el-page-header>
      <el-form label-position="right" label-width="80px">
        <el-form-item></el-form-item>
        <el-form-item label="标  题">
          <el-input readonly v-model="activeNotice.title"></el-input>
        </el-form-item>
        <el-form-item label="作  者">
          <el-input readonly v-model="activeNotice.Aname"></el-input>
        </el-form-item>
        <el-form-item label="日  期">
          <el-input readonly v-model="activeNotice.time"></el-input>
        </el-form-item>
        <el-form-item label="内  容">
          <el-input
            readonly
            type="textarea"
            :autosize="{ minRows: 10 }"
            v-model="activeNotice.content"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { findAllNotice, findOneNotice } from '@/api'
export default {
  data() {
    return {
      // 所有公告
      tableData: [],
      // 单个公告信息
      activeNotice: {}
    }
  },
  methods: {
    async getNotice(nid) {
      if (typeof nid !== 'undefined' || !isNaN(Number.parseInt(nid))) {
        const res = await findOneNotice(nid)
        if (res.code === 1) {
          this.activeNotice = res.data
          this.activeNotice.time = this.$day(this.activeNotice.time).format(
            'YYYY-MM-DD'
          )
        }
      } else {
        const res = await findAllNotice()
        if (res.code === 1) {
          this.tableData = res.data
        }
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    if (this.$route.query.nid) {
      this.activeNotice.nid = this.$route.query.nid
    }
    this.getNotice(this.$route.query.nid)
  },
  watch: {
    $route: function(route) {
      this.getNotice(route.query.nid)
    }
  }
}
</script>

<style lang="less" scoped>
.notice-container {
  .content {
    width: 100%;
  }
}
</style>
