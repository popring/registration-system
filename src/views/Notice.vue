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
          <router-link :to="'/notice?nid=' + scope.row.aid">{{
            scope.row.title
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="author"
        label="发布人"
        width="200"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>
    <el-card v-else>
      <el-page-header @back="goBack" content="详情页面"></el-page-header>
      <el-form label-position="right" label-width="80px">
        <el-form-item> </el-form-item>
        <el-form-item label="标  题">
          <el-input readonly v-model="activeNotice.title"></el-input>
        </el-form-item>
        <el-form-item label="作  者">
          <el-input readonly v-model="activeNotice.author"></el-input>
        </el-form-item>
        <el-form-item label="日  期">
          <el-input readonly v-model="activeNotice.date"></el-input>
        </el-form-item>
        <el-form-item label="标  题">
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
export default {
  data() {
    return {
      tableData: [
        {
          aid: 1,
          date: '2016-05-02',
          title: `2019专升本考试报名通知`,
          author: '管理员',
          content: `2019年6月22日举行，现将报名有关事项通知如下：

            一、报名对象

            1、专科应届毕业生

            2019年湖北省普通高校普通全日制高职高专应届毕业生，包括普通本科院

            校、独立设置的高职高专院校、独立学院以及成人高校举办的普通全日制高职高专应届毕业生。
            2019年6月22日举行，现将报名有关事项通知如下：

            一、报名对象

            1、专科应届毕业生

            2019年湖北省普通高校普通全日制高职高专应届毕业生，包括普通本科院

            校、独立设置的高职高专院校、独立学院以及成人高校举办的普通全日制高职高专应届毕业生。
            `
        }
      ],
      activeNotice: {}
    }
  },
  methods: {
    getNotice() {
      this.activeNotice = this.tableData[0]
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    if (this.$route.query.nid) {
      this.activeNotice.nid = this.$route.query.nid
    }
    this.getNotice()
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
