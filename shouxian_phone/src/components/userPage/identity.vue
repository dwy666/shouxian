<template>
  <div id="identity">
    <div class="idcard">
      <p>请上传身份证人像面照片</p>
      <div class="idImg" style="margin-bottom:4px" @click="wxUpload('front')">
        <img :src="identityFrontCard" alt />
      </div>
    </div>
    <div class="idcard">
      <p>请上传身份证国徽面照片</p>
      <div class="idImg" @click="wxUpload('back')">
        <img :src="identityBackCard" alt />
      </div>
    </div>
    <van-cell-group>
      <van-cell title="姓名" :value="name" />
      <van-cell title="身份证号" :value="idcard" />
    </van-cell-group>
    <div v-if="isIdentify == 1" class="identifyBtn" @click="certification" :style="{background:name&&idcard&&isCard?'#F29716':''}">提交认证</div>
  </div>
</template>
<script>
  import ajax from "../../libs/ajax";
  import wxSDK from "../../libs/wx-sdk";
  export default {
    data() {
      return {
        identityFrontCard: require("../../assets/identity_card.png"),
        identityBackCard: require("../../assets/identity_card.png"),
        right: require("../../assets/right.png"),
        error: require("../../assets/error.png"),
        name: "",
        idcard: "",
        isCard: false,
        isIdentify: -1
      };
    },
    mounted() {
      this.isIdentify = this.$route.query.userStatus;
      if (this.isIdentify == 2) {
        this.queryCardImage();
      }
    },
    methods: {
      async wxUpload(type) {
        if (this.isIdentify == "1") {
          var postData = await wxSDK.wxUpload();
          var result = await ajax.uploadWeChatImg(postData);
          if (result.code == "000000") {
            var imgResult = await ajax.idcard(result.data.img, type);
            if (imgResult.code == "000000") {
              if (type == "front") {
                this.identityFrontCard = result.data.img;
                this.name = imgResult.data.name;
                this.idcard = imgResult.data.idCard;
              } else {
                this.isCard = true;
                this.identityBackCard = result.data.img;
              }
            } else {
              this.$toast({
                message: "身份证照片未识别",
                icon: this.error
              });
            }
          } else {
            this.$toast({
              message: result.mesg,
              icon: this.error
            });
          }
        }
      },
      async certification() {
        if (this.isIdentify == "1") {
          if (this.name && this.idcard && this.isCard) {
            var result = await ajax.uploadCardImage(
              this.identityFrontCard,
              this.identityBackCard,
              this.name,
              this.idcard
            );
            if (result.code == "000000") {
              this.isIdentify = 2;
              this.$toast({
                message: "认证成功",
                icon: this.right
              });
            } else {
              this.$toast({
                message: result.mesg,
                icon: this.error
              });
            }
          }
        }
      },
      async queryCardImage() {
        var result = await ajax.queryCardImage();
        if (result.code == "000000") {
          var frontResult = await ajax.idcard(result.data.faceImage, "front");
          if (frontResult.code == "000000") {
            this.identityFrontCard = result.data.faceImage;
            this.name = frontResult.data.name;
            this.idcard = frontResult.data.idCard;
          } else {
            this.$toast({
              message: "身份证照片未识别",
              icon: this.error
            });
          }
          var backResult = await ajax.idcard(result.data.nationImage, "back");
          if (backResult.code == "000000") {
            this.identityBackCard = result.data.nationImage;
          } else {
            this.$toast({
              message: "身份证照片未识别",
              icon: this.error
            });
          }
        } else {
          this.$toast({
            message: result.mesg,
            icon: this.error
          });
        }
      }
    }
  };
</script>

<style scoped>
.idcard {
  padding: 0px 58px;
}
.idcard p {
  text-align: left;
  font-size: 15px;
  color: #7a7a7a;
  height: 21px;
  margin: 13px 0 12px;
}
.idImg {
  width: 258px;
  height: 166px;
}
.idImg img {
  width: 100%;
  height: 100%;
}
.van-cell-group {
  margin: 0 23px;
}
.van-cell {
  height: 82px;
  line-height: 82px;
}
.van-cell__title {
  text-align: left;
  color: #2e2f34;
  font-size: 16px;
  font-weight: 500;
}
.van-cell__value {
  color: #4f5254;
  font-size: 16px;
  width: 170px;
}
.identifyBtn {
  color: white;
  width: 295px;
  height: 44px;
  background: #c1cbd7;
  border-radius: 4px;
  line-height: 44px;
  font-size: 16px;
  margin: 58px auto 10px;
}
</style>