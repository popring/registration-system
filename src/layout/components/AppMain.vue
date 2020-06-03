<template>
  <section class="app-main">
    <router-view></router-view>
  </section>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.app-main {
  min-height: calc(100% - 50px);
  padding: 20px;
  box-sizing: border-box;
}
</style>
