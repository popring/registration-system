<template>
  <div class="app-wrapper">
    <Sidebar></Sidebar>
    <div class="main-container">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
import Sidebar from './components/Siderbar'
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.main-container {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  margin-left: 210px;
}
</style>
