<template>
  <div class="childrenreport">
    <div class="report_top">
      <div class="top_one">
        <div class="box_a loader8"></div>
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
              <p v-if="type2==1"><i style="display:inline-block">·</i>当前身高，高于理想身高<i style="color:rgb(227, 139, 39)">{{reportHight2}}</i>CM,通过科学干预，身高将突破遗传，达到<i style="color:rgb(227, 139, 39)">{{hightHight}}</i>CM</p>
              <p v-if="type2==2"><i style="display:inline-block">·</i>当前身高，低于理想身高<i style="color:rgb(227, 139, 39)">{{reportHight2}}</i>CM,通过科学干预，身高将突破遗传，达到<i style="color:rgb(227, 139, 39)">{{hightHight}}</i>CM</p>
            </div>
            <div class="context_bottom">
              <p>·若后天身高管理不善，身高将低于遗传身高，下降至身高下限<i style="color:rgb(227, 139, 39)">{{lowerHight}}</i>CM</p>
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
          <div class="echarts-wrap">
            <mpvue-echarts :echarts="echarts" :onInit="HandleInit" ref="echarts" />
          </div>
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
  import Datelist from "../../components/datelist";
  import ajax from '../../utils/ajax.js'
  import echarts from "echarts";
  import mpvueEcharts from "mpvue-echarts";
  import {
    man,
    woman
  } from "../../utils/data.js";
  import {
    mapState
  } from "vuex";
  let chart = null;
  export default {
    data() {
      return {
        num: null,
        id: null,
        heightEnd: 170,
        fuckHight: null,
        type1: 1,
        type2: 2,
        reportHight1: null,
        reportHight2: null,
        hightHight: null,
        lowerHight: null,
        hopeHight: null,
        // 图表参数
        echarts,
        option: null,
        childrenSex: null,
        childrenAge: null,
        normalHight: [],
        perfectHight: [],
        lowHight: [],
        youHightlist: [],
        chart: null
      };
    },
    components: {
      mpvueEcharts,
      Datelist
    },
    methods: {
      InitChart() {
        let timeList = [];
        let yearnow = new Date().getFullYear();
        let monthnow = new Date().getMonth() + 1;
        for (let i = monthnow; i <= 12; i++) {
          timeList.push(`${yearnow}年/${i}月`);
          if (i == 12) {
            for (let z = 0; z <= monthnow - 1; z++) {
              timeList.push(`${yearnow + 1}年/${z + 1}月`);
            }
          }
        }
        this.option = {
          tooltip: {
            trigger: "axis"
          },
          legend: {
            itemWidth: 10,
            itemHeight: 7,
            data: ["正常身高", "完美身高", "矮小身高", "你的身高"],
            itemGap: 5
          },
          dataZoom: [{
              show: true,
              realtime: true,
              handleSize: false,
              start: 0,
              end: 50
            },
            {
              type: "inside",
              realtime: true,
              start: 0,
              end: 50
            }
          ],
          calculable: true,
          xAxis: [{
            type: "category",
            boundaryGap: true,
            data: timeList
          }],
          yAxis: [{
            type: "value"
            // max: 190,
            // min: 40
          }],
          series: [{
              name: "正常身高",
              type: "line",
              data: this.normalHight
            },
            {
              name: "完美身高",
              type: "line",
              data: this.perfectHight
            },
            {
              name: "矮小身高",
              type: "line",
              data: this.lowHight
            },
            {
              name: "你的身高",
              type: "line",
              data: this.youHightlist
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
        this.ChangeNumber();
        chart.setOption(this.option);
        return chart;
      },
  
      HightComputed(x, y, z) {
        let age = JSON.parse(this.childrenAge);
        let num = z[x][`${age + 1}`] - z[x][`${age}`];
        let fixNum = num.toFixed(1) / 12;
        for (let i = 0; i <= 12; i++) {
          let item = JSON.parse(z[x][`${age}`]) + i * fixNum;
          y.push(item.toFixed(1));
        }
      },
      ChangeData() {
        this.normalHight = [];
        this.perfectHight = [];
        this.lowHight = [];
        if (this.childrenSex == 1) {
          let mandata = man;
          this.HightComputed(0, this.normalHight, mandata);
          this.HightComputed(1, this.perfectHight, mandata);
          this.HightComputed(2, this.lowHight, mandata);
        } else {
          let womandata = woman;
          this.HightComputed(0, this.normalHight, womandata);
          this.HightComputed(1, this.perfectHight, womandata);
          this.HightComputed(2, this.lowHight, womandata);
        }
      },
      ChangeNumber() {
        // 直接修改option就可以
        this.option.series = [{
            name: "正常身高",
            type: "line",
            data: this.normalHight
          },
          {
            name: "完美身高",
            type: "line",
            data: this.perfectHight
          },
          {
            name: "矮小身高",
            type: "line",
            data: this.lowHight
          },
          {
            name: "你的身高",
            type: "line",
            data: this.youHightlist
          }
        ];
      },
      EchartsDefaultParam() {
        this.childrenSex = 0;
        this.childrenAge = 1;
        this.youHightlist = [];
      },
      init() {
        //  请求获取孩子的数量和信息，获取成功push到childrenList中,获取年龄和性别，还有自己的身高
        // 如今之后第一次更新图表
        this.Requesta();
      },
      Requesta() {
        let url2 = `https://wx.biergao.vip/api/Child/clist/`;
        let data2 = {
          cid: this.id
        };
        ajax.Post(url2, data2).then((result) => {
          this.youHightlist = [];
          for (let i = 0; i < 12; i++) {
            this.youHightlist.push(result[i].nowheight);
          }
          // x 当前身高 y 正常身高 z 期望身高 m 完美身高
          this.ComputedType(
            this.youHightlist[0],
            this.normalHight[0],
            this.hopeHight,
            this.perfectHight[0]
          );
          this.ChangeData();
          this.option.series = [{
              name: "正常身高",
              type: "line",
              data: this.normalHight
            },
            {
              name: "完美身高",
              type: "line",
              data: this.perfectHight
            },
            {
              name: "矮小身高",
              type: "line",
              data: this.lowHight
            },
            {
              name: "你的身高",
              type: "line",
              data: this.youHightlist
            }
          ];
          chart.setOption(this.option);
        }).catch((err) => {
          console.log(err);
        });
  
  
  
      },
      ComputedType(x, y, z, m) {
        // x 当前身高 y 正常身高 z 期望身高 q 完美身高
        let p = x - m;
        let q = x - y;
        let w = x - z;
        if (p == 0) {
          this.fuckHight = '正常'
        } else if (p > 0) {
          this.fuckHight = '超高'
        } else if (p < 0) {
          this.fuckHight = '矮小'
        }
        if (q == 0) {
          this.type1 = 0;
        } else if (q > 0) {
          this.reportHight1 = q.toFixed(1);
          this.type1 = 1;
        } else if (q < 0) {
          this.reportHight1 = q.toFixed(1);
          this.type1 = 2;
        }
        if (w == 0) {
          this.type2 = 0;
        } else if (w > 0) {
          this.reportHight2 = w.toFixed(1);
          this.type2 = 1;
        } else if (w < 0) {
          this.reportHight2 = w.toFixed(1);
          this.type2 = 2;
        }
      }
    },
    computed: {
      ...mapState(["userParam"])
    },
    created() {
      this.EchartsDefaultParam();
    },
    mounted() {
      this.InitChart();
      this.ChangeData();
      this.init();
    },
    onLoad(x) {
      this.childrenSex = x.sex;
      this.childrenAge = x.age;
      this.id = x.id;
      this.hopeHight = x.hh;
      this.hightHight = x.hg;
      this.lowerHight = x.hd;
      this.heightEnd = (parseFloat(this.hightHight) + parseFloat(this.lowerHight)) / 2
    }
  };
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
  
  .echarts-wrap {
    width: 100%;
    height: 300px;
  }
</style>
