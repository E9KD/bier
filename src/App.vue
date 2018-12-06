<script>
  import {
    mapMutations,
    mapState
  } from 'vuex';
  import ajax from './utils/ajax.js'
  export default {
    methods: {
      ...mapMutations(['ChangeUserInfo', 'ChangeUserParam']),
      // 查看是否授权
      getuserinfo(x) {
        let that = this
        wx.getUserInfo({
          lang: "zh_CN",
          success: function(res) {
            // 授权成功
            console.log(`授权成功`);
            that.ChangeUserInfo(res.userInfo)
            that.login(res)
          },
          fail: function(res) {
            console.log('授权失败');
            // 进行手动授权
            wx.reLaunch({
              url: '/pages/login/main'
            })
          }
        })
      },
      async login(x) {
        let that = this
        wx.login({
          success: function(res) {
            let code = res.code
            // 拿到code
            if (res.code) {
              wx.getUserInfo({
                success: function(res) {
                  let url = `https://wx.biergao.vip/api/biaob/login`
                  let data = {
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    code: code
                  }
                  ajax.Post(url, data).then(res => {
                    that.ChangeUserParam(res)
                  })
                }
              })
            } else {
              console.log(res.errMsg)
            }
          }
        })
      },
    },
    onLaunch() {
      this.getuserinfo()
  
    },
    onShow(x) {
      console.log(x);
    }
  }
</script>

<style>
  page {
    background-color: #eeeeee;
  }
  
  .goldbg {
    background: linear-gradient(to right, rgb(227, 139, 39), rgb(227, 200, 39));
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
        background-color: #ff5da2;
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
