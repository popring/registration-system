<template>
  <div>
    <div v-if="!$route.query.type">
      <el-button @click="goCreateNoticePage" type="primary">添加公告</el-button>

      <r-table :url="tableopt.url" :labels="tableopt.labels">
        <template v-slot:control="{ row, column }">
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="handleDelete(row, column)"
          >
            <el-button
              style="margin-left: 10px;"
              slot="reference"
              icon="el-icon-delete-solid"
              type="danger"
              plain
              size="mini"
            ></el-button>
          </el-popconfirm>
        </template>
      </r-table>
    </div>

    <div v-else-if="$route.query.type === 'add'">
      <el-page-header
        @back="() => this.$router.go(-1)"
        content="添加公告"
      ></el-page-header>
      <el-form label-position="right" label-width="100px">
        <el-form-item />
        <el-form-item label="标题">
          <el-input v-model="activeNotice.title" />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="activeNotice.time"
            align="right"
            type="date"
            placeholder="选择日期"
            :clearable="false"
            :picker-options="{
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            }"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="activeNotice.author" readonly />
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" rows="17" v-model="activeNotice.content" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createNOtice">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { createNoticeApi, deleteNoticeApi } from '@/api'
export default {
  data() {
    return {
      activeNotice: {
        time: new Date(),
        title: `2019专升本考试报名通知`,
        author: this.$store.getters.user.username,
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
      },
      tableopt: {
        url: '/admin/notice',
        labels: [
          { type: 'index', label: '#' },
          { prop: 'time', label: '发布时间' },
          { prop: 'title', label: '公告标题' },
          { prop: 'Admin.Aname', label: '发布者', width: '100' },
          { prop: 'content', label: '公告内容', showOverflowTooltip: true },
          { slot: 'control', label: '操作' }
        ]
      }
    }
  },
  methods: {
    goCreateNoticePage() {
      this.$router.push('/admin/notice?type=add')
    },
    async createNOtice() {
      const res = await createNoticeApi(this.activeNotice)
      if (res.code === 1) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.push('/admin/notice')
      }
    },
    async handleDelete(row, column) {
      console.log('row :>> ', row)
      console.log('column :>> ', column)
      return 0
      // const res = await deleteNoticeApi(2)
      // if (res.code === 1) {
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功'
      //   })
      //   this.$router.push('/admin/notice')
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.el-date-editor.el-input.el-date-editor--date {
  width: 100%;
}
</style>
