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
              // console.log(code);
              // 用code换取openID和session_key
              // wx.request({
              //   url: 'https://wx.biergao.vip/api/biaob/getOpenid2/code/' + code,
              //   header: {
              //     'Content-Type': 'application/json'
              //   },
              //   success: function(res) {
              //     // 拿到用户的openid和session_key
              //     // wx.setStorageSync('openid', res.data.openid)
              //     // wx.setStorageSync('sessionKey', res.data.session_key)
              //     // 向服务器换取unionid
              //   }
              // })
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
                      wx.setStorageSync('openid', res.data.openId)
                      that.ChangeUserParam(res)
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
      pay() {
        wx.request({
          url: 'https://wx.biergao.vip/api/payment/getWXPayInfo',
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            "id": 1000,
            "openid": wx.getStorageSync('openid'),
            "build_order_no": new Date().getTime(),
          },
          method: 'POST',
          success: function(res) {
  
          }
        })
      }
    },
    onLoad() {
  
    },
    onLaunch() {
      this.getuserinfo()
      // this.pay()
      // wx.login({
      //   success: function(r) {
      //     console.log('code');
      //     var code = r.code; //登录凭证
      //     if (code) {
      //       //2、调用获取用户信息接口
      //       wx.getUserInfo({
      //         success: res => {
      //           //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
      //           wx.request({
      //             url: 'https://wx.biergao.vip/api/biaob/getOpenid3',
      //             data: {
      //               encryptedData: res.encryptedData,
      //               iv: res.iv,
      //               code: code
      //             },
      //             method: 'post',
      //             header: {
      //               'content-type': 'application/x-www-form-urlencoded'
      //             },
      //             success: function(res) {
      //               //console.log(res.data.openId);
      //               console.log(res);
      //               wx.setStorageSync('openid', res.data.openId);
      //               // wx.setStorageSync('fails', '1');
      //               // that.globalData.openid = res.data.openId;
      //               // that.globalData.openid = res.data.openId;
      //               // that.globalData.userInfo = res.data;
      //               // typeof cb == "function" && cb(that.globalData.userInfo)
      //             },
      //             fail: function() {
      //               wx.setStorageSync('openid', false);
      //               that.globalData.openid = false;
      //               that.globalData.userInfo = false;
      //               typeof cb == "function" && cb(that.globalData.userInfo)
      //             }
      //           })
      //         },
      //         fail: function() {
      //           wx.setStorageSync('openid', false);
      //           that.globalData.openid = false;
      //           that.globalData.userInfo = false;
      //           typeof cb == "function" && cb(that.globalData.userInfo)
      //         }
      //       })
      //     } else {
      //       wx.setStorageSync('openid', false);
      //       that.globalData.openid = false;
      //       that.globalData.userInfo = false;
      //       typeof cb == "function" && cb(that.globalData.userInfo)
      //     }
      //   }
      // })
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
</style>
