<template>
  <div class="app-wrapper">
    <Sidebar></Sidebar>
    <transition>
      <Main>
        <template v-slot:navbar>
          <Navbar />
        </template>
        <router-view></router-view>
      </Main>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Main from './components/main'
import Sidebar from './components/Siderbar'
export default {
  components: {
    Navbar,
    Main,
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
</style>
