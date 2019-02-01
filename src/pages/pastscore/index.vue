<template>
  <div class="pastscore backgroundImg">
    <div class="pastscore_container">
      <div class="container_box">
        <div style="height:1px;"></div>
        <div
          class="box_div goldbg"
          v-for="(item,index) in scoreList"
          :key="index"
          @click="GoResult(index,item.total)"
        >
          <img :src="userInfolist.avatarUrl" alt class="div_com img">
          <p class="div_p">{{item.createtime}}</p>
          <!-- 0显示分数 1不显示分数 -->
          <p class="div_com score" v-show="isScoreshow==0">{{item.total}}分</p>
        </div>
        <div style="height:100rpx;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "@/utils/ajax.js";
import { getHistoryUrl1, getHistoryUrl2 } from "@/utils/api.js";
export default {
  data() {
    return {
      img: require("../../../static/image/man.png"),
      userInfolist: [],
      scoreList: [],
      list1: [],
      isScoreshow: false
    };
  },
  methods: {
    // 默认执行
    init(x) {
      // 这里进行请求，获取分数，并进行展示。0显示分数 1不显示分数
      x == 0
        ? this.GetHistoryScore(getHistoryUrl1)
        : this.GetHistoryScore(getHistoryUrl2);
    },

    // 获取历史成绩
    GetHistoryScore(url) {
      ajax
        .Get(url, {
          page: 1,
          pageall: 15,
          openid: this.$store.state.userParam.userid,
          pid: this.$store.state.cardType
        })
        .then(result => {
          result.orderlist.forEach(x => {
            this.scoreList.push(x);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 去结果页面
    GoResult(x, y) {
      if (this.isScoreshow == 0) {
        this.$store.commit("ChangeScoreState", this.scoreList[x]);
        let polarList = [];
        for (let i = 1; i <= 8; i++) {
          polarList.push(this.scoreList[x]["assess" + i]);
        }
        this.$store.commit("ChangePolarParam", polarList);
        wx.navigateTo({
          url: `/pages/resultpage/main?score=${y}`
        });
      } else {
        this.$store.commit("ChangeEvaluateList", this.scoreList[x].content);
        wx.navigateTo({
          url: `/pages/evaluate/main`
        });
      }
    }
  },
  mounted() {
    this.userInfolist = this.$store.state.userInfo;
  },
  onLoad(x) {
    this.$store.commit("toastshowtype", {
      t: 0,
      p: "Loading..."
    });
    this.scoreList = [];
    this.isScoreshow = x.show;
    this.init(x.show);
    this.$store.commit("closeToast");
  }
};
</script>

<style scoped>
.pastscore {
  min-height: 100vh;
}

.pastscore_container {
  width: 100vw;
}

.div_p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 30rpx;
  z-index: 99;
}

.box_div {
  position: relative;
  overflow: hidden;
  width: 80%;
  margin: 0px auto;
  margin-top: 100rpx;
  border-radius: 150rpx;
}

.score {
  float: right;
  font-size: 40rpx;
  text-align: center;
  line-height: 150rpx;
  color: white;
}

.div_com {
  width: 150rpx;
  height: 150rpx;
  border-radius: 300rpx;
  background: linear-gradient(to right, #ec881d, rgb(227, 200, 39));
}

.img {
  float: left;
}

.pastscore_container {
  position: relative;
  z-index: 99;
}
</style>
