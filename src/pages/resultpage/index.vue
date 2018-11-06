<template>
  <div class="resultpage" id="resultpage">
    <!-- <img src="" alt="" class="bgi" :style="{height:pageHeight+'px'}"> -->
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
        <div class="echarts-wrap">
          <mpvue-echarts :echarts="echarts" :onInit="HandleInit" ref="echarts" />
        </div>
      </div>
      <div class="container_bottom">
        <div class="bottom_box" v-for="(item,index) in scoreList" :key="index">
          <div class="box_container">
            <div class="box_top">
              <img class="bottom_img" :src="item.img" alt="">
              <p class="bottom_p">{{item.listScroe}}</p>
              <p class="bottom_title">{{item.listContent}}</p>
            </div>
            <div class="box_bottom">
              <!-- <p class="box_bottom_bottom" :style="{height:listHeight+'rpx'}">{{content}}</p> -->
              <div class="box_bottom_bottom" :style="{height:item.heightList+'rpx'}">
                <wxParse :content="item.parsecontent" id="a" />
                <!-- <div class="a">{{asd}}</div> -->
              </div>
              <img :src="item.listisshow?showimg:hideimg" alt="" class="arrow" @click="ChangeArrowState(index)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Polar from "../../components/polar";
import { mapMutations, mapState } from "vuex";
import echarts from "echarts";
import mpvueEcharts from "mpvue-echarts";
import request from "../../utils/api.js";
import wxParse from "mpvue-wxparse";
let chart = null;
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
      scoreList: [],
      asd: null,
      listisshow: true,
      showimg: require("../../../static/image/bottomarrow.png"),
      hideimg: require("../../../static/image/toparrow.png"),
      score: 100,
      topContent: "小主，您此次膳食调查表的得分是：",
      echarts,
      option: null,
      list: [],
      pageHeight: null,
      listHeight: 150,
      parsecontent: null,
      globalScore: null,
      imgList: [
        {
          img: require("../../../static/image/food.png")
        },
        {
          img: require("../../../static/image/shanshi.png")
        },
        {
          img: require("../../../static/image/egg.png")
        }
        ,
        {
          img: require("../../../static/image/zhifang.png")
        }
        ,
        {
          img: require("../../../static/image/vita.png")
        }
        ,
        {
          img: require("../../../static/image/gai.png")
        }
        ,
        {
          img: require("../../../static/image/tie.png")
        }
        ,
        {
          img: require("../../../static/image/xin.png")
        }
      ]
    };
  },
  components: {
    Polar,
    mpvueEcharts,
    wxParse
  },
  methods: {
    ...mapMutations(["ChangePolarParam"]),
    init() {
      this.globalScore = this.scoreState;
      let url = "https://wx.biergao.vip/api/survey/getassess";
      request.api(url, res => {
        //第一题计算等级
        this.ComputeScore(this.globalScore.assess1, 6, 0, res, 0);
        //第二题计算等级
        this.ComputeScore(this.globalScore.assess2, 70, 15, res, 1);
        //第三题计算等级
        this.ComputeScore(this.globalScore.assess3, 28, 7, res, 2);
        //第四题计算等级
        this.ComputeScore(this.globalScore.assess4, 13, 3, res, 3);
        //第五题计算等级
        this.ComputeScore(this.globalScore.assess5, 38, 11, res, 4);
        //第六题计算等级
        this.ComputeScore(this.globalScore.assess6, 17, 6, res, 5);
        //第七题计算等级
        this.ComputeScore(this.globalScore.assess7, 8, 3, res, 6);
        //第八题计算等级··
        this.ComputeScore(this.globalScore.assess8, 10, 4, res, 7);
      });
    },

    ComputeScore(q, w, e, res, index) {
      /**
       * @msg: q 得分 w 高分档 r 低分档
       * @param {type}
       * @return:
       */
      // 计算各项分数
      let lowList = {};
      if (q >= w) {
        console.log("zuigao");
        lowList.listContent = res.data[index].assess_a;
        lowList.parsecontent = res.data[index].pingfenzhibiao.assess_a.replace(
          /16/g,
          "12"
        );
        lowList.listScroe = res.data[index].type1;
        lowList.img = this.imgList[index].img;
        lowList.heightList = this.listHeight;
        lowList.listisshow=true
        this.scoreList.push(lowList);
      } else if (q <= e) {
        console.log("zuidi");
        lowList.listContent = res.data[index].assess_c;
        lowList.parsecontent = res.data[index].pingfenzhibiao.assess_c.replace(
          /16/g,
          "12"
        );
        lowList.listScroe = res.data[index].type3;
        lowList.img = this.imgList[index].img;
        lowList.heightList = this.listHeight;
        lowList.listisshow=true
        this.scoreList.push(lowList);
      } else {
        console.log("zhongjan");
        lowList.listContent = res.data[index].assess_b;
        lowList.parsecontent = res.data[index].pingfenzhibiao.assess_b.replace(
          /16/g,
          "12"
        );
        lowList.listScroe = res.data[index].type2;
        lowList.img = this.imgList[index].img;
        lowList.heightList = this.listHeight;
        lowList.listisshow=true
        this.scoreList.push(lowList);
      }
    },
    ChangeArrowState(index) {
      if (this.scoreList[index].listisshow) {
        this.scoreList[index].heightList = null;
        this.scoreList[index].listisshow=false
      } else {
        this.scoreList[index].heightList = 150;
        this.scoreList[index].listisshow=true
      }
      
    },
    InitChart() {
      this.option = {
        color: ["white"],
        textStyle: {
          color: "#fff"
        },
        tooltip: {
          trigger: "axis"
        },

        polar: [
          {
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(0,0,0,0)"]
                // 图表背景网格的颜色
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: ["white"]
                // 图表背景网格线的颜色
              }
            },
            indicator: [
              {
                text: "食物种类",
                max: 100
              },
              {
                text: "锌",
                max: 100
              },
              {
                text: "铁",
                max: 100
              },
              {
                text: "钙",
                max: 100
              },
              {
                text: "维生素A、D",
                max: 100
              },
              {
                text: "脂肪酸",
                max: 100
              },
              {
                text: "蛋白",
                max: 100
              },
              {
                text: "膳食结构",
                max: 100
              }
            ]
          }
        ],
        calculable: true,
        series: [
          {
            name: "营养参数",
            type: "radar",
            data: [
              {
                value: this.list,
                name: "营养参数"
              }
            ]
          }
        ]
      };

      this.$refs.echarts.init();
    },
    // 已经会使用了鸭
    HandleInit(canvas, width, height) {
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(this.option);
      return chart;
    },
    ChangePageHight() {
      //创建节点选择器
      var query = wx.createSelectorQuery();
      //选择id
      query.select("#resultpage").boundingClientRect();
      query.exec(res => {
        this.pageHeight = res[0].bottom;
      });
    }
  },
  computed: {
    ...mapState(["polarParam", "scoreState"])
  },
  mounted() {
    this.list = this.polarParam;
    this.InitChart();
    this.ChangePageHight();
    this.init();
  }
};
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.resultpage {
  background-image: url("https://wx.biergao.vip/uploads/b/201805/nutrition.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -moz-background-size: 100% 100%;
}

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

#a {
  color: red;
  font-size: 15px;
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
  margin-top: 50rpx;
  text-align: center;
  background: linear-gradient(to left, #ff8c00, #fff);
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
  -webkit-background-clip: text;
  color: transparent;
}

.score_s {
  display: inline-block;
  font-size: 40rpx;
  background: linear-gradient(to left, #ff8c00, #fff);
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
</style>
