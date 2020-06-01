<template>
  <div class="main-container">
    <slot name="navbar"></slot>
    <section class="app-main">
      这是app-main
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.main-container {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  margin-left: 210px;

  .app-main {
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
