<template>
    <div class="tools">
        <div class="toolsbox">
            <div class="toolsrow">
                <div class="toolscol" style="margin-right: 2vw;" @click="GOHightPre">
                    <div class="toolstext">
                        <img src="/static/image/icon1.png" alt="" srcset="" class="toolsimg">
                        <p class="toolstitle">身高预测<span></span></p>
                        <p class=" toolen">HEIGHT&nbsp;PREDICTION<span></span></p>
                    </div>
                </div>
                <div class="toolscol" @click="GoChart">
                    <div class="toolstext">
                        <img src="/static/image/icon2.png" alt="" srcset="" class="toolsimg">
                        <p class="toolstitle">生长曲线<span></span></p>
                        <p class=" toolen">GROWTH&nbsp;CURVE<span></span></p>
                    </div>
                </div>
            </div>
            <div class="toolsrow">
                <div class="toolscol" style="margin-right: 2vw;" @click="GoTeacherInfo">
                    <div class="toolstext">
                        <img src="/static/image/icon3.png" alt="" srcset="" class="toolsimg">
                        <p class="toolstip">一对一</p>
                        <p class="toolstitle">长高服务<span></span></p>
                        <p class=" toolen">HEIGHT&nbsp;PREDICTION<span></span></p>
                    </div>
                </div>
                <div class="toolscol" @click="asd">
                    <div class="toolstext">
                        <img src="/static/image/icon4.png" alt="" srcset="" class="toolsimg">
                        <p class="toolstip">长高</p>
                        <p class="toolstitle">打卡计划<span></span></p>
                        <p class=" toolen">A &nbsp;GROW&nbsp;PLAN<span></span></p>
                    </div>
                </div>
            </div>
            <div class="toolstapbox" @click="GoToolsPage">
                <div class="toolstap">
                    <div class="toolscenter">
                        <p class="toolscenterhead">TOOLS</p>
                        <p class="toolscentertext">身高管理工具</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            GoToolsPage() {
                wx.navigateTo({
                    url: '/pages/toolspage/main'
                })
            },
            GOHightPre() {
                wx.navigateTo({
                    url: '/pages/hightpre/main'
                })
            },
            GoTeacherInfo() {
                wx.switchTab({
                    url: '/pages/serve/main'
                })
            },
            GoChart() {
                wx.navigateTo({
                    url: '/pages/chartpage/main'
                })
            },
            asd() {
                // wx.navigateTo({
                //     url: `/pages/toolspage/main`
                // })
                wx.navigateTo({
                    url: `/pages/chart/main`
                })
            }
        },
    }
</script>

<style>
    .toolen {
        text-align: justify;
        font-size: 20rpx;
    }
    
    .toolen>span {
        display: inline-block;
        padding-left: 100%;
    }
    
    .tools {
        height: 60vh;
        width: 100%;
        background-color: #eeeeee;
        /* margin-top: 30rpx; */
    }
    
    .toolsbox {
        height: 56vh;
        width: 96vw;
        padding: 2vh 2vw;
        position: relative;
    }
    
    .toolsrow {
        height: 27.5vh;
        margin-bottom: 1vh;
        width: 100%;
    }
    
    .toolscol {
        width: 47vw;
        background-color: white;
        height: 100%;
        display: inline-block;
        position: relative;
    }
    
    .toolstapbox {
        width: 250rpx;
        height: 250rpx;
        border-radius: 200rpx;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #eee;
    }
    
    .toolstap {
        width: 220rpx;
        height: 220rpx;
        border-radius: 250rpx;
        background-color: #ec881d;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .toolstext {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    
    .toolsimg {
        width: 60rpx;
        height: 60rpx;
        margin: 0 auto;
        display: block;
        margin-bottom: 10rpx;
    }
    
    .toolstitle {
        font-size: 35rpx;
        text-align: justify;
        height: 20px;
    }
    
    .toolstitle>span {
        display: inline-block;
        padding-left: 100%;
    }
    
    .toolstip {
        font-size: 20rpx;
        text-align: center
    }
    
    .toolscenter {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .toolscenterhead {
        font-size: 30rpx;
        color: white;
        text-align: center;
    }
    
    .toolscentertext {
        font-size: 24rpx;
        color: white;
        white-space: nowrap;
    }
</style>
