<template>
  <div class="resultpage backgroundImg" id="resultpage">
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
      <div class="contianer_middle ">
        <p class="middle_content">合理营养、平衡膳食评价与对策</p>
        <!-- <div class="echarts-wrap">
                      <mpvue-echarts :echarts="echarts" :onInit="onInit" ref="echarts" />
                    </div> -->
        <canvas canvas-id="radarCanvas" class="canvas" bindtouchstart="touchHandler"></canvas>
      </div>
  
      <div class="container_bottom">
  
        <div class="bottom_box" v-for="(item,index) in list0" :key="index">
          <div class="box_container">
            <div class="box_top">
              <img class="bottom_img" :src="imgList[0].img" alt="">
              <p class="bottom_p">{{item.type}}</p>
              <p class="bottom_title">{{item.title}}</p>
            </div>
            <div class="box_bottom">
              <div class="box_bottom_bottom" :style="{height:item.heightList+'rpx'}">
                <div class="html" v-html="item.content"></div>
              </div>
              <img :src="item.heightList?showimg:hideimg" alt="" class="arrow" @click="ChangeArrowState(index,list0)">
            </div>
          </div>
        </div>
  
        <div class="bottom_box" v-for="(item,index) in list1" :key="index">
          <div class="box_container">
            <div class="box_top">
              <img class="bottom_img" :src="imgList[1].img" alt="">
              <p class="bottom_p">{{item.type}}</p>
              <p class="bottom_title">{{item.title}}</p>
            </div>
            <div class="box_bottom">
              <div class="box_bottom_bottom" :style="{height:item.heightList+'rpx'}">
                <div class="html" v-html="item.content"></div>
              </div>
              <img :src="item.heightList?showimg:hideimg" alt="" class="arrow" @click="ChangeArrowState(index,list1)">
            </div>
          </div>
        </div>
  
  
        <div class="bottom_box" v-for="(item,index) in list2" :key="index">
          <div class="box_container">
            <div class="box_top">
              <img class="bottom_img" :src="imgList[2].img" alt="">
              <p class="bottom_p">{{item.type}}</p>
              <p class="bottom_title">{{item.title}}</p>
            </div>
            <div class="box_bottom">
              <div class="box_bottom_bottom" :style="{height:item.heightList+'rpx'}">
                <div v-html="item.content" class="html"></div>
              </div>
              <img :src="item.heightList?showimg:hideimg" alt="" class="arrow" @click="ChangeArrowState(index,list2)">
            </div>
          </div>
        </div>
  
        <div class="bottom_box" v-for="(item,index) in list3" :key="index">
          <div class="box_container">
            <div class="box_top">
              <img class="bottom_img" :src="imgList[3].img" alt="">
              <p class="bottom_p">{{item.type}}</p>
              <p class="bottom_title">{{item.title}}</p>
            </div>
            <div class="box_bottom">
              <div class="box_bottom_bottom" :style="{height:item.heightList+'rpx'}">
                <div v-html="item.content" class="html"></div>
              </div>
              <img :src="item.heightList?showimg:hideimg" alt="" class="arrow" @click="ChangeArrowState(index,list3)">
            </div>
          </div>
        </div>
  
        <div class="bottom_box" v-for="(item,index) in list4" :key="index">
          <div class="box_container">
            <div class="box_top">
              <img class="bottom_img" :src="imgList[4].img" alt="">
              <p class="bottom_p">{{item.type}}</p>
              <p class="bottom_title">{{item.title}}</p>
            </div>
            <div class="box_bottom">
              <div class="box_bottom_bottom" :style="{height:item.heightList+'rpx'}">
                <div v-html="item.content" class="html"></div>
              </div>
              <img :src="item.heightList?showimg:hideimg" alt="" class="arrow" @click="ChangeArrowState(index,list4)">
            </div>
          </div>
        </div>
  
        <div class="bottom_box" v-for="(item,index) in list5" :key="index">
          <div class="box_container">
            <div class="box_top">
              <img class="bottom_img" :src="imgList[5].img" alt="">
              <p class="bottom_p">{{item.type}}</p>
              <p class="bottom_title">{{item.title}}</p>
            </div>
            <div class="box_bottom">
              <div class="box_bottom_bottom" :style="{height:item.heightList+'rpx'}">
                <div v-html="item.content" class="html"></div>
              </div>
              <img :src="item.heightList?showimg:hideimg" alt="" class="arrow" @click="ChangeArrowState(index,list5)">
            </div>
          </div>
        </div>
  
        <div class="bottom_box" v-for="(item,index) in list6" :key="index">
          <div class="box_container">
            <div class="box_top">
              <img class="bottom_img" :src="imgList[6].img" alt="">
              <p class="bottom_p">{{item.type}}</p>
              <p class="bottom_title">{{item.title}}</p>
            </div>
            <div class="box_bottom">
              <div class="box_bottom_bottom" :style="{height:item.heightList+'rpx'}">
                <div v-html="item.content" class="html"></div>
              </div>
              <img :src="item.heightList?showimg:hideimg" alt="" class="arrow" @click="ChangeArrowState(index,list6)">
            </div>
          </div>
        </div>
  
        <div class="bottom_box" v-for="(item,index) in list7" :key="index">
          <div class="box_container">
            <div class="box_top">
              <img class="bottom_img" :src="imgList[7].img" alt="">
              <p class="bottom_p">{{item.type}}</p>
              <p class="bottom_title">{{item.title}}</p>
            </div>
            <div class="box_bottom">
              <div class="box_bottom_bottom" :style="{height:item.heightList+'rpx'}">
                <div v-html="item.content" class="html"></div>
              </div>
              <img :src="item.heightList?showimg:hideimg" alt="" class="arrow" @click="ChangeArrowState(index,list7)">
            </div>
          </div>
        </div>
  
  
  
      </div>
  
    </div>
  </div>
