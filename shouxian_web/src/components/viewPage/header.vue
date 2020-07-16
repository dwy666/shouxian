<template>
  <div class="header">
    <div class="userDiv">
      <img :src="avatarIcon" alt />
      <span>jhjk</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        avatarIcon:require('../../assets/jx_avatar.png')
      };
    }
  };
</script>
<style scoped>
.header {
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.userDiv {
  float: right;
  margin: 15px 32px 5px 0;
}
img {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 8px;
}

</style>