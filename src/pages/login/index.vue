<template>
  <div class="login" @touchmove.stop="preventD">
    <img src="/static/image/logo.jpeg" class="login_logo">
    <button class="login_in" open-type="getUserInfo" @getuserinfo="getuserinfo">授权登录</button>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from "vuex";
  import ajax from "../../utils/ajax.js";
  import {
    GetUserInfo,
    Login
  } from "@/utils/wx.js";
  import {
    loginUrl
  } from "@/utils/api.js";
  export default {
    methods: {
      ...mapMutations(["ChangeUserInfo", "ChangeUserParam"]),
      preventD() {},
      async getuserinfo(e) {
        // 没有授权过，点击授权并获取用户信息
        const getUserInfoResult=await this.GetUserInfoFuc()
        const param = e.mp.detail;
        const loginResult = await Login();
        if (!loginResult.code) return;
        const successResult = await this.GetUserParam(loginResult, param);
        const localParam = wx.getStorageSync('userParamLocal')
        if (localParam && this.userParam) {
          wx.reLaunch({
            url: "/pages/index/main"
          });
        } else {
          console.log(`登陆失败！`);
        }
      },
      GetUserInfoFuc() {
        return new Promise(resolve => {
          this.ChangeUserInfo(e.mp.detail.userInfo);
          wx.setStorageSync('userInfoLocal', e.mp.detail.userInfo)
        })
      },
      GetUserParam(x, y) {
        return new Promise(resolve => {
          let data = {
            encryptedData: y.encryptedData,
            iv: y.iv,
            code: x.code,
            sid: this.sid
          };
          ajax.Get(loginUrl, data).then(res => {
            wx.setStorageSync('userParamLocal', res)
            this.ChangeUserParam(res);
            resolve(1);
          });
        });
      }
    },
    computed: {
      ...mapState(["userParam", "userInfo", "sid"])
    }
  };
</script>

<style scoped>
  .login_in {
    position: absolute;
    bottom: 7%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2rpx solid #ec881d;
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