</template>

<script>
  import Polar from "../../components/polar";
  import {
    mapMutations,
    mapState
  } from "vuex";

  import ajax from '../../utils/ajax.js'
  import wxCharts from "../../utils/wxcharts.js";
  
  export default {
    data() {
      return {
        /**
                 * @msg: 
                 * listContent: "",//标题
                    parsecontent: "",//正文
                    listScroe: ""//分数等级
                 * @param {type} 
                 * @return: 
                 */
        // onInit: initChart,
        scoreList: [],
        asd: null,
        heightList: true,
        showimg: require("../../../static/image/bottomarrow.png"),
        hideimg: require("../../../static/image/toparrow.png"),
        score: null,
        topContent: "小主，您此次膳食调查表的得分是：",
        list: [],
        pageHeight: null,
        listHeight: 150,
        parsecontent: null,
        globalScore: null,
        imgList: [{
            img: require("../../../static/image/food.png")
          },
          {
            img: require("../../../static/image/shanshi.png")
          },
          {
            img: require("../../../static/image/egg.png")
          },
          {
            img: require("../../../static/image/zhifang.png")
          },
          {
            img: require("../../../static/image/vita.png")
          },
          {
            img: require("../../../static/image/gai.png")
          },
          {
            img: require("../../../static/image/tie.png")
          },
          {
            img: require("../../../static/image/xin.png")
          }
        ],
        list0: [{
          title: null,
          type: null,
          content: null,
          heightList: 50
        }],
        list1: [{
          title: null,
          type: null,
          content: null,
          heightList: 50
  
        }],
        list2: [{
          title: null,
          type: null,
          content: null,
          heightList: 50
        }],
        list3: [{
          title: null,
          type: null,
          content: null,
          heightList: 50
        }],
        list4: [{
          title: null,
          type: null,
          content: null,
          heightList: 50
        }],
        list5: [{
          title: null,
          type: null,
          content: null,
          heightList: 50
        }],
        list6: [{
          title: null,
          type: null,
          content: null,
          heightList: 50
        }],
        list7: [{
          title: null,
          type: null,
          content: null,
          heightList: 50
        }]
      };
    },
    components: {
      Polar
    },
    methods: {
      ...mapMutations(["ChangePolarParam"]),
      init() {
        this.globalScore = this.scoreState;
        let url = "https://wx.biergao.vip/api/survey/getassess";
        ajax.GetWithOutData(url).then((result) => {
          console.log(result);
          this.scoreList = [];
          this.ComputeScore(result);
        }).catch((err) => {
          console.log(err);
        });
      },
      touchHandler() {},
      ComputeScore(res) {
        /**
         * @msg: q 得分 w 高分档 r 低分档
         * @param {type}
         * @return:
         */
        // 计算各项分数
        let lowList = {};
  
        if (this.globalScore.assess1 >= 6) {
          (this.list0[0].title = res.data[1 - 1].assess_a),
          (this.list0[0].type = res.data[1 - 1].type1),
          (this.list0[0].content = res.data[
            1 - 1
          ].pingfenzhibiao.assess_a.replace(/16/g, "12").replace(/pt/g, "px"));
        } else if (this.globalScore.assess1 < 6 && this.globalScore.assess1 > 0) {
          (this.list0[0].title = res.data[1 - 1].assess_b),
          (this.list0[0].type = res.data[1 - 1].type2),
          (this.list0[0].content = res.data[
            1 - 1
          ].pingfenzhibiao.assess_b.replace(/16/g, "12").replace(/pt/g, "px"));
        } else {
          (this.list0[0].title = res.data[1 - 1].assess_c),
          (this.list0[0].type = res.data[1 - 1].type3),
          (this.list0[0].content = res.data[
            1 - 1
          ].pingfenzhibiao.assess_c.replace(/16/g, "12").replace(/pt/g, "px"));
        }
  
        if (this.globalScore.assess2 >= 70) {
          (this.list1[0].title = res.data[2 - 1].assess_a),
          (this.list1[0].type = res.data[2 - 1].type1),
          (this.list1[0].content = res.data[
            2 - 1
          ].pingfenzhibiao.assess_a.replace(/16/g, "12").replace(/pt/g, "px"));
        } else if (
          this.globalScore.assess2 > 15 &&
          this.globalScore.assess2 < 70
        ) {
          (this.list1[0].title = res.data[2 - 1].assess_b),
          (this.list1[0].type = res.data[2 - 1].type2),
          (this.list1[0].content = res.data[
            2 - 1
          ].pingfenzhibiao.assess_b.replace(/16/g, "12").replace(/pt/g, "px"));
        } else {
          (this.list1[0].title = res.data[2 - 1].assess_c),
          (this.list1[0].type = res.data[2 - 1].type3),
          (this.list1[0].content = res.data[
            2 - 1
          ].pingfenzhibiao.assess_c.replace(/16/g, "12").replace(/pt/g, "px"));
        }
  
        if (this.globalScore.assess3 >= 28) {
          (this.list2[0].title = res.data[3 - 1].assess_a),
          (this.list2[0].type = res.data[3 - 1].type1),
          (this.list2[0].content = res.data[
            3 - 1
          ].pingfenzhibiao.assess_a.replace(/16/g, "12").replace(/pt/g, "px"));
        } else if (
          this.globalScore.assess3 < 28 &&
          this.globalScore.assess3 > 7
        ) {
          (this.list2[0].title = res.data[3 - 1].assess_b),
          (this.list2[0].type = res.data[3 - 1].type2),
          (this.list2[0].content = res.data[
            3 - 1
          ].pingfenzhibiao.assess_b.replace(/16/g, "12").replace(/pt/g, "px"));
        } else {
          (this.list2[0].title = res.data[3 - 1].assess_c),
          (this.list2[0].type = res.data[3 - 1].type3),
          (this.list2[0].content = res.data[
            3 - 1
          ].pingfenzhibiao.assess_c.replace(/16/g, "12").replace(/pt/g, "px"));
        }
  
        if (this.globalScore.assess4 >= 13) {
          (this.list3[0].title = res.data[3 - 1].assess_a),
          (this.list3[0].type = res.data[3 - 1].type1),
          (this.list3[0].content = res.data[
            3 - 1
          ].pingfenzhibiao.assess_a.replace(/16/g, "12").replace(/pt/g, "px"));
        } else if (
          this.globalScore.assess4 < 13 &&
          this.globalScore.assess4 > 3
        ) {
          (this.list3[0].title = res.data[3 - 1].assess_b),
          (this.list3[0].type = res.data[3 - 1].type2),
          (this.list3[0].content = res.data[
            3 - 1
          ].pingfenzhibiao.assess_b.replace(/16/g, "12").replace(/pt/g, "px"));
        } else {
          (this.list3[0].title = res.data[3 - 1].assess_c),
          (this.list3[0].type = res.data[3 - 1].type3),
          (this.list3[0].content = res.data[
            3 - 1
          ].pingfenzhibiao.assess_c.replace(/16/g, "12").replace(/pt/g, "px"));
        }
  
        if (this.globalScore.assess5 >= 38) {
          (this.list4[0].title = res.data[5 - 1].assess_a),
          (this.list4[0].type = res.data[5 - 1].type1),
          (this.list4[0].content = res.data[
            5 - 1
          ].pingfenzhibiao.assess_a.replace(/16/g, "12").replace(/pt/g, "px"));
        } else if (
          this.globalScore.assess5 < 38 &&
          this.globalScore.assess5 > 11
        ) {
          (this.list4[0].title = res.data[5 - 1].assess_b),
          (this.list4[0].type = res.data[5 - 1].type2),
          (this.list4[0].content = res.data[
            5 - 1
          ].pingfenzhibiao.assess_b.replace(/16/g, "12").replace(/pt/g, "px"));
        } else {
          (this.list4[0].title = res.data[5 - 1].assess_c),
          (this.list4[0].type = res.data[5 - 1].type3),
          (this.list4[0].content = res.data[
            5 - 1
          ].pingfenzhibiao.assess_c.replace(/16/g, "12").replace(/pt/g, "px"));
        }
  
        if (this.globalScore.assess6 >= 17) {
          (this.list5[0].title = res.data[6 - 1].assess_a),
          (this.list5[0].type = res.data[6 - 1].type1),
          (this.list5[0].content = res.data[
            6 - 1
          ].pingfenzhibiao.assess_a.replace(/16/g, "12").replace(/pt/g, "px"));
        } else if (
          this.globalScore.assess6 < 17 &&
          this.globalScore.assess6 > 6
        ) {
          (this.list5[0].title = res.data[6 - 1].assess_b),
          (this.list5[0].type = res.data[6 - 1].type2),
          (this.list5[0].content = res.data[
            6 - 1
          ].pingfenzhibiao.assess_b.replace(/16/g, "12").replace(/pt/g, "px"));
        } else {
          (this.list5[0].title = res.data[6 - 1].assess_c),
          (this.list5[0].type = res.data[6 - 1].type3),
          (this.list5[0].content = res.data[
            6 - 1
          ].pingfenzhibiao.assess_c.replace(/16/g, "12").replace(/pt/g, "px"));
        }
  
        if (this.globalScore.assess7 >= 8) {
          (this.list6[0].title = res.data[7 - 1].assess_a),
          (this.list6[0].type = res.data[7 - 1].type1),
          (this.list6[0].content = res.data[
            7 - 1
          ].pingfenzhibiao.assess_a.replace(/16/g, "12").replace(/pt/g, "px"));
        } else if (this.globalScore.assess7 < 8 && this.globalScore.assess7 > 3) {
          (this.list6[0].title = res.data[7 - 1].assess_b),
          (this.list6[0].type = res.data[7 - 1].type2),
          (this.list6[0].content = res.data[
            7 - 1
          ].pingfenzhibiao.assess_b.replace(/16/g, "12").replace(/pt/g, "px"));
        } else {
          (this.list6[0].title = res.data[7 - 1].assess_c),
          (this.list6[0].type = res.data[7 - 1].type3),
          (this.list6[0].content = res.data[
            7 - 1
          ].pingfenzhibiao.assess_c.replace(/16/g, "12").replace(/pt/g, "px"));
        }
  
        if (this.globalScore.assess8 >= 10) {
          (this.list7[0].title = res.data[8 - 1].assess_a),
          (this.list7[0].type = res.data[8 - 1].type1),
          (this.list7[0].content = res.data[
            8 - 1
          ].pingfenzhibiao.assess_a.replace(/16/g, '12').replace(/pt/g, "px"));
        } else if (
          this.globalScore.assess8 < 10 &&
          this.globalScore.assess8 > 4
        ) {
          (this.list7[0].title = res.data[8 - 1].assess_b),
          (this.list7[0].type = res.data[8 - 1].type2),
          (this.list7[0].content = res.data[
            8 - 1
          ].pingfenzhibiao.assess_b.replace(/16/g, '12').replace(/pt/g, "px"));
        } else {
          (this.list7[0].title = res.data[8 - 1].assess_c),
          (this.list7[0].type = res.data[8 - 1].type3),
          (this.list7[0].content = res.data[
            8 - 1
          ].pingfenzhibiao.assess_c.replace(/16/g, '12').replace(/pt/g, "px"));
        }
        console.log(`执行了列表`);
      },
      ChangeArrowState(index, item) {
        console.log(`点击了箭头`);
        console.log(item);
        if (item[0].heightList) {
          console.log(`xiao`);
          item[0].heightList = null;
        } else {
          console.log(`da`);
          item[0].heightList = 50;
        }
      },
      ChangePageHight() {
        //创建节点选择器
        var query = wx.createSelectorQuery();
        //选择id
        query.select("#resultpage").boundingClientRect();
        query.exec(res => {
          this.pageHeight = res[0].bottom;
        });
      },
      ComputePolarParam(x) {
        let scoreLL = [];
        this.list = [];
        scoreLL[0] = (x[0] / 6 * 100).toFixed(0);
        scoreLL[1] = (x[1] / 78 * 100).toFixed(0);
        scoreLL[2] = (x[2] / 33 * 100).toFixed(0);
        scoreLL[3] = (x[3] / 15 * 100).toFixed(0);
        scoreLL[4] = (x[4] / 44 * 100).toFixed(0);
        scoreLL[5] = (x[5] / 20 * 100).toFixed(0);
        scoreLL[6] = (x[6] / 10 * 100).toFixed(0);
        scoreLL[7] = (x[7] / 12 * 100).toFixed(0);
        for (let i = 0; i < 8; i++) {
          this.list.push(scoreLL[i]);
        }
        console.log(this.list);
      },
      qwe() {
        let res = wx.getSystemInfoSync();
        let windowWidth = res.windowWidth;
        console.log(windowWidth);
        let radarChart = new wxCharts({
          canvasId: "radarCanvas",
          type: "radar",
          categories: [
            "食物种类",
            "膳食结构",
            "蛋白",
            "脂肪酸",
            "维生素A、D",
            "钙",
            "铁",
            "锌"
          ],
          series: [{
            name: "",
            color: "#FF8C00",
            data: this.list
          }],
          width: windowWidth,
          height: 200,
          extra: {
            radar: {
              max: 100,
              labelColor: "#ffffff"
            }
          }
        });
      }
    },
  
    computed: {
      ...mapState(["polarParam", "scoreState"])
    },
    onLoad(x) {
      this.score = x.score;
      this.ChangePageHight();
      this.init();
      console.log(`onload`);
    },
    onReady() {
      console.log(`ready`);
      this.ComputePolarParam(this.polarParam);
      this.qwe();
    }
  };
