<template>
  <div class="login" @touchmove.stop="preventD">
    <img src="/static/image/logo.jpeg" class="login_logo">
    <button class="login_in" open-type="getUserInfo" @getuserinfo="getuserinfo">授权登录</button>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex';
  export default {
    methods: {
      ...mapMutations(['changeusername']),
      preventD() {},
      getuserinfo(e) {
        // 没有授权过，点击授权并获取用户信息
        wx.setStorageSync('userinfo', e.mp.detail.userInfo)
        let getinfo = wx.getStorageSync('userinfo')
        if (getinfo!='') {
          // 回到主页
          wx.reLaunch({
            url: '/pages/index/main'
          })
        }
      }
    }
  }
</script>

<style scoped>
  .login_in {
    position: absolute;
    bottom: 7%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2rpx solid rgb(227, 139, 39);
    width: 250rpx;
    height: 70rpx;
    border-radius: 14rpx;
    line-height: 70rpx;
    text-align: center;
    font-size: 30rpx;
    background-color: white;
  }
  .login_logo {
    width: 200rpx;
    height: 200rpx;
    position: absolute;
    top: 24%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .login {
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: white;
  }
</style>
