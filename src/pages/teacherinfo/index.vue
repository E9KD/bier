<template>
  <div class="teacherinfo">
    <div class="teacherimg">
      <img :src="teacherinfo.fuwuimg" alt="" srcset="" style="width:100%;">
    </div>
    <div class="teacherlist">
      <div class="listhead">我能为您提供的服务</div>
      <div class="listtext">
        <div class="listextbox">购买后，您的孩子可以享受
          <p class="listtextcom">：</p>
          <p class="listtextcom">量身定制月度/季度的身高管理服务</p>
          <span class="listprice">
              <p class="listpriceb">￥399</p>
              <p class="listprices">/月</p>
            </span>
          <span class="listprice">
              <p class="listpriceb">￥999</p>
              <p class="listprices">/月</p>
            </span>
          <div class="listbtnbox">
            <button class="listbtn" @click="buyLesson">购买</button>
            <p class="listbtntext">VIP免费</p>
          </div>
          <div class="listtext">
            <wxParse :content="teacherinfo.content" />
          </div>
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
          <div class="choosecom chooseleft" :class="[priceischoose==0?a:n]" @click="changeprice(0)">￥399元/</div>
          <!-- <div class="choosemin"></div> -->
          <div class="choosecom chooseright" :class="[priceischoose==1?a:n]" @click="changeprice(1)">￥999元/</div>
        </div>
        <div class="buyfoot">
          <div class="foottip"></div>
          <div class="foothead">
            <p class="footheadtop">支付金额{{lessonprice}}元</p>
            <p class="footheadmid">进入客服消息后，发送“19”获取购买链接</p>
          </div>
          <div class="footbtn" @click="pay">马上咨询</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import request from '../../utils/api.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import wxParse from 'mpvue-wxparse'
  export default {
    data() {
      return {
        teacherinfo: [],
        buyshow: false.buyshowa,
        s: 'show',
        h: 'hide',
        a: 'active',
        n: 'normal',
        priceischoose: 0
      }
    },
    components: {
      wxParse
    },
    methods: {
      ...mapMutations(['toastshowtype', 'closeToast']),
      pay() {
        let that=this
        wx.login({
          success: function(res) {
            if(res.code) {
              wx.request({
                url: 'https://wx.biergao.vip/api/payment/getWXPayInfo',
                success: function(res) {
                  data:{
                    
                  }
                }
              })
            } else {
              console.log(res.errMsg)
            }
          }
        })
      },
      changeprice(x) {
        this.priceischoose = x
      },
      closebutlink() {
        this.buyshow = false
      },
      buyLesson() {
        this.buyshow = true
      },
      getDefaultinfo() {
        let that = this
        let url = this.httpTeacherinfo + this.teacherid
        this.toastshowtype(1)
        request.api(url, function(res) {
          that.teacherinfo = res.data
          that.closeToast()
        })
      },
    },
    onLoad() {
      this.buyshow = false
      this.getDefaultinfo()
    },
    computed: {
      ...mapState(['httpTeacherinfo', 'teacherid'])
    }
  }
</script>

<style scoped>
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
    background-color: #F56700;
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
    background-color: #F56700;
    color: white;
  }
  .normal {
    background-color: white;
    border: 1px solid #F56700;
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
    background-color: #F56700;
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
  .teacherlist {
    background-color: #eeeeee;
  }
  .teacherinfo {
    background-color: white;
  }
  .listbtntext {
    font-size: 30rpx;
    color: red;
    padding-left: 50rpx;
    float: left;
    height: 80rpx;
    line-height: 80rpx;
  }
  .listbtn {
    width: 300rpx;
    height: 80rpx;
    background-color: #F56700;
    text-align: center;
    font-size: 30rpx;
    color: white;
    float: left;
  }
  .listbtnbox {
    width: 100%;
    height: 100rpx;
    overflow: hidden;
    margin-top: 30rpx;
  }
  .listprices {
    display: inline-block;
    font-size: 30rpx;
    color: #999999;
    margin-left: 30rpx;
  }
  .listpriceb {
    font-size: 60rpx;
    font-weight: bold;
    color: #999999;
    display: inline-block;
    margin-left: 50rpx;
  }
  .listprice {
    width: 100%;
    padding-top: 20rpx;
    display: block;
  }
  .listtextcom {
    padding-top: 20rpx;
    color: #999999;
    font-size: 35rpx;
  }
  .listextbox {
    width: 96%;
    margin: 0 auto;
  }
  .listtext {
    background-color: white;
    width: 100%;
  }
  .listhead {
    text-align: center;
    font-size: 40rpx;
    color: #999999;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    margin-bottom: 10rpx;
    background-color: white;
  }
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>


