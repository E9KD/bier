<template>
    <div class="tools">
        <div class="toolsbox">
            <div class="toolsrow">
                <div class="toolscol" style="margin-right: 2vw;" @click="GOHightPre">
                    <div class="toolstext">
                        <img src="/static/image/icon1.png" alt="" srcset="" class="toolsimg">
                        <p class="toolstitle">身高预测</p>
                        <p class="toolstip">HEIGHT&nbsp;PREDICTION</p>
                    </div>
                </div>
                <div class="toolscol" @click="GoChart">
                    <div class="toolstext">
                        <img src="/static/image/icon2.png" alt="" srcset="" class="toolsimg">
                        <p class="toolstitle">生长曲线</p>
                        <p class="toolstip">GROWTH&nbsp;CURVE</p>
                    </div>
                </div>
            </div>
            <div class="toolsrow">
                <div class="toolscol" style="margin-right: 2vw;" @click="GoTeacherInfo">
                    <div class="toolstext">
                        <img src="/static/image/icon3.png" alt="" srcset="" class="toolsimg">
                        <p class="toolstip">一对一</p>
                        <p class="toolstitle">长高服务</p>
                        <p class="toolstip">HEIGHT&nbsp;PREDICTION</p>
                    </div>
                </div>
                <div class="toolscol" @click="asd">
                    <div class="toolstext">
                        <img src="/static/image/icon4.png" alt="" srcset="" class="toolsimg">
                        <p class="toolstip">长高</p>
                        <p class="toolstitle">打卡计划</p>
                        <p class="toolstip">A &nbsp;GROW&nbsp;PLAN</p>
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
        methods:{
            GoToolsPage(){
                wx.navigateTo({
                    url: '/pages/toolspage/main'
                })
            },
            GOHightPre(){
                wx.navigateTo({
                    url: '/pages/hightpre/main'
                })
            },
            GoTeacherInfo(){
                wx.switchTab({
                    url:'/pages/serve/main'
                })
            },
            GoChart(){
                wx.navigateTo({
                    url: '/pages/chartpage/main'
                })
            },
            asd(){
                wx.navigateTo({
                    url: `/pages/toolspage/main`
                })
            }
        },
    }
</script>

<style>
    .tools {
        height: 60vh;
        width: 100%;
        background-color: #eeeeee;
        margin-top: 30rpx;
    }
    .toolsbox {
        height: 56vh;
        width: 96vw;
        margin: 2vh 2vw;
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
        background-color: rgb(227, 139, 39);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .toolstext {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
    }
    .toolsimg {
        /* position: absolute;
            top: 30%;
            left: 30%; */
        width: 60rpx;
        height: 60rpx;
        margin: 0 auto;
        display: block;
        margin-bottom: 10rpx;
    }
    .toolstitle {

        font-size: 40rpx;
        font-weight: bold;
        text-align: center;
        white-space: nowrap;
    }
    .toolstip {

        font-size: 20rpx;
        text-align: center
    }
    .toolscenter {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
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
