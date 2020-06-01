import Vue from "vue";

const request = Vue.axios;

// 登录
export function login(data) {
  return request.get("/login", {
    method: "post",
    data: data
  });
}
