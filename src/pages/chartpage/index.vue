<template>
  <div class="chartpage">
    <div class="pickbox">
      <picker @change="ChangeChildren($event)" :value="index" :range="childrenList" class="pick">
        <view class="picker">
          {{childrenList[index]}}
        </view>
      </picker>
      <div style="height:8rpx;"></div>
    </div>
    <!-- <Echarts></Echarts> -->
    <div class="echarts-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="HandleInit" ref="echarts" />
    </div>
    <div class="chartpage_bottom">
      <div class="bottom_button">
        <img class="btn" src="../../../static/image/add.png" alt="" @click="ChangeHightNow">
      </div>
      <div class="bottom_content">
        <p class="content_p">连续添加数据，</p>
        <p class="content_p">即可自动生成您或（孩子）的身高曲线图，</p>
        <p class="content_p">根据曲线图判断您或（孩子）生长情况。</p>
      </div>
    </div>
  </div>
</template>



<script>
  import {
    mapMutations,
    mapState
  } from "vuex";
  import request from "../../utils/api.js";
  import echarts from "echarts";
  import mpvueEcharts from "mpvue-echarts";
  import {
    man,
    woman
  } from "../../utils/data.js";
  let chart = null;
  export default {
    data() {
      return {
        childrenList: [],
        index: 99,
        childrenInfolist: [],
        echarts,
        option: null,
        childrenSex: null,
        childrenAge: null,
        normalHight: [],
        perfectHight: [],
        lowHight: [],
        youHightlist: [],
        agelist: this.sage,
        sexlist: this.ssex,
        chart: null,
        id: [],
        nowHeightneed:null
      };
    },
    components: {
      mpvueEcharts
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
      ChangeChildren(e) {
        this.youHightlist = [];
        this.index = e.mp.detail.value;
        this.Requesta()
      },
  
  
      Requesta() {
        let url2 = `https://wx.biergao.vip/api/Child/clist/`;
        let data2 = {
          cid: this.id[this.index]
        };
        request.Post(url2, data2, res => {
          let list = [];
          for (let i = 0; i < 12; i++) {
            list.push(res.data[i].nowheight);
          }
          this.nowHeightneed=res.data[0].nowheight
          this.childrenSex = this.childrenInfolist[this.index].sex;
          this.childrenAge = this.childrenInfolist[this.index].age;
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
              data: list
            }
          ];
          chart.setOption(this.option);
        });
      },
  
  
      init() {
        //  请求获取孩子的数量和信息，获取成功push到childrenList中,获取年龄和性别，还有自己的身高
        // 如今之后第一次更新图表
        let url1 = `https://wx.biergao.vip/api/Child/childlist`;
        let data1 = {
          openid: this.userParam.openId
        };
        request.Post(url1, data1, res => {
          if (this.childrenList.length ==0) {
            for (let i = 0; i < res.data.length; i++) {
              this.childrenList.push(res.data[i].name);
              this.id.push(res.data[i].id);
            }
          }
          this.childrenInfolist = res.data;
          this.index = 0
          this.Requesta()
        });
      },
      EchartsDefaultParam() {
        this.childrenSex = 0;
        this.childrenAge = 1;
        this.youHightlist = [];
      },
      ChangeHightNow() {
        wx.navigateTo({
          url: `/pages/changehight/main?hight=${
            this.nowHeightneed
          }&id=${this.childrenInfolist[this.index].id}&openId=${
            this.childrenInfolist[this.index].pid
          }&name=${
            this.childrenInfolist[this.index].name
          }`
        });
      }
    },
    created() {
      this.EchartsDefaultParam();
    },
    mounted() {
      this.InitChart();
      this.ChangeData();
      this.init();
    },
    computed: {
      ...mapState([ "userParam"])
    },
  };
</script>

<style scoped>
  .chartpage_bottom {
    margin-top: 30rpx;
  }
  
  .bottom_button {
    text-align: center;
  }
  
  .bottom_content {
    margin-top: 20rpx;
  }
  
  .content_p {
    color: #999;
    font-size: 30rpx;
    text-align: center;
  }
  
  .btn {
    width: 50rpx;
    height: 50rpx;
    background-color: rgb(250, 124, 34);
    border-radius: 80rpx;
    padding: 20rpx;
  }
  
  .echarts-wrap {
    width: 100%;
    height: 300px;
  }
  
  .pick {
    color: rgb(227, 139, 39);
    text-align: center;
    background-color: white;
    width: 90%;
    margin: 0 auto;
    border-radius: 30rpx;
    padding: 10rpx 0px;
    margin-bottom: 5rpx;
  }
  
  .pickbox {
    background-color: blue;
  }
</style>
