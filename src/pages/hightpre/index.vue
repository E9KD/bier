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
              <p v-if="type1==1"><i style="display:inline-block">·</i>当前身高，高于全国平均身高<i style="color:rgb(227, 139, 39)">{{reportHight1}}</i>CM</p>
              <p v-if="type1==2"><i style="display:inline-block">·</i>当前身高，低于全国平均身高<i style="color:rgb(227, 139, 39)">{{reportHight1}}</i>CM</p>
            </div>
            <div class="context_mid">
              <p v-if="type2==0"><i style="display:inline-block">·</i>当前身高，目前已经达到理想身高</p>
              <p v-if="type2==1"><i style="display:inline-block">·</i>当前身高，低于理想身高<i style="color:rgb(227, 139, 39)">{{reportHight2}}</i>CM,通过科学干预，身高将突破遗传，达到<i style="color:rgb(227, 139, 39)">{{testHight}}</i>CM</p>
              <p v-if="type2==2"><i style="display:inline-block">·</i>当前身高，高于理想身高<i style="color:rgb(227, 139, 39)">{{reportHight2}}</i>CM,通过科学干预，身高将突破遗传，达到<i style="color:rgb(227, 139, 39)">{{testHight}}</i>CM</p>
            </div>
            <div class="context_bottom">
              <p>·若后天身高管理不善，身高将低于遗传身高，下降至身高下限<i style="color:rgb(227, 139, 39)">{{bottomhight}}</i>CM</p>
            </div>
          </div>
        </div>
        <div class="head_tip">
          <div class="tip_tip">
            <p class="tip_title">比尔高贴心小建议</p>
          </div>
          <div class="tip_content">
            <h3 class="content_title">先天条件</h3>
            <p class="content_p">恭喜您达到期望身高，遗传是影响身高的部分因素，后天的运动、营养、生活习惯等都会影响你的身高。继续加油！</p>
          </div>
          <div class="tip_content">
            <h3 class="content_title">医学分析</h3>
            <p class="content_p">生长激素、骨骺线、骨龄、微量元素等因素对身高发育起决定性的作用。要准确掌握了解这些因素，达到最佳的增高效果。</p>
          </div>
          <div class="tip_content">
            <h3 class="content_title">营养水平</h3>
            <p class="content_p">食用食材要尽量丰富多彩，才能提供长高所需的各种营养。尽量不要挑食，谷薯类、蔬菜类、禽畜类、奶脂类都要摄入。</p>
          </div>
          <div class="tip_content">
            <h3 class="content_title">运动体态</h3>
            <p class="content_p">青少年是体质问题高发人群。体态不良不仅影响体形气质，也会影响体质。进行体态矫正训练，能起到立竿见影的增高效果。</p>
          </div>
          <div class="tip_content content_bom">
            <h3 class="content_title">生活习惯</h3>
            <p class="content_p">咖啡、浓茶或碳酸饮料，会阻碍营养素的吸收，影响长高。保持健康饮食习惯，每天饮水2000毫升，让你处于最佳长高状态。</p>
          </div>
        </div>
        <div class="head_bottom">
          <div class="bottom_box">
            <p class="bottom_title">立刻开始身高管理</p>
            <p class="bottom_button" @click="GoChartPage">GO</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    methods: {
      init() {
        // 拿到我们需要的孩子的身份，就可以进行请求，并展示页面
      },
      GoChartPage(){
        wx.navigateTo({
          url: '/pages/chartpage/main'
        })
      }
    },
    onLoad(x) {
      this.id = x.id
      this.init()
    }
  }
</script>

<style scoped>
  .bottom_button {
    width: 320rpx;
    background-color: rgb(227, 139, 39);
    display: inline-block;
    margin-top: 5rpx;
    border-radius: 50px;
    padding: 5rpx 0px;
    color: white;
  }
  
  .bottom_title {
    font-size: 30rpx;
    color: #999;
  }
  .bottom_box{
    padding-top:  30rpx;
    text-align: center;
  }
  .head_bottom {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 180rpx;
    border-top: 1px solid #eeeeee;
    background-color: white;
  }
  
  .content_bom {
    padding-bottom: 200rpx;
  }
  
  .content_p {
    color: #999;
    font-size: 30rpx;
    margin-top: 10rpx;
  }
  
  .content_title {
    font-size: 35rpx;
  }
  
  .tip_content {
    width: 90%;
    margin: 0 auto;
    padding-top: 60rpx;
  }
  
  .tip_title {
    padding: 0px 15rpx;
    border-left: 5rpx solid rgb(32, 150, 32);
    display: inline-block;
    font-size: 35rpx;
  }
  
  .tip_tip {
    padding: 20rpx 0px;
    padding-left: 5%;
    border-bottom: 1px solid #eee;
  }
  
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
