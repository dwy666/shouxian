<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-container {
  height: 100%;
}
.clearfix::after {
  height: 0;
  display: block;
  content: "";
  clear: both;
  visibility: hidden;
  overflow: hidden;
}
.el-message--success .el-message__content {
  color: white;
}
.el-message--success {
  height: 40px;
  padding: 0 16px;
  background: #000000;
  opacity: 0.5;
  min-width: auto;
  line-height: 40px;
}
</style>
