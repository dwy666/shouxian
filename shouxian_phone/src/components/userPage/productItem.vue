<template>
  <div id="productId">
    <img :src="productImg" alt />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        productId: "",
        productImg: ""
      };
    },
    mounted() {
      this.productId = this.$route.query.productId;
      this.productImg = require(`../../assets/product/${this.productId}.jpg`);
    }
  };
</script>
<style scoped>
#productId {
  height: 100%;
  width: 100%;
}
#productId img {
  height: 100%;
  width: 100%;
}
</style>