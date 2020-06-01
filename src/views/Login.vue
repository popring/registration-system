<template>
  <div>
    <form>
      <input name="username" v-model="username" />
      <input name="userpwd" v-model="userpwd" />
      <input type="button" @click="handleClick" value="提交" />
    </form>
  </div>
</template>

<script>
import { login } from "@/api/";
export default {
  data() {
    return {
      username: "admin",
      userpwd: "root"
    };
  },
  methods: {
    async handleClick() {
      let res = await login({
        username: this.username,
        userpwd: this.userpwd
      });
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped></style>
