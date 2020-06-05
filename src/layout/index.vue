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
import { ttoken } from '@/api'
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar
  },
  async created() {
    const res = await ttoken()
    if (res.code === -1) {
      this.$router.push('/login')
    }
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
