<template>
  <div class="resultpage2 backgroundImg">
    <div class="result_container">
      <div class="container_top">
        <div class="top_title">小主，您此次膳食调查表的得分是：</div>
        <div class="top_score">
          <div class="score_box">
            <div class="box_v">
              <p class="score_v">{{score}}</p>
              <p class="score_s">分</p>
            </div>
          </div>
        </div>
        <div class="top_content">{{topContent}}</div>
      </div>
      <div class="parse">
        <div v-html="content" class="html a "></div>
      </div>
    </div>
  
  </div>
</template>

<script>

  import request from "../../utils/api.js";
  import {
    mapState,
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        score: null,
        topContent: null,
        content: null
      }
    },

    methods: {
      init(x) {
        let url = `https://wx.biergao.vip/api/survey/getassess2`
        let data = {
          pid: this.cardType,
          total: x
        }
        this.score=null
        this.topContent = null
        this.content ==null
        request.GetWithData(url, data, res => {
          let data = res.data
          this.score = x
          this.topContent = data.title
          this.content = data.jielun.replace(
            /16/g,
            "12").replace(
            /background-color:rgb(255, 255, 255)/g,
            "")
        })
      }
    },
    computed: {
      ...mapState(["userParam", "cardType"])
    },
    onLoad(x) {
      this.init(x.total)
    }
  }
</script>

<style scoped>
.a{
  background-color: none;
}
  .parse {
    width: 80%;
    margin: 0 auto;
    margin-top: 50rpx;
    padding-bottom: 50rpx;
  }
  
  .resultpage2 {}
  
  .result_container {
    position: relative;
    z-index: 99;
  }
  
  .container_top {
    width: 100%;
    border-bottom: 1px solid #999;
  }
  
  .top_title {
    padding-top: 50rpx;
    text-align: center;
    background: linear-gradient(to left, #ff8c00, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-weight: bold;
  }
  
  .top_score {
    position: relative;
    height: 400rpx;
  }
  
  .score_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250rpx;
    height: 250rpx;
    border-radius: 300rpx;
    border: 2px solid #ff8c00;
  }
  
  .box_v {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
  
  .score_v {
    display: inline-block;
    font-size: 80rpx;
    background: linear-gradient(to left, #ff8c00, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  
  .score_s {
    display: inline-block;
    font-size: 40rpx;
    background: linear-gradient(to left, #ff8c00, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  
  .top_content {
    text-align: center;
    color: white;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 50rpx;
  }
</style>
