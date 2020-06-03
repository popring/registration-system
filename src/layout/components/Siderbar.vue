<template>
  <div class="sidebar-container">
    <el-scrollbar wrapClass="scrollbar-wrapper" viewClass="scrollbar-view">
      <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#009EFF"
        :router="true"
      >
        <el-menu-item index="/">
          <h2 class="title">专升本报名系统</h2>
        </el-menu-item>
        <el-menu-item
          v-for="route in routes"
          :key="route.path"
          :index="route.path"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ route.meta.title || '默认' }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [],
      activeMenu: ''
    }
  },
  methods: {},
  created() {
    const routes = this.$store.state.permission.routes
    this.routes = routes
    this.activeMenu = this.$route.path
  },
  watch: {
    // 根据路由变化，切换Siderbar
    $route: function(to) {
      this.activeMenu = to.path
    }
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
