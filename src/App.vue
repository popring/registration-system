<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style></style>
