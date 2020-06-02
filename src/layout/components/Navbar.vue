<template>
  <nav class="nav-container">
    <div class="right-menu">
      <div class="right-menu-item">
        <el-avatar
          class="avtar"
          shape="square"
          :size="40"
          fit="fill"
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
        ></el-avatar>
        <span>管理员</span>
      </div>
      <div class="right-menu-item">
        <el-button
          type="danger"
          size="mini"
          :plain="true"
          icon="el-icon-s-promotion"
          >退出系统</el-button
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.nav-container {
  position: relative;
  height: 50px;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .right-menu {
    float: right;
    margin: 3px 20px;

    .right-menu-item {
      float: left;
      margin: 0 5px;
      line-height: 50px;

      .avtar {
        vertical-align: middle;
        border-radius: 10px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
        margin: 0 20px;
      }
    }
  }
}
</style>
