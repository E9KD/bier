<script>
  import {
    mapMutations,
    mapState
  } from 'vuex';
  export default {
    methods: {
      ...mapMutations(['ChangeUserInfo', 'ChangeUserParam']),
      // 查看是否授权
      getuserinfo(x) {
        let that = this
        wx.getUserInfo({
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
      login(x) {
        let that = this
        wx.login({
          success: function(res) {
            let code = res.code
            // 拿到code
            if (res.code) {
              wx.getUserInfo({
                success: function(res) {
                  wx.request({
                    url: 'https://wx.biergao.vip/api/biaob/getOpenid3',
                    data: {
                      encryptedData: res.encryptedData,
                      iv: res.iv,
                      code: code
                    },
                    method: 'post',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                      that.ChangeUserParam(res.data)
                    }
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
</style>
