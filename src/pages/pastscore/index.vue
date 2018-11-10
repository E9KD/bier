<template>
  <div class="pastscore">
    <img src="../../../static/image/nutrition.png" class="bgi">
    <div class="pastscore_container">
      <div class="container_box">
        <div class="box_div goldbg" v-for="(item,index) in scoreList" :key="index" @click="GoResult(index)">
          <img :src="userInfolist.avatarUrl" alt="" class="div_com img">
          <p class="div_p">{{item.createtime}}</p>
          <!-- 0显示分数 1不显示分数 -->
          <p class="div_com score" v-show='isScoreshow==0'>{{item.total}}分</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import request from "../../utils/api.js";
export default {
  data() {
    return {
      img: require("../../../static/image/man.png"),
      userInfolist: [],
      score: null,
      scoreList: [],
      list1: [10, 20, 30, 40, 50, 60, 70, 80],
      isScoreshow: false
    };
  },
  methods: {
    ...mapMutations([
      "ChangePolarParam",
      "ChangeScoreState",
      "ChangeEvaluateList"
    ]),
    init(x) {
      // 这里进行请求，获取分数，并进行展示。0显示分数 1不显示分数
      if (x == 0) {
        console.log(`修改了1`);
        let url = `https://wx.biergao.vip/api/Yypfjl/getfuwu2`;
        this.GetHistoryScore(url);
        this.ChangePolarParam(this.list1);
      } else {
        console.log(`修改了2`);
        let url = `https://wx.biergao.vip/api/Yybg/getyydkpfjl`;
        this.GetHistoryScore(url);
      }
    },
    GetHistoryScore(url) {
      // let url = `https://wx.biergao.vip/api/Yypfjl/getfuwu2`;
      let data = {
        page: 1,
        pageall: 15,
        openid: this.userParam.data.userid,
        pid: this.cardType
      };
      request.GetWithData(url, data, res => {
        for (let i = 0; i < res.data.orderlist.length; i++) {
          this.scoreList.push(res.data.orderlist[i]);
        }
      });
    },
    GoResult(x) {
      if (this.isScoreshow == 0) {
        this.ChangeScoreState(this.scoreList[x]);
        wx.navigateTo({
          url: `/pages/resultpage/main`
        });
      } else {
        this.ChangeEvaluateList(this.scoreList[x].content);
        wx.navigateTo({
          url: `/pages/evaluate/main`
        });
      }
    }
  },
  mounted() {
    this.userInfolist = this.userInfo;
  },
  computed: {
    ...mapState(["userInfo", "userParam", "cardType", "evaluateParam"])
  },
  onLoad(x) {
    this.scoreList=[]
    this.isScoreshow = x.show;
    this.init(x.show);
  }
};
</script>

<style scoped>
.pastscore_container {
  width: 100vw;
  height: 100vh;
  margin-top: 100rpx;
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
  margin: 60rpx auto;
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
  background: linear-gradient(to right, rgb(227, 139, 39), rgb(227, 200, 39));
}

.img {
  float: left;
}

.pastscore_container {
  position: relative;
  z-index: 99;
}
</style>
