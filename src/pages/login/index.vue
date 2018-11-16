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
  export default {
    methods: {
      ...mapMutations(["ChangeUserInfo", "ChangeUserParam"]),
      preventD() {},
      getuserinfo(e) {
        // 没有授权过，点击授权并获取用户信息
        this.ChangeUserInfo(e.target.userInfo);
        let that = this;
        wx.login({
          success: function(res) {
            let code = res.code;
            if (res.code) {
              wx.getUserInfo({
                success: function(res) {
                  wx.request({
                    url: "https://wx.biergao.vip/api/biaob/getOpenid3",
                    data: {
                      encryptedData: e.mp.detail.encryptedData,
                      iv: e.mp.detail.iv,
                      code: code
                    },
                    method: "post",
                    header: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(res) {
                      that.ChangeUserParam(res.data);
                      console.log(JSON.stringify(that.userParam));
                      if ( JSON.stringify(that.userParam)!="{}") {
                        // 回到主页
                        console.log(`进来了`);
                        wx.reLaunch({
                          url: "/pages/index/main"
                        });
                      }
                    }
                  });
                }
              });
            } else {
              console.log(res.errMsg);
            }
          }
        });
        console.log(this.userParam);
        console.log(this.userInfo);
      }
    },
    computed: {
      ...mapState(["userParam", "userInfo"])
    }
  };
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
