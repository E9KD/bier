<template>
  <div class="pastscore">
    <img src="../../../static/image/nutrition.png" class="bgi">
    <div class="pastscore_container">
      <div class="container_box">
        <div class="box_div" v-for="(item,index) in scoreList" :key="index" @click="GoResult(index)">
          <img :src="userInfolist.avatarUrl" alt="" class="div_com img">
          <p class="div_p">{{item.createtime}}</p>
          <p class="div_com score">{{item.total}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  import request from "../../utils/api.js";
  export default {
    data() {
      return {
        img: require("../../../static/image/man.png"),
        userInfolist: [],
        score: null,
        scoreList: [],
        list1:[10, 20, 30, 40, 50, 60, 70, 80]
      };
    },
    methods: {
      ...mapMutations(['ChangePolarParam','ChangeScoreState']),
      init() {
        // 这里进行请求，获取分数，并进行展示。
        this.GetHistoryScore();
        this.ChangePolarParam(this.list1)
      },
      GetHistoryScore() {
        let url = `https://wx.biergao.vip/api/Yypfjl/getfuwu2`;
        let data = {
          page: 1,
          pageall: 15,
          openid: this.userParam.data.userid,
          pid: 0
        };
        request.GetWithData(url, data, res => {
  
          if (this.scoreList.length > 0) return
          for (let i = 0; i < res.data.orderlist.length; i++) {
            this.scoreList.push(res.data.orderlist[i]);
          }
        });
      },
      GoResult(x) {
        this.ChangeScoreState(this.scoreList[x])
        wx.navigateTo({
          url: `/pages/resultpage/main`
        })
      }
    },
    mounted() {
      this.userInfolist = this.userInfo;
      this.init();
    },
    computed: {
      ...mapState(["userInfo", "userParam"])
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
    background-color: blue;
    border-radius: 150rpx;
  }
  
  .score {
    float: right;
    font-size: 40rpx;
    text-align: center;
    line-height: 150rpx;
  }
  
  .div_com {
    width: 150rpx;
    height: 150rpx;
    border-radius: 300rpx;
    background-color: red;
  }
  
  .img {
    float: left;
  }
  
  .pastscore_container {
    position: relative;
    z-index: 99;
  }
</style>
