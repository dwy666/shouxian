<template>
  <div id="product" class="clearfix">
    <img class="banner" :src="banner" alt />
    <van-tabs v-model="active">
      <van-tab title="推荐">
        <div v-for="(item,index) in productList" :key="index" class="productItem" @click="lookItem(item.productId)">
          <img class="productImg" :src="item.productImg" alt />
          <div class="productName">{{item.productName}}</div>
          <div class="productIntroduce">{{item.productIntroduce}}</div>
        </div>
      </van-tab>
      <van-tab title="百年人寿">
        <div v-for="(item,index)  in BNProductList" :key="index" class="productItem" @click="lookItem(item.productId)">
          <img class="productImg" :src="item.productImg" alt />
          <div class="productName">{{item.productName}}</div>
          <div class="productIntroduce">{{item.productIntroduce}}</div>
        </div>
      </van-tab>
      <van-tab title="恒大人寿">
        <div v-for="(item,index) in HDProductList" :key="index" class="productItem" @click="lookItem(item.productId)">
          <img class="productImg" :src="item.productImg" alt />
          <div class="productName">{{item.productName}}</div>
          <div class="productIntroduce">{{item.productIntroduce}}</div>
        </div>
      </van-tab>
      <van-tab title="主推人寿">
        <div v-for="(item,index) in ZTProductList" :key="index" class="productItem" @click="lookItem(item.productId)">
          <img class="productImg" :src="item.productImg" alt />
          <div class="productName">{{item.productName}}</div>
          <div class="productIntroduce">{{item.productIntroduce}}</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        active: 0,
        productList: [
          {
            id: 1,
            productId: "p3-1",
            productImg: require("../../assets/product/3-1.png"),
            productName: "华夏华夏福「多倍2.0」",
            productIntroduce: "华夏人寿保险"
          },
          {
            id: 1,
            productId: "p3-2",
            productImg: require("../../assets/product/3-2.png"),
            productName: "华夏华夏红「经典版」",
            productIntroduce: "华夏人寿保险"
          },
          {
            id: 1,
            productId: "p3-3",
            productImg: require("../../assets/product/3-3.png"),
            productName: "双钻财富管理保险产…",
            productIntroduce: "华夏人寿保险"
          },
          {
            id: 1,
            productId: "p1-1",
            productImg: require("../../assets/product/1-1.png"),
            productName: "康欣保终身重大疾病…",
            productIntroduce: "百年人寿保险"
          },
          {
            id: 1,
            productId: "p1-4",
            productImg: require("../../assets/product/1-4.png"),
            productName: "康欣保终身重大疾病…",
            productIntroduce: "百年人寿保险"
          }
        ],
        BNProductList: [
          {
            id: 1,
            productId: "p1-1",
            productImg: require("../../assets/product/1-1.png"),
            productName: "康倍保重大疾病保险…",
            productIntroduce: "百年人寿保险"
          },
          {
            id: 1,
            productId: "p1-2",
            productImg: require("../../assets/product/1-2.png"),
            productName: "康多保重大疾病保险…",
            productIntroduce: "百年人寿保险"
          },
          {
            id: 1,
            productId: "p1-3",
            productImg: require("../../assets/product/1-3.png"),
            productName: "康欣保终身重大疾病…",
            productIntroduce: "百年人寿保险"
          },
          {
            id: 1,
            productId: "p1-4",
            productImg: require("../../assets/product/1-4.png"),
            productName: "康欣保终身重大疾病…",
            productIntroduce: "百年人寿保险"
          }
        ],
        HDProductList: [
          {
            id: 1,
            productId: "p2-1",
            productImg: require("../../assets/product/2-1.png"),
            productName: "恒久健康升级版",
            productIntroduce: "恒大人寿保险"
          },
          {
            id: 1,
            productId: "p2-2",
            productImg: require("../../assets/product/2-2.png"),
            productName: "千万护航两全保险",
            productIntroduce: "恒大人寿保险"
          },
          {
            id: 1,
            productId: "p2-3",
            productImg: require("../../assets/product/2-3.png"),
            productName: "万年康健康保障新时代",
            productIntroduce: "恒大人寿保险"
          },
          {
            id: 1,
            productId: "p2-4",
            productImg: require("../../assets/product/2-4.png"),
            productName: "万年青终身重大疾病…",
            productIntroduce: "恒大人寿保险"
          },
          {
            id: 1,
            productId: "p2-5",
            productImg: require("../../assets/product/2-5.png"),
            productName: "恒享福养老保险产品…",
            productIntroduce: "恒大人寿保险"
          },
          {
            id: 1,
            productId: "p2-6",
            productImg: require("../../assets/product/2-6.png"),
            productName: "万年寿尊享版终身寿…",
            productIntroduce: "恒大人寿保险"
          }
        ],
        ZTProductList: [
          {
            id: 1,
            productId: "p3-1",
            productImg: require("../../assets/product/3-1.png"),
            productName: "华夏华夏福「多倍2.0」",
            productIntroduce: "华夏人寿保险"
          },
          {
            id: 1,
            productId: "p3-2",
            productImg: require("../../assets/product/3-2.png"),
            productName: "华夏华夏红「经典版」",
            productIntroduce: "华夏人寿保险"
          },
          {
            id: 1,
            productId: "p3-3",
            productImg: require("../../assets/product/3-3.png"),
            productName: "双钻财富管理保险产…",
            productIntroduce: "华夏人寿保险"
          }
        ],
        banner: require("../../assets/banner.png")
      };
    },
    methods: {
      lookItem(id) {
        this.$router.push({
          name: "productItem",
          query: {
            productId: id
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#product .banner {
  height: 134px;
  width: 100%;
  display: block;
}
.van-tabs--line .van-tabs__wrap {
  padding: 13px 0;
}
#product [class*="van-hairline"]::after {
  border: none;
}
#product .van-tabs__line {
  width: 32.5px !important;
  background-color: #f29716;
}
#product .van-tab--active {
  font-weight: 600;
  font-size: 16px;
}
#product .van-tab {
  justify-content: start;
  padding: 0 10px;
  flex: none;
  position: relative;
}
#product .van-tab:after {
  content: "";
  display: block;
  position: absolute;
  background: #d7d7d7;
  width: 1px;
  height: 12px;
  left: 0px;
}
#product .van-tab:nth-child(1):after {
  background: #fff;
}
#product .van-tab__pane{
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 60px;
}
#product .productItem {
  width: 169px;
  height: 164px;
  background: #fff;
  box-shadow: 0px 0px 14px 0px rgba(46, 47, 52, 0.1);
  border-radius: 7px;
  margin-left: 12px;
  text-align: left;
}
#product .productItem .productImg {
  display: block;
  height: 96px;
  width: 100%;
}
.productName {
  width: 158px;
  font-size: 15px;
  font-weight: 600;
  color: #2e2f34;
  line-height: 18px;
  margin: 15px 0 5px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.productIntroduce {
  font-size: 13px;
  color: #4f5254;
  margin-left: 10px;
}
</style>
