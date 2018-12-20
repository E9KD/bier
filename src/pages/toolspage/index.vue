<template>
  <div class="toolspage">
    <img src="../../../static/image/nutrition.png" alt class="bgi">
    <div class="toolspage_box">
      <div class="box_listbox">
        <div class="listbox_div goldbg" v-for="(item,index) in list" :key="index">
          <div class="div_top">
            <img :src="item.img" alt class="top_img">
            <p class="top_content">{{item.title}}</p>
            <p class="top_tip" v-show="item.ishow">敬请期待</p>
          </div>
          <div class="div_bottom">
            <p class="bottom_com border_right" @click="GoEvaluate(index)">评价 ></p>
            <p class="bottom_com" @click="GoPunch(index)">打卡 ></p>
          </div>
        </div>
      </div>
    </div>
    <Pushcard></Pushcard>
  </div>
</template>

<script>
import Pushcard from "../../components/pushcard";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      list: [
        {
          img: require("../../../static/image/icon16.png"),
          title: "营养",
          ishow: false
        },
        {
          img: require("../../../static/image/icon16.png"),
          title: "运动",
          ishow: true
        },
        {
          img: require("../../../static/image/icon16.png"),
          title: "睡眠",
          ishow: true
        },
        {
          img: require("../../../static/image/icon16.png"),
          title: "情绪",
          ishow: true
        },
        {
          img: require("../../../static/image/icon16.png"),
          title: "内分泌",
          ishow: true
        }
      ]
    };
  },
  components: {
    Pushcard
  },
  methods: {
    ...mapMutations(["openPushcardType"]),
    GoEvaluate(x) {
      if (x != 0) return;
      this.openPushcardType({
        type: 0,
        index: x
      });
    },
    GoPunch(x) {
      if (x != 0) return;
      this.openPushcardType({
        type: 1,
        index: x
      });
    }
  }
};
</script>

<style scoped>
.top_tip {
  position: absolute;
  bottom: 5%;
  right: 5%;
  font-size: 20rpx;
  color: #999;
}
.top_img {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  display: inline-block;
}

.top_content {
  display: inline-block;
  vertical-align: middle;
}

.div_top {
  border-bottom: 1px solid #eeeeee;
  width: 100%;
  text-align: center;
  position: relative;
}
.div_bottom {
  overflow: hidden;
}
.border_right {
  border-right: 1px solid #eeeeee;
}
.bottom_com {
  display: inline-block;
  width: 48%;
  height: 100%;
  font-size: 30rpx;
  text-align: center;
  padding: 10rpx 0px;
  line-height: 50rpx;
}

.bgi {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.toolspage_box {
  position: relative;
  z-index: 99;
}

.box_listbox {
  width: 90vw;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 50rpx;
}

.listbox_div {
  color: white;
  border-radius: 20rpx;
  width: 70vw;
  margin: 0 auto;
  margin-top: 60rpx;
}
</style>
