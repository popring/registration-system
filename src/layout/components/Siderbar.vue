<template>
  <div class="sidebar-container">
    <el-scrollbar wrapClass="scrollbar-wrapper" viewClass="scrollbar-view">
      <el-menu
        default-active="2"
        @open="handleOpen"
        @close="handleClose"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#009EFF"
        :router="true"
      >
        <el-menu-item index="/">
          <span slot="title">
            <h2 class="title">专升本报名系统</h2>
          </span>
        </el-menu-item>
        <el-menu-item
          v-for="route in routes"
          :key="route.path"
          :index="route.path"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ route.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: []
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created() {
    const routes = this.$store.state.permission.routes
    this.routes = routes
  }
}
</script>

<style lang="less" scoped>
.title {
  line-height: 50px;
  text-align: center;
  color: #fff;
}
</style>
