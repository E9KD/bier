<template>
  <div>
    <div class="servehead">
      <div class="seveheadbox">
        <h2 class="texthead">TEAM</h2>
        <p class="servetext phead">
          国内一流的身高管理团队
          <span></span>
        </p>
        <p class="servetext phead">
          一对一定制并全程跟踪身高促进
          <span></span>
        </p>
      </div>
    </div>
    <!-- 老师列表 -->
    <!-- 第一部分加载老师 -->
    <div class="teacher">
      <div
        class="teacherrow"
        v-for="(item,index) in teacherinfolist"
        :key="index"
        @click="getTeacherid(item.id)"
      >
        <img class="teachercolleft teachercol" :src="item.faceimg">
      </div>
      <!-- 第二部分加载老师 -->
      <div
        class="teacherrow"
        v-for="(item,index) in teacherinfolist2"
        :key="index"
        @click="getTeacherid2(item.id)"
      >
        <img class="teachercolleft teachercol" :src="item.faceimg">
      </div>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
import ajax from "@/utils/ajax.js";
import Toast from "@/components/toast.vue";
import {
  getDefaultTeacherInfoUrl,
  getMoreTeacherInfoUrl
} from "@/utils/api.js";
export default {
  data() {
    return {
      teacherinfolist: [],
      teacherinfolist2: []
    };
  },
  components: {
    Toast
  },
  methods: {
    // 获取老师信息
    getTeacherinfo() {
      this.$store.commit("toastshowtype", {
        t: 0,
        p: "Loading..."
      });
      ajax
        .Get(getDefaultTeacherInfoUrl)
        .then(result => {
          this.teacherinfolist = result.orderlist;
          this.$store.commit("closeToast");
        })
        .catch(err => console.log(err));
    },

    //进入第一次加载老师信息
    getTeacherid(x) {
      this.$store.commit("changeteacherid", x);
      wx.navigateTo({
        url: "/pages/teacherinfo/main"
      });
    },

    //进入第二次加载老师信息
    getTeacherid2(x) {
      this.$store.commit("changeteacherid", x);
      wx.navigateTo({
        url: "/pages/teacherinfo/main"
      });
    }
  },
  onLoad() {
    this.getTeacherinfo();
  },

  //
  onReachBottom() {
    ajax
      .Get(getMoreTeacherInfoUrl)
      .then(result => {
        this.teacherinfolist2 = result.orderlist;
      })
      .catch(err => console.log(err));
  },

  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading();
    this.teacherinfolist2 = [];
    this.getTeacherinfo();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
};
</script>

<style scoped>
.seveheadbox {
  border-radius: 50rpx;
  width: 90%;
  margin: 30rpx auto;
}

.servetext {
  text-align: justify;
  height: 55rpx;
}

.servetext > span {
  display: inline-block;
  padding-left: 100%;
}

.texthead {
  font-size: 60rpx;
  text-align: center;
}

.phead {
  font-size: 40rpx;
  padding: 10rpx;
  color: #888888;
}

.teacher {
  width: 100%;
  margin: 0 auto;
}

.teacherrow {
  width: 47vw;
  margin-left: 2%;
  height: 47vw;
  display: inline-block;
}

.teachercol {
  width: 100%;
  height: 100%;
}
</style>