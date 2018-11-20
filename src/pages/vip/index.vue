<template>
  <div class="vip">
    <!-- 头部 -->
    <div class='vip-head'>
      <div class='vip-head-title'>
        VIP会员专享
        <div style="font-size:12px;margin-top:10px;" v-if="isvip">您的会员将于：{{time}}到期</div>
  
      </div>
      <block v-if="isvip == false">
        <div style='display:flex;position:relative;'>
          <button style='margin-bottom:0px;width:40%;height:40px;line-height:40px;float:left;margin-top:20px;background:#616161;border:none;color:#fff;font-size:20px;position:absolute;bottom:-20px;left:25px;background: linear-gradient(to right, rgb(227, 139, 39), rgb(227, 200, 39));'
            @click="GoExchange">VIP兑换</button>
          <button plain='true' style='margin-bottom:0px;width:40%;height:40px;line-height:40px;float:left;margin-top:20px;background:#616161;border:none;color:#fff;font-size:20px;position:absolute;bottom:-20px;right:25px;background: linear-gradient(to right, rgb(227, 139, 39), rgb(227, 200, 39));'
            @click="GoInquireVIp">VIP查询</button>
        </div>
      </block>
    </div>
    <!-- 内容 -->
    <div style='margin:0 auto;margin-top:40px;padding-bottom:100rpx;'>
      <div style='display:flex;justify-content:space-around;'>
  
        <div class='vip-content'>
          <img src="../../../static/image/vip1.jpg" alt="" style='width:120rpx;height:120rpx;'>
          <!-- <img src='../../../static/img/vip1.jpg' style='width:120rpx;height:120rpx;'></img> -->
          <div class='vip-title'>定制</div>
          <div class='vip-text'>身高管理执行方案</div>
        </div>
  
        <div class='vip-content'>
          <img src='../../../static/image/vip2.jpg' style='width:120rpx;height:120rpx;'>
          <div class='vip-title'>1VS1</div>
          <div class='vip-text'>身高管理指导</div>
        </div>
  
        <div class='vip-content'>
          <img src='../../../static/image/vip3.jpg' style='width:120rpx;height:120rpx;'>
          <div class='vip-title'>专业</div>
          <div class='vip-text'>专家智囊团诊断</div>
        </div>
      </div>
  
      <div style='display:flex;justify-content:space-around;'>
  
        <div class='vip-content'>
          <img src='../../../static/image/vip4.jpg' style='width:120rpx;height:120rpx;'>
          <div class='vip-title'>进阶</div>
          <div class='vip-text'>在线课程</div>
        </div>
  
        <div class='vip-content'>
          <img src='../../../static/image/vip5.jpg' style='width:120rpx;height:120rpx;'>
          <div class='vip-title'>专属</div>
          <div class='vip-text'>身高管理档案</div>
        </div>
  
        <div class='vip-content'>
          <img src='../../../static/image/vip6.jpg' style='width:120rpx;height:120rpx;'>
          <div class='vip-title'>极速</div>
          <div class='vip-text'>反馈/主动回访</div>
        </div>
  
      </div>
  
    </div>
    <div class="buylinkbox" :class="[buyshow?s:h]">
      <div class="buylink">
        <div class="buyclose" @click="closebutlink">X</div>
        <div class="buyhead">购买</div>
        <div class="buytitle">1对1专业身高管理服务</div>
        <div class="buytip">
          <i></i>
        </div>
        <div class="buychoose">
          <div class="choosecom chooseleft" :class="[priceischoose==0?a:n]" @click="ChangePrice(0)">￥{{price1}}元/</div>
          <!-- <div class="choosemin"></div> -->
          <div class="choosecom chooseright" :class="[priceischoose==1?a:n]" @click="ChangePrice(1)">￥{{price2}}元/</div>
        </div>
        <div class="buyfoot">
          <div class="foottip"></div>
          <div class="foothead">
            <!-- <p class="footheadtop">支付金额{{lessonprice}}元</p> -->
            <p class="footheadmid">进入客服消息后，发送“1”获取购买链接</p>
          </div>
          <button open-type="contact" class="footbtn" :session-from='link'>马上咨询</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex';
  import request from '../../utils/api.js'
  export default {
    data() {
      return {
        isvip: false,
        time: 30,
        buyshow: false,
        priceischoose: 0,
        link: '{"type": "vip","userid":"null","unionId":"null","goodsid":"1","price":"null"}',
        s: "show",
        h: "hide",
        a: "active",
        n: "normal",
        price1: null,
        price2: null,
        price: null,
      }
    },
    methods: {
      ...mapMutations(['ChangeToast2State']),
      init() {
        let url = `https://wx.biergao.vip/api/vip/price`
        request.api(url, res => {
          this.price1 = res.data[0]
          this.price2 = res.data[1]
          this.price = this.price1
          this.ChangeParam()
        })
        this.GetVipState()
      },
      GetVipState() {
        let url = `https://wx.biergao.vip/api/vip/select`
        let data = {
          openid: this.userParam.openId
        }
        request.Post(url, data, res => {
          if (res.data.status == 500) {
            this.isvip=false
          } else if (res.data.status == 404) {
            this.isvip=false
          } else {
            this.isvip=true
            this.time=res.status
          }
        })
      },
      GoExchange() {
        wx.navigateTo({
          url: '/pages/exchange/main'
        })
      },
      closebutlink() {
        this.buyshow = false
      },
      ChangePrice(x) {
        this.priceischoose = x;
        if (x == 0) {
          this.price = this.price1
          this.ChangeParam()
        } else {
          this.price = this.price2
          this.ChangeParam()
        }
      },
      ChangeParam() {
        let data = JSON.parse(this.link)
        data.userid = this.userParam.userid
        data.unionId = this.userParam.unionId
        data.price = this.price
        this.link = JSON.stringify(data)
        console.log(this.link);
      },
      GoInquireVIp() {
        this.buyshow = true
      }
    },
    computed: {
      ...mapState(['userParam'])
    },
    onLoad() {
      this.init()
    }
  };
