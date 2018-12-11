<script>
  import {
    mapMutations
  } from "vuex";
  import {
    loginUrl
  } from "@/utils/api.js";
  export default {
    methods: {
      ...mapMutations(["ChangeSid", "ChangeUserParam", "ChangeUserInfo"]),
      // 先判断有没有获取到userParam
      init() {
        const param = wx.getStorageSync("userParamLocal");
        const info = wx.getStorageSync("userInfoLocal");
        if (!param && !info) {
          wx.reLaunch({
            url: "/pages/login/main"
          });
        } else {
          this.ChangeUserParam(param);
          this.ChangeUserInfo(info);
        }
      }
    },
    onLaunch() {
      this.init();
    },
    onShow(options) {
      //  options里面的scene是带有参数的，应该是放到了query里面
      if (options.query.scene) {
        var scene = decodeURIComponent(options.query.scene);
        var arrPara = scene.split("&");
        var arr = [];
        var testData = {};
        for (var i in arrPara) {
          arr = arrPara[i].split("=");
          if (i == 0) {
            testData.page = arr[1];
          } else {
            testData.sid = arr[1];
          }
        }
        this.ChangeSid(testData.sid);
      } else {
        this.ChangeSid(0);
      }
    }
  };
</script>

<style>
  page {
    background-color: white;
  }
  
  .goldbg {
    background: linear-gradient(to right, #ec881d, rgb(227, 200, 39));
  }
  
  .backgroundImg {
    background-image: url("https://wx.biergao.vip/uploads/b/201805/nutrition.png");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    -moz-background-size: 100% 100%;
  }
  
  .hide {
    transition: height 0.5s;
    height: 0px;
  }
  
  .show {
    transition: height 0.5s;
    height: 100vh;
  }
  
  .videobox {
    margin-top: 30rpx;
    width: 100%;
    height: 400rpx;
  }
  
  .video {
    width: 100%;
    height: 100%;
  }
  
  .bgi {
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .loader8 {
    font-size: 10px;
    /* position: relative; */
    text-indent: -9999em;
    border-top: 1rpx dashed #fff;
    border-right: 1rpx dashed #fff;
    border-bottom: 1rpx dashed #fff;
    border-left: 1rpx dashed #fff;
    -webkit-animation: load8 15s infinite linear;
    animation: load8 15s infinite linear;
  }
  
  @-webkit-keyframes load8 {
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    0% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  
  @keyframes load8 {
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    0% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  
  .box_a {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 300rpx;
    height: 300rpx;
    border-radius: 300rpx;
  }
  
  .html {
    color: #999;
    font-size: 30rpx;
  }
  
  .shareIcon {
    display: inline-block;
    margin-left: 10rpx;
    width: 30rpx;
    height: 30rpx;
    vertical-align: middle;
  }
  
  .userinfo p {
    vertical-align: middle;
    margin-left: 10rpx;
    display: inline-block;
  }
  
  .userinfo {
    opacity: 0.9;
    background-color: #45b7b8;
    position: fixed;
    bottom: 20%;
    right: 0px;
    color: white;
    padding: 10rpx 20rpx;
    font-size: 25rpx;
    border-bottom-left-radius: 30rpx;
    border-top-left-radius: 30rpx;
  }
</style>
