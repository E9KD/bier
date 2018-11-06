

<template>
    <div class="echarts-wrap">
        <mpvue-echarts :echarts="echarts" :onInit="HandleInit" ref="echarts" />
    </div>
</template>

<script>
    import echarts from "echarts";
    import mpvueEcharts from "mpvue-echarts";
    import {
        mapState
    } from 'vuex';
    let chart = null;
    export default {
        components: {
            mpvueEcharts
        },
        data() {
            return {
                echarts,
                option: null,
                list: [100,100,100,100,100,100,100,100]
            };
        },
        methods: {
            InitChart() {
                this.option = {
                    color: ["white"],
                    textStyle: {
                        color: "#fff"
                    },
                    tooltip: {
                        trigger: "axis"
                    },
    
                    polar: [{
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
                        indicator: [{
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
                    }],
                    calculable: true,
                    series: [{
                        name: "营养参数",
                        type: "radar",
                        data: [{
                            value: this.list,
                            name: "营养参数"
                        }]
                    }]
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
            }
        },
        computed: {
            ...mapState(['polarParam'])
        },
        mounted() {
            this.InitChart();
        },
    
        onLoad(x) {
            
        },
    };
</script>


<style scoped>
    body {
        background-color: blue;
    }
    
    .echarts-wrap {
        width: 100%;
        height: 250px;
        background-color: blue;
    }
</style>
