<template>
  <div>
    <Swiper></Swiper>
    <Tools></Tools>
    <System></System>
    <div class="process">
      <div class="processhead">
        <h3 class="processheadtitle">PROCESS</h3>
        <p class="processheadtext">身高管理指导流程</p>
      </div>
      <div class="processlist">
        <div class="processlistrow">
          <div class="processlistcol" v-for="(item,index) in processlist" :key="index">
            <div class="processlistcolcom processlistcolleft">
              <img :src="item.processleftimg" alt="#" class="processleftimg">
            </div>
            <div class="processlistcolcom processlistcolright">
              <p class="processicontitle">{{item.processicontitle}}</p>
              <img :src="item.processicon" alt="#" srcset class="processicon">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="videobox asd">
      <video
        class="video"
        :src="VideoUrl"
        controls
        page-gesture
        direction
        show-fullscreen-btn
        show-play-btn
        show-center-play-btn
      ></video>
    </div>
    <Pushcard></Pushcard>
  </div>
</template>

<script>
import Swiper from "../../components/swiper";
import Tools from "../../components/tools";
import System from "../../components/system";
import Pushcard from "../../components/pushcard";
import { VideoUrl } from "@/utils/api.js";
export default {
  data() {
    return {
      processlist: [
        {
          processleftimg: "/static/image/z1.png",
          processicontitle: "身高预测",
          processicon: "/static/image/icon6.png"
        },
        {
          processleftimg: "/static/image/z2.png",
          processicontitle: "定制初期目标",
          processicon: "/static/image/icon6-1.png"
        },
        {
          processleftimg: "/static/image/z3.png",
          processicontitle: "身高管理",
          processicon: "/static/image/icon6-1.png"
        },
        {
          processleftimg: "/static/image/z4.png",
          processicontitle: "专业评估",
          processicon: "/static/image/icon6-2.png"
        },
        {
          processleftimg: "/static/image/z5.png",
          processicontitle: "1对1全程指导",
          processicon: "/static/image/icon6.png"
        },
        {
          processleftimg: "/static/image/z6.png",
          processicontitle: "达到初期目标",
          processicon: "/static/image/icon6-4.png"
        }
      ]
    };
  },
  components: {
    Swiper,
    Tools,
    System,
    Pushcard
  }
};
</script>

<style scoped>
page {
  position: fixed;
}

.processlist {
  background-color: #eee;
}

.processleftimg {
  width: 100%;
  height: 100%;
  text-align: center;
}

.processicontitle {
  width: 100%;
  font-size: 25rpx;
  margin-top: 70rpx;
  text-align: center;
}

.processicon {
  width: 50rpx;
  height: 50rpx;
  position: absolute;
  top: 56%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.processlistcolcom {
  height: 300rpx;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.processlistcolleft {
  width: 50%;
}

.processlistcolright {
  width: 50%;
  background-color: #ec881d;
}

.processlistcol {
  width: 50%;
  display: inline-block;
  margin-top: 20rpx;
}

.processlistrow {
  margin: 0 auto;
}

.process {
  padding-top: 20rpx;
  background-color: white;
}

.processhead {
  padding-bottom: 20rpx;
  padding-top: 30rpx;
  background-color: #eee;
}

.processheadtext {
  width: 100%;
  height: 50rpx;
  font-size: 35rpx;
  text-align: center;
  line-height: 50rpx;
}

.processheadtitle {
  width: 100%;
  height: 70rpx;
  font-size: 70rpx;
  text-align: center;
  line-height: 70rpx;
}
</style>