

<template>
    <div class="echarts-wrap">
        <mpvue-echarts :echarts="echarts" :onInit="HandleInit" ref="echarts" />
    </div>
</template>

<script>
    import echarts from 'echarts'
    import mpvueEcharts from 'mpvue-echarts'
    import {
        man,
        woman
    } from '../utils/data.js'
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
                childrenSex: null,
                childrenAge: null,
                normalHight: [],
                perfectHight: [],
                lowHight: [],
                youHightlist: [],
                agelist: this.sage,
                sexlist: this.ssex,
                chart: null
            }
        },
        methods: {
            InitChart() {
                let timeList = []
                let yearnow = new Date().getFullYear()
                let monthnow = new Date().getMonth() + 1
                for (let i = monthnow; i <= 12; i++) {
                    timeList.push(`${yearnow}年/${i}月`)
                    if (i == 12) {
                        for (let z = 0; z <= monthnow - 1; z++) {
                            timeList.push(`${yearnow+1}年/${z+1}月`)
                        }
                    }
                }
                this.option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        itemWidth: 10,
                        itemHeight: 7,
                        data: ['正常身高', '完美身高', '矮小身高', '你的身高'],
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
                            type: 'inside',
                            realtime: true,
                            start: 0,
                            end: 50
                        }
                    ],
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        data: timeList
                    }],
                    yAxis: [{
                        type: 'value',
                        max: 190,
                        min: 70
                    }],
                    series: [{
                            name: '正常身高',
                            type: 'line',
                            data: this.normalHight
                        },
                        {
                            name: '完美身高',
                            type: 'line',
                            data: this.perfectHight
                        },
                        {
                            name: '矮小身高',
                            type: 'line',
                            data: this.lowHight
                        },
                        {
                            name: '你的身高',
                            type: 'line',
                            data: this.youHightlist
                        },
                    ]
                };
    
                this.$refs.echarts.init()
            },
            // 已经会使用了鸭
            HandleInit(canvas, width, height) {
                chart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                })
                canvas.setChart(chart)
                this.ChangeNumber()
                chart.setOption(this.option)
                return chart
            },
    
            HightComputed(x, y, z) {
                let age = JSON.parse(this.childrenAge)
                let num = z[x][`${age+1}`] - z[x][`${age}`]
                let fixNum = num.toFixed(1) / 12
                for (let i = 0; i <= 12; i++) {
                    let item = JSON.parse(z[x][`${age}`]) + i * fixNum
                    y.push(item.toFixed(1))
                }
            },
            ChangeData() {
                this.normalHight = []
                this.perfectHight = []
                this.lowHight = []
                this.youHightlist = []
                if (this.childrenSex == 1) {
                    let mandata = man
                    this.HightComputed(0, this.normalHight, mandata)
                    this.HightComputed(1, this.perfectHight, mandata)
                    this.HightComputed(2, this.lowHight, mandata)
                    this.youHightlist.push(this.youHight)
                } else {
                    let womandata = woman
                    this.HightComputed(0, this.normalHight, womandata)
                    this.HightComputed(1, this.perfectHight, womandata)
                    this.HightComputed(2, this.lowHight, womandata)
                    // this.youHightlist.push(this.youHight)
                    this.youHightlist=this.youHight
                }
            },
            ChangeNumber() {
                // 直接修改option就可以
                this.option.series = [{
                        name: '正常身高',
                        type: 'line',
                        data: this.normalHight
                    },
                    {
                        name: '完美身高',
                        type: 'line',
                        data: this.perfectHight
                    },
                    {
                        name: '矮小身高',
                        type: 'line',
                        data: this.lowHight
                    },
                    {
                        name: '你的身高',
                        type: 'line',
                        data: this.youHightlist
                    },
                ]
            }
        },
        computed: {
            ...mapState(['chartAge', 'chartSex', 'youHight', 'childrenIndex'])
        },
        mounted() {
            this.InitChart()
            this.ChangeData()
        },
    
        /**
         * @msg:  每次调用的时候需要给定年龄和性别
         * @param {type} 
         * @return: 
         */
        onLoad(x) {
            /**
             * @msg: sex:1是男 2是女 
             * @param {type} 
             * @return: 
             */
            this.childrenSex = this.chartSex
            this.childrenAge = this.chartAge
            
            
    
        },
        watch: {
            childrenIndex(x) {
                console.log(this.youHight);
                
                this.youHightlist=this.youHight
                this.childrenSex = this.chartSex
                this.childrenAge = this.chartAge
                this.ChangeData()
                this.option.series = [{
                        name: '正常身高',
                        type: 'line',
                        data: this.normalHight
                    },
                    {
                        name: '完美身高',
                        type: 'line',
                        data: this.perfectHight
                    },
                    {
                        name: '矮小身高',
                        type: 'line',
                        data: this.lowHight
                    },
                    {
                        name: '你的身高',
                        type: 'line',
                        data: this.youHightlist
                    },
                ]
                console.log(this.youHightlist);
                chart.setOption(this.option)
            }
        }
    }
</script>


<style scoped>
    .echarts-wrap {
        width: 100%;
        height: 300px;
    }
</style>
