<template>
  <div class="user">
    <div class="userinfobox">
      <div class="userinfoimg">
        <img :src="userinfolist.avatarUrl" class="userimg">
      </div>
      <div class="userinfoname">
        <p class="username">{{userinfolist.nickName}}</p>
      </div>
    </div>
    <div class="userfuncbox">
      <div class="userfunc" @click="GoChildrenPage(0)">成长报告</div>
      <div class="userfunc" @click="GoChildrenPage(1)">添加孩子</div>
      <div class="userfunc" @click="GoChildrenPage(2)">我的订单</div>
      <div class="userfunc" @click="GoChildrenPage(3)">成为VIP</div>
      <!-- 测试chart组件 -->
      <!-- <div class="userfunc" @click="click">成为VIP</div> -->
    </div>
  </div>
</template>

<script>
  import {
    mapState, mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        openid: "",
        userinfolist: []
      };
    },
    methods: {
      // 测试chart组件，没有问题噢
      // ...mapMutations(['ChangeEchartsParam']),
      // click() {
      //   let sex = 1;
      //   let age = 10;
      //   this.ChangeEchartsParam({
      //     sex,
      //     age
      //   });
      //   wx.navigateTo({
      //     url: '../test/main'
      //   })
      // },
      getuserinfo(e) {
      },
      GoChildrenPage(x) {
        switch (x) {
          case 0:
            wx.navigateTo({
              url: "/pages/groupreport/main"
            });
            break;
          case 1:
            wx.navigateTo({
              url: "/pages/addchildren/main"
            });
            break;
          case 2:
            wx.navigateTo({
              url: "/pages/order/main"
            });
            break;
          case 3:
            wx.navigateTo({
              url: "/pages/vip/main"
            });
            break;
        }
      }
    },
  };
</script>

<style scoped>
  .loginbtn {
    width: 30%;
    height: 60rpx;
    margin: 0 auto;
    text-align: center;
    font-size: 30rpx;
    line-height: 60rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .userfunc {
    width: 90%;
    height: 70rpx;
    margin: 0 auto;
    line-height: 70rpx;
    font-size: 30rpx;
    border-bottom: 1px solid #eeeeee;
    padding: 10rpx 0px 10rpx 20rpx;
  }
  
  .userfuncbox {
    width: 100%;
    height: 60vh;
    background-color: white;
  }
  
  .username {
    font-size: 30rpx;
    color: white;
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  
  .userimg {
    display: block;
    width: 100%;
    height: 100%;
  }
  
  .userinfoimg {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200rpx;
    height: 200rpx;
    border-radius: 180rpx;
    overflow: hidden;
  }
  
  .userinfoname {
    position: absolute;
    top: 77%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200rpx;
    height: 50rpx;
    line-height: 50rpx;
  }
  
  .userinfobox {
    width: 100%;
    height: 40vh;
    background-color: blue;
    position: relative;
  }
</style>