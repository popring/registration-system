<template>
  <div>
    <div v-if="!$route.query.type">
      <el-button @click="addNotice" type="primary">添加公告</el-button>
      <el-table :data="tableData">
        <el-table-column prop="aid"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column
          prop="content"
          label="日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="handleDelete(row)"
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
        </el-table-column>
      </el-table>
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
        <el-form-item label="作者">
          <el-input v-model="activeNotice.author" readonly />
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" rows="17" v-model="activeNotice.content" />
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
      activeNotice: {
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
    }
  },
  methods: {
    addNotice() {
      this.$router.push('/admin/notice?type=add')
    }
  }
}
</script>

<style lang="less" scoped></style>
