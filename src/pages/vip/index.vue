<template>
  <div class="vip">
    <!-- 头部 -->
    <div class='vip-head'>
      <div class='vip-head-title'>
        VIP会员专享
        <div style="font-size:12px;margin-top:10px;" v-if="time">您的会员将于：{{time}}到期</div>
  
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
    <div style='margin:45px auto;'>
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
    <Toast2></Toast2>
  </div>
</template>

<script>
import Toast2 from '../../components/toast2'
import { mapMutations } from 'vuex';

  export default {
    data(){
      return {
        isvip:false,
        time:30
      }
    },
    components:{
      Toast2
    },
    methods:{
      ...mapMutations(['ChangeToast2State']),
      
      GoExchange(){
        wx.navigateTo({
          url: '/pages/exchange/main'
        })
      },
      GoInquireVIp(){
        this.ChangeToast2State(1)
      }
    }
  };
</script>

<style scoped>
  page {
    width: 100%;
  }
  .vip {
    background-color: white;
  }
  .vip-head {
    background: #004299;
    width: 90%;
    border-radius: 6px;
    margin: 20px auto;
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
