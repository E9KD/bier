<template>
  <div class="echarts-wrap">
    <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas"/>
    <button @click="click">click</button>
  </div>
</template>

<script>
import echarts from "echarts";
import mpvueEcharts from "mpvue-echarts";

let chart = null;
let list = [10, 20, 30];
let option = {
  tooltip: {
    trigger: "axis"
  },
  legend: {
    itemWidth: 10,
    itemHeight: 7,
    data: ["正常身高", "完美身高", "矮小身高", "你的身高"],
    itemGap: 5
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      handleSize: false,
      start: 0,
      end: 50,
      default: false
    },
    {
      type: "slider",
      realtime: true,
      start: 0,
      end: 50
    }
  ],
  calculable: true,
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: [111, 150, 200]
    }
  ],
  yAxis: [
    {
      type: "category",
      // max: 'dataMax',
      // min: 'dataMax',
      nameGap: 0
    }
  ],
  series: [
    {
      name: "正常身高",
      type: "line",
      data: list
    },
    {
      name: "完美身高",
      type: "line",
      data: [40, 50, 60]
    },
    {
      name: "矮小身高",
      type: "line",
      data: [70, 80, 90]
    },
    {
      name: "你的身高",
      type: "line",
      data: [100, 110, 120]
    }
  ]
}; // ECharts 配置项
function initChart(canvas, width, height) {
  console.log(123123123);
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  chart.setOption(option);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}
export default {
  components: {
    mpvueEcharts
  },
  data() {
    return {
      echarts,
      onInit: initChart
    };
  },
  methods: {
    click() {
      let arr = [22, 23, 24];
      option.series[0].data = arr;
      chart.setOption(option);
    }
  },
  onLoad() {}
};
</script>
<style scoped>
.can {
  width: 100vw;
  height: 400px;
}

.echarts-wrap {
  width: 100%;
  height: 300px;
}
</style>