</script>

<style scoped>
  page {
    width: 100%;
  }
  
  .buyclose {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    font-size: 40rpx;
  }
  
  .footbtn {
    margin: 0 auto;
    width: 300rpx;
    height: 80rpx;
    background-color: rgb(227, 139, 39);
    text-align: center;
    font-size: 30rpx;
    line-height: 80rpx;
    margin-top: 20rpx;
  }
  
  .footheadmid {
    color: black;
    font-size: 30rpx;
    text-align: center;
    margin-top: 20rpx;
  }
  
  .footheadtop {
    color: #eeeeee;
    font-size: 30rpx;
    text-align: center;
  }
  
  .foothead {
    padding-top: 30rpx;
  }
  
  .foottip {
    position: absolute;
    top: -15rpx;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 0px;
    width: 0px;
    border-left: 50rpx solid transparent;
    border-right: 50rpx solid transparent;
    border-bottom: 60rpx solid #999999;
  }
  
  .buyfoot {
    height: 3000rpx;
    width: 100%;
    background-color: #999999;
    position: relative;
  }
  
  .chooseright {
    float: right;
  }
  
  .chooseleft {
    float: left;
  }
  
  .active {
    background-color: rgb(227, 139, 39);
    color: white;
  }
  
  .normal {
    background-color: white;
    border: 1px solid rgb(227, 139, 39);
    color: black;
  }
  
  .choosecom {
    width: 220rpx;
    height: 220rpx;
    border-radius: 200rpx;
    vertical-align: middle;
    margin-top: 30rpx;
    text-align: center;
    line-height: 220rpx;
    /* display: inline-block; */
  }
  
  .buychoose {
    width: 80%;
    height: 300rpx;
    margin: 30rpx auto;
  }
  
  .buytip i {
    width: 100rpx;
    background-color: rgb(227, 139, 39);
    height: 6rpx;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .buytip {
    margin-top: 20rpx;
    width: 100%;
    height: 10rpx;
    position: relative;
  }
  
  .buytitle {
    text-align: center;
    font-size: 40rpx;
    margin-top: 10rpx;
  }
  
  .buyhead {
    text-align: center;
    font-size: 100rpx;
    color: black;
    margin-top: 100rpx;
  }
  
  .buylink {
    border: 1px solid #999999;
    border-radius: 30rpx;
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }
  
  .buylinkbox {
    background-color: white;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    overflow: hidden;
  }
  
  .vip {
    background-color: white;
  }
  
  .vip-head {
    background: #004299;
    width: 90%;
    border-radius: 6px;
    margin: 0 auto;
  }
  
  .vip-head-title {
    color: #e2e2e2;
    text-align: center;
    padding: 80px 20px;
    font-size: 30px;
  }
  
  img {
    margin: 0 auto;
    display: block;
  }
  
  .vip-title {
    font-size: 18px;
    text-align: center;
    color: #616161;
    margin-top: 10px;
  }
  
  .vip-text {
    font-size: 12px;
    text-align: center;
    color: #616161;
  }
  
  .vip-content {
    justify-content: center;
    margin-top: 20px;
    width: 96px;
  }
  
  
  /*弹出层  */
  
  .cf-bg {
    font-weight: 200;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    font-family: Consolas, Monaco, monospace;
    overflow: hidden;
  }
  
  
  /*jz  */
  
  .jz {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    margin: 0 auto;
    text-align: center;
  }
  
  .jz button[plain] {
    color: #353535;
    border: 1px solid #353535;
    background-color: transparent;
    line-height: 1.5;
    width: 49%;
    display: inline;
  }
  
  .nav {
    width: 49%;
    border: 1px solid #353535;
    float: right;
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    line-height: 1.5;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    color: #000;
    background-color: transparent;
  }
  
  .bg-blur {
    position: fixed;
    float: left;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    /* -webkit-filter: blur(15px);
          -moz-filter: blur(15px);
          -o-filter: blur(15px);
          -ms-filter: blur(15px);
          filter: blur(15px); */
  }
  
  
  /* 控制圆圈样式 */
  
  .on {
    background: #ed881e;
    color: #fff;
  }
  
  .off {
    background: #fff;
    color: #000;
  }
  
  
  /* 箭头 */
  
  .div1 {
    position: relative;
  }
  
  .div1:after {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 15px;
    margin-left: -15px;
    left: 50%;
    content: " ";
    border-bottom: 15px solid #e5e5e5;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    box-sizing: border-box;
  }
  
  
  /* .div1:before {
          position: absolute;
          top: 20px;
          width: 0;
          height: 0;
          left: 50%;
          margin-left: -5px;
          content: " ";
          border-bottom: 15px solid #000;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
        } */
</style>
