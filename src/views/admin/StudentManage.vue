<template>
  <div>
    <div v-if="pageType === 'edit'">
      <el-page-header
        v-if="pageType"
        @back="() => this.$router.go(-1)"
        content="编辑页面"
      ></el-page-header>
      <el-form label-position="right" label-width="100px">
        <el-form-item></el-form-item>
        <el-form-item hidden>
          <el-input v-model="activeStuInfo.sid" name="sid" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="activeStuInfo.sname" name="sname" />
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="activeStuInfo.sbirth" name="sbirth" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="activeStuInfo.sidcard" name="sidcard" />
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="activeStuInfo.spolitics" name="spolitics" />
        </el-form-item>
        <el-form-item label="原学校">
          <el-input v-model="activeStuInfo.sschool" name="sschool" />
        </el-form-item>
        <el-form-item label="报考专业">
          <el-input v-model="activeStuInfo.smajor" name="smajor" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="activeStuInfo.sphone" name="sphone" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="info" v-else-if="pageType === 'info'">
      <el-page-header
        v-if="pageType"
        @back="() => this.$router.go(-1)"
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
        <el-col :span="6" class="content">{{ info }}</el-col>
      </el-row>
    </div>

    <div v-else>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="sid" label="sid" width="100px"></el-table-column>
        <el-table-column
          prop="sname"
          label="姓名"
          width="100px"
        ></el-table-column>
        <el-table-column prop="sphone" label="电话"></el-table-column>
        <el-table-column prop="smajor" label="报考专业"></el-table-column>
        <el-table-column prop="sschool" label="原学校"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              icon="el-icon-info"
              size="mini"
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
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
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
      tableData: [
        {
          sid: 202001,
          sname: '李四',
          spolitics: '团员',
          sschool: '武汉城市学院',
          smajor: '计算机网络技术',
          sphone: '13245678901'
        },
        {
          sid: 202001,
          sname: '李四',
          spolitics: '团员',
          sschool: '武汉城市学院',
          smajor: '计算机网络技术',
          sphone: '13245678901'
        },
        {
          sid: 202001,
          sname: '李四',
          spolitics: '团员',
          sschool: '武汉城市学院',
          smajor: '计算机网络技术',
          sphone: '13245678901'
        },
        {
          sid: 202001,
          sname: '李四',
          spolitics: '团员',
          sschool: '武汉城市学院',
          smajor: '计算机网络技术',
          sphone: '13245678901'
        },
        {
          sid: 202001,
          sname: '李四',
          spolitics: '团员',
          sschool: '武汉城市学院',
          smajor: '计算机网络技术',
          sphone: '13245678901'
        }
      ],
      activeStuInfo: {
        sid: 202001,
        sname: '李四',
        sbirth: '2016-07-18',
        sidcard: '430121199712055914',
        spolitics: '团员',
        sschool: '武汉城市学院',
        smajor: '计算机网络技术',
        sphone: '13245678901'
      }
    }
  },
  methods: {
    handleInfo(row) {
      this.$router.push(`/admin/student?type=info&sid=${row.sid}`)
    },
    handleEdit(row) {
      this.$router.push(`/admin/student?type=edit&sid=${row.sid}`)
    },
    handleDelete(row) {
      console.log('删除' + row)
    }
  },
  watch: {
    $route: function(route) {
      this.pageType = route.query.type

      // TODO 请求接口，获取详情数据
      // ...
    }
  },
  filters: {
    format(val) {
      const data = {
        sid: 'SID',
        sname: '姓名',
        sbirth: '生日',
        sidcard: '身份证号',
        spolitics: '政治面貌',
        sschool: '原学校',
        smajor: '报考专业',
        sphone: '电话'
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