</script>

<style scoped>
  .box_bottom {
    margin-top: 20rpx;
    padding-bottom: 100rpx;
  }
  
  .arrow {
    width: 60rpx;
    height: 60rpx;
    text-align: center;
    position: absolute;
    bottom: 3%;
    left: 50%;
    transform: translate(-50%, -10%);
  }
  
  .box_bottom_bottom {
    font-size: 20rpx;
    color: white;
    overflow: hidden;
  }
  
  .bottom_box {
    position: relative;
    border-bottom: 2px solid #999;
  }
  
  .box_container {
    width: 95%;
    margin: 0 auto;
  }
  
  .box_top {
    padding-top: 50px;
    color: white;
  }
  
  .bottom_img {
    width: 80rpx;
    height: 80rpx;
    display: inline-block;
    vertical-align: top;
  }
  
  .bottom_p {
    display: inline-block;
    font-size: 60rpx;
    vertical-align: top;
    margin-left: 20rpx;
  }
  
  .bottom_title {
    line-height: 80rpx;
    width: 500rpx;
    display: inline-block;
    font-size: 35rpx;
    vertical-align: top;
    margin-left: 20rpx;
  }
  
  .middle_content {
    text-align: center;
    color: white;
    margin-bottom: 40rpx;
  }
  
  .contianer_middle {
    margin-top: 50rpx;
    border-bottom: 2rpx solid #999;
  }
  
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
    margin-bottom: 50rpx;
    text-align: center;
    color: white;
  }
  
  .echarts-wrap {
    width: 100%;
    height: 300px;
    margin-bottom: 30rpx;
  }
  
  .canvas {
    margin-top: 3vh;
    height: 200px;
    width: 100vw;
    margin-bottom: 5vh;
  }
</style>
