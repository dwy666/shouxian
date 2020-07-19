<template>
  <div id="center">
    <van-cell-group>
      <van-cell class="userImg" title="头像">
        <template #right-icon>
          <img :src="userImage" alt />
        </template>
      </van-cell>
      <van-cell title="姓名" :value="userName" />
      <van-cell
        v-if="userStatus!=3"
        class="identity"
        :class="{noidentify:userStatus == 3}"
        title="身份认证"
        :value="userStatus ==0?'认证失效':userStatus == 1?'去认证':'查看认证' "
        :is-link="userStatus != 0?true:false"
        @click="identify"
      />
      <van-cell title="账号名称" :value="name" />
    </van-cell-group>
  </div>
</template>
<script>
  import ajax from "../../libs/ajax";
  export default {
    data() {
      return {
        userName: "",
        telphone: "",
        userImage: "",
        userCard: "",
        userStatus: -1,
        name: "",
        error: require("../../assets/error.png")
      };
    },
    mounted() {
      this.info();
    },
    methods: {
      async info() {
        var result = await ajax.info();
        if (result.code == "000000") {
          this.userName = result.data.userName;
          this.telphone = result.data.telphone;
          this.userImage = result.data.userImage;
          this.userCard = result.data.userCard;
          this.userStatus = result.data.userStatus;
          this.name = result.data.name;
        } else {
          this.$toast({
            message: result.mesg,
            icon: this.error
          });
        }
      },
      identify() {
        if (this.userStatus == 1 || this.userStatus == 2)
          this.$router.push({
            name: "identity",
            query: { userStatus: this.userStatus }
          });
      }
    }
  };
</script>
<style lang="">
#center {
  padding: 0 23px;
}
.van-cell {
  color: #2e2f34;
  font-size: 16px;
  font-weight: 600;
  padding: 0;
  height: 82px;
}
.userImg {
  height: 104px;
}
.van-cell__title {
  text-align: left;
  line-height: 82px;
}
.van-cell__value {
  line-height: 82px;
  color: #4f5254;
  font-weight: 400;
}
.van-cell::after {
  left: 0;
  right: 0;
}
.userImg .van-cell__title {
  line-height: 104px;
}
.userImg img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: inline-block;
  margin-top: 20px;
}
.van-cell__right-icon {
  line-height: 82px;
  color: #f29716;
}
.identity .van-cell__value {
  color: #f29716;
}
.noidentify .van-cell__value {
  color: #7d8184;
}
</style>