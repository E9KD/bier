<template>
  <div class="pastscore backgroundImg">
    <div class="pastscore_container">
      <div class="container_box">
        <div style="height:1px;"></div>
        <div class="box_div goldbg" v-for="(item,index) in scoreList" :key="index" @click="GoResult(index,item.total)">
          <img :src="userInfolist.avatarUrl" alt="" class="div_com img">
          <p class="div_p">{{item.createtime}}</p>
          <!-- 0显示分数 1不显示分数 -->
          <p class="div_com score" v-show='isScoreshow==0'>{{item.total}}分</p>
        </div>
        <div style="height:100rpx;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  import ajax from '../../utils/ajax.js'
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
      ...mapMutations([
        "ChangePolarParam",
        "ChangeScoreState",
        "ChangeEvaluateList",
        "toastshowtype",
        "closeToast"
      ]),
      init(x) {
        // 这里进行请求，获取分数，并进行展示。0显示分数 1不显示分数
        if (x == 0) {
          console.log(`修改了1`);
          let url = `https://wx.biergao.vip/api/Yypfjl/getfuwu2`;
          this.GetHistoryScore(url);
        } else {
          console.log(`修改了2`);
          let url = `https://wx.biergao.vip/api/Yybg/getyydkpfjl`;
          this.GetHistoryScore(url);
        }
      },
      GetHistoryScore(url) {
        let data = {
          page: 1,
          pageall: 15,
          openid: this.userParam.userid,
          pid: this.cardType
        };
        ajax.Get(url, data).then((result) => {
          for (let i = 0; i < result.orderlist.length; i++) {
            this.scoreList.push(result.orderlist[i]);
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      GoResult(x, y) {
        if (this.isScoreshow == 0) {
          this.ChangeScoreState(this.scoreList[x]);
          let polarList = []
          polarList.push(this.scoreList[x].assess1)
          polarList.push(this.scoreList[x].assess2)
          polarList.push(this.scoreList[x].assess3)
          polarList.push(this.scoreList[x].assess4)
          polarList.push(this.scoreList[x].assess5)
          polarList.push(this.scoreList[x].assess6)
          polarList.push(this.scoreList[x].assess7)
          polarList.push(this.scoreList[x].assess8)
          this.ChangePolarParam(polarList);
          wx.navigateTo({
            url: `/pages/resultpage/main?score=${y}`
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
      this.toastshowtype({
        t:0,p:'Loading...'
      })
      this.scoreList = []
      this.isScoreshow = x.show;
      this.init(x.show);
      this.closeToast()
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
