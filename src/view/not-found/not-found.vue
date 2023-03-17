<template>
  <div class="not-found">
    <h1 class="error">404-Not-Found</h1>
    <router-link to="/login">去登录</router-link>
  </div>
</template>
<script setup></script>
<style lang="less">
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(16px 16px 20px blue);
}
a {
  text-decoration: none;
  position: absolute;
  font-size: 20px;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(16px 16px 20px blue);
}
</style>
