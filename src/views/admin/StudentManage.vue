<template>
  <div>
    <div v-if="pageType === 'edit'">
      <el-page-header
        v-if="pageType"
        @back="() => this.$router.replace('/admin/student')"
        content="编辑页面"
      ></el-page-header>
      <el-form
        label-position="right"
        label-width="100px"
        :model="activeStuInfo"
      >
        <el-form-item></el-form-item>
        <el-form-item hidden>
          <el-input v-model="activeStuInfo.Sid" name="Sid" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="activeStuInfo.Sname" name="Sname" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="activeStuInfo.Spwd" name="Spwd" />
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="activeStuInfo.Sbirth" name="Sbirth" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="activeStuInfo.Sidcard" name="Sidcard" />
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="activeStuInfo.Spolitics" name="Spolitics" />
        </el-form-item>
        <el-form-item label="原学校">
          <el-input v-model="activeStuInfo.Sschool" name="Sschool" />
        </el-form-item>
        <el-form-item label="报考专业">
          <el-input v-model="activeStuInfo.Smajor" name="Smajor" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="activeStuInfo.Sphone" name="Sphone" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="info" v-else-if="pageType === 'info'">
      <el-page-header
        v-if="pageType"
        @back="() => this.$router.replace('/admin/student')"
        content="详情页面"
      ></el-page-header>
      <h4>考生信息详情</h4>
      <el-row
        :gutter="12"
        v-for="(info, key) in activeStuInfo"
        :key="key"
        class="row-container"
      >
        <el-col :span="3" class="title">{{ key | format }}</el-col>
        <el-col :span="6" class="content" v-if="key !== 'Major'">{{
          info
        }}</el-col>
        <el-col :span="6" class="content" v-else-if="key === 'Major'">
          <span>{{ info.mname }}</span>
          <span>({{ info.cids }})</span>
        </el-col>
      </el-row>
    </div>

    <div v-else>
      <r-table :url="tableopt.url" :labels="tableopt.labels" ref="rtable">
        <template v-slot:control="{ row }">
          <el-button
            icon="el-icon-info"
            size="mini"
            plain
            @click="handleInfo(row)"
          ></el-button>
          <el-button
            icon="el-icon-edit"
            type="warning"
            plain
            size="mini"
            @click="handleEdit(row)"
          ></el-button>

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
      </r-table>
    </div>
  </div>
</template>

<script>
import { getStudentInfoApi, putSutdentInfoApi, deleteStuentApi } from '@/api'
export default {
  mounted() {
    const type = this.$route.query.type
    if (type) {
      this.pageType = type
    }
  },
  data() {
    return {
      /**
       * 空值为默认页面
       * info 考生信息详情
       * edit 编辑考生信息
       */
      pageType: '',
      tableopt: {
        url: '/admin/student/',
        labels: [
          { prop: 'Sid', label: 'sid' },
          { prop: 'Sname', label: '姓名', width: '100' },
          { prop: 'Sphone', label: '电话' },
          { prop: 'Major.mname', label: '报考专业' },
          { prop: 'Sschool', label: '原学校' },
          { slot: 'control', label: '操作', width: '180' }
        ]
      },
      activeStuInfo: {
        Sid: 202001,
        Sname: '李四',
        Sbirth: '2016-07-18',
        Sidcard: '430121199712055914',
        Spolitics: '团员',
        Sschool: '武汉城市学院',
        Smajor: '计算机网络技术',
        Sphone: '13245678901'
      }
    }
  },
  methods: {
    handleInfo(row) {
      this.$router.push(`/admin/student?type=info&sid=${row.Sid}`)
    },
    handleEdit(row) {
      this.$router.push(`/admin/student?type=edit&sid=${row.Sid}`)
    },
    async handleDelete(row) {
      console.log(row)
      const res = await deleteStuentApi(row.Sid)
      if (res.code === 1) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },
    async handleSubmit() {
      const res = await putSutdentInfoApi(this.activeStuInfo)
      if (res.code === 1) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.replace('/admin/student')
      }
    }
  },
  watch: {
    $route: async function(route) {
      this.pageType = route.query.type
      const sid = route.query.sid || 0
      if (sid === 0) {
        this.$router.back()
      } else {
        // TODO 请求接口，获取详情数据
        const info = await getStudentInfoApi(sid)
        this.activeStuInfo = info.data
      }
    }
  },
  filters: {
    format(val) {
      const data = {
        Sid: 'SID',
        Sname: '姓名',
        Spwd: '密码',
        Sbirth: '生日',
        Sidcard: '身份证号',
        Spolitics: '政治面貌',
        Sschool: '原学校',
        Smajor: '专业ID',
        Major: '专业名称',
        Sphone: '电话'
      }
      return data[val]
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  h4 {
    padding-left: 20px;
    font-size: 20px;
  }
  .row-container {
    padding-left: 20px;

    .title {
      padding: 10px 0;
      font-size: 16px;
    }
    .content {
      padding: 10px 0;
      font-size: 16px;
    }
  }
}
</style>
