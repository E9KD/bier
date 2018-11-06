<template>
  <div class="childrenreport">
    <div class="report_top">
      <div class="top_one">
        <div class="one_o">
          <div class="o_pone">{{heightEnd}}</div>
          <p class="o_ptwo">预计遗传身高(CM)</p>
        </div>
      </div>
      <div class="top_head">
        <div class="head_title">
          <div class="title_box">
            <img class="title_icon" src="../../../static/image/logo.jpeg">
            <p class="title_title">身高预测</p>
          </div>
        </div>
        <div class="head_report">
          <p class="report_name">预测遗传身高值：</p>
          <p class="report_name get">{{fuckHight}}</p>
          <div class="reportcontext">
            <div class="context_top">
              <p v-if="type1==0"><i style="display:inline-block">·</i>当前身高，目前已经达到全国平均身高</p>
              <p v-if="type1==1"><i style="display:inline-block">·</i>当前身高，高于全国平均身高<i style="color:#F56700">{{reportHight1}}</i>CM</p>
              <p v-if="type1==2"><i style="display:inline-block">·</i>当前身高，低于全国平均身高<i style="color:#F56700">{{reportHight1}}</i>CM</p>
            </div>
            <div class="context_mid">
              <p v-if="type2==0"><i style="display:inline-block">·</i>当前身高，目前已经达到理想身高</p>
              <p v-if="type2==1"><i style="display:inline-block">·</i>当前身高，低于理想身高<i style="color:#F56700">{{reportHight2}}</i>CM,通过科学干预，身高将突破遗传，达到<i style="color:#F56700">{{testHight}}</i>CM</p>
              <p v-if="type2==2"><i style="display:inline-block">·</i>当前身高，高于理想身高<i style="color:#F56700">{{reportHight2}}</i>CM,通过科学干预，身高将突破遗传，达到<i style="color:#F56700">{{testHight}}</i>CM</p>
            </div>
            <div class="context_bottom">
              <p>·若后天身高管理不善，身高将低于遗传身高，下降至身高下限<i style="color:#F56700">{{bottomhight}}</i>CM</p>
            </div>
          </div>
        </div>
        <div class="head_chart">
          <div class="head_title">
            <div class="title_box">
              <img class="title_icon" src="../../../static/image/logo.jpeg">
              <p class="title_title">生长曲线</p>
            </div>
          </div>
          <Echarts></Echarts>
        </div>
        <div class="head_date">
          <div class="head_title">
            <div class="title_box">
              <img class="title_icon" src="../../../static/image/logo.jpeg">
              <p class="title_title">打卡记录</p>
            </div>
          </div>
          <Datelist></Datelist>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Echarts from '../../components/echarts'
  import Datelist from '../../components/datelist'
  export default {
    data() {
      return {
        id: null,
        heightEnd: 180,
        fuckHight: `超好`,
        type1: 1,
        type2: 2,
        reportHight1: null,
        reportHight1: null,
        testHight: null,
        bottomhight: null,
      }
    },
    components: {
      Echarts,
      Datelist
    },
    methods: {
      init() {
        // 拿到我们需要的孩子的身份，就可以进行请求，并展示页面
      }
    },
    onLoad(x) {
      this.id = x.id
      this.init()
    }
  }
</script>

<style scoped>
  .until_title {
    font-size: 40rpx;
    vertical-align: middle;
    display: inline-block;
  }
  
  .until_img {
    display: inline-block;
    vertical-align: middle;
    width: 50rpx;
    height: 50rpx;
  }
  
  .until_box {
    border-bottom: 1px solid #999;
  }
  
  .head_date {
    width: 90%;
    margin: 0 auto;
    margin-top: 50rpx;
  }
  
  .reportcontext p {
    font-size: 30rpx;
    line-height: 50rpx;
    display: inline-block;
    color: #999;
    margin-bottom: 20rpx;
  }
  
  i {
    display: inline-block;
  }
  
  .reportcontext {
    font-size: 30rpx;
    text-align: left;
    padding-top: 20rpx;
  }
  
  .get {
    border-bottom: 1px solid rgb(252, 147, 72);
  }
  
  .report_name {
    display: inline-block;
    font-size: 40rpx;
    color: rgb(250, 130, 44);
    padding-bottom: 7rpx;
  }
  
  .head_report {
    text-align: center;
    padding-top: 20rpx;
    width: 90%;
    margin: 0 auto;
  }
  
  .title_title {
    display: inline-block;
    vertical-align: middle;
    font-size: 40rpx;
    margin-left: 5px;
  }
  
  .title_icon {
    vertical-align: middle;
    width: 50rpx;
    height: 50rpx;
    display: inline-block;
  }
  
  .title_box {
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 60rpx;
    /* border-bottom: 1px solid */
  }
  
  .head_title {
    /* text-align: center; */
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
    position: relative;
    height: 60rpx;
  }
  
  .o_ptwo {
    text-align: center;
    font-size: 30rpx;
    color: white;
  }
  
  .o_pone {
    text-align: center;
    font-size: 70rpx;
    color: white;
    margin-top: 20%;
  }
  
  .one_o {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280rpx;
    height: 280rpx;
    border-radius: 300rpx;
    border: 1px solid white;
  }
  
  .top_one {
    background-color: blue;
    width: 100%;
    height: 35vh;
    position: relative;
  }
  
  .childrenreport {
    background-color: white;
  }
</style>
