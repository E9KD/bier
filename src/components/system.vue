<template>

    <div class="system">
        <div class="systembox">
            <div class="curbox">
                <div class="curtext">
                    <div class="curtext1">
                        <h4 class="curtexthead">SYSTEM</h4>
                        <P class="curtextp">一站式身高管理方案</P>
                        <button class="curtextbtn" @click="GoToolsPage">即刻开启</button>
                    </div>
                    <div class="curcard" v-show='iscurcard'>
                        <div class="halfcurleft halfcur"></div>
                        <div class="halfcurright halfcur"></div>
                        <div class="littlecurtop littlecur" @click="showpushcard(0)">
                            <div class="inlittlecurtop inlittlecur" style="margin-top:15rpx;background-color:rgb(227, 139, 39);color:white;">评</div>
                            <div class="inlittlecurbom inlittlecur" style="color:rgb(227, 139, 39)">价</div>
                        </div>
                        <div class="littlecurbom littlecur" @click="showpushcard(1)">
                            <div class="inlittlecurtop inlittlecur" style="color:white;">打</div>
                            <div class="inlittlecurbom inlittlecur" style="margin-bottom:15rpx;background-color:white;color:rgb(227, 139, 39)">卡</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="systemtype systemtype1" @click="getcurcard(0)">
                <div class="systemtypetext">
                    <img src="/static/image/icon16.png" alt="" srcset="" class="systeminco">
                </div>
            </div>
            <div class="systemtype systemtype2" @click="asd">
                <div class="systemtypetext">
                    <img src="/static/image/icon17.png" alt="" srcset="" class="systeminco">
                </div>
                <div class="systemtypedot"></div>
                <div class="systemtypetitle">睡眠</div>
            </div>
            <div class="systemtype systemtype3" @click="qwe">
                <div class="systemtypetext">
                    <img src="/static/image/icon18.png" alt="" srcset="" class="systeminco">
                </div>
            </div>
            <div class="systemtype systemtype4">
                <div class="systemtypetext">
                    <img src="/static/image/icon19.png" alt="" srcset="" class="systeminco">
                </div>
            </div>
            <div class="systemtype systemtype5">
                <div class="systemtypetext">
                    <img src="/static/image/icon20.png" alt="" srcset="" class="systeminco">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
    export default {
        data() {
            return {
                iscurcard: false,
                list1:[10, 20, 30, 40, 50, 60, 70, 80],
                list2:[50, 20, 30, 40, 50, 60, 70, 80],
            }
        },  
        methods: {
            ...mapMutations(['openPushcardType','ChangePolarParam']),
            getcurcard(x) {
                this.iscurcard = !this.iscurcard
            },
            showpushcard (x){
                // 展示类型，是否展示
                this.openPushcardType(x)
            },
            GoToolsPage(){
                wx.navigateTo({
                    url: '/pages/toolspage/main'
                })
            },
            asd(){
                this.ChangePolarParam(this.list2)
                wx.navigateTo({
                    url: `/pages/resultpage/main`
                })
            },
            qwe(){
                this.ChangePolarParam(this.list1)
                wx.navigateTo({
                    url: `/pages/resultpage/main`
                })
            }
        }
    }
</script>

<style>
    .system {
        height: 700rpx;
        width: 100%;
        background-color: #f3f2f8;
        position: relative;
    }
    .curbox {
        width: 600rpx;
        height: 600rpx;
        border-radius: 500rpx;
        border: 1px solid #999;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .systemtype {
        width: 120rpx;
        height: 120rpx;
        background-color: white;
        border-radius: 100rpx;
        box-shadow: 0px 0px 10px #888888;
    }
    .systemtypetext {
        height: 100rpx;
        width: 100rpx;
        background-color: rgb(227, 139, 39);
        border-radius: 70rpx;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .systemtype1 {
        position: absolute;
        top: 0%;
        left: 43%;
    }
    .systemtype2 {
        position: absolute;
        top: 31%;
        left: 4%;
    }
    .systemtype3 {
        position: absolute;
        top: 32%;
        left: 82%;
    }
    .systemtype4 {
        position: absolute;
        top: 75%;
        left: 18%;
    }
    .systemtype5 {
        position: absolute;
        top: 75%;
        left: 68%;
    }
    .systeminco {
        width: 100rpx;
        height: 100rpx;
    }
    .curtext {
        width: 300rpx;
        height: 300rpx;
        border-radius: 300rpx;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 40;
        padding: 5px;
        border: 1px solid #999999;
    }
    .curtext1 {
        width: 290rpx;
        height: 290rpx;
        border-radius: 200rpx;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 40;
        padding: 5px;
        border: 1px solid #999999;
    }
    .curcard {
        width: 310rpx;
        height: 310rpx;
        border-radius: 200rpx;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
    }
    .curtexthead {
        font-size: 40rpx;
        font-weight: bold;
        text-align: center;
        margin-top: 60rpx;
    }
    .curtextp {
        font-size: 30rpx;
        text-align: center;
    }
    .curtextbtn {
        width: 200rpx;
        height: 60rpx;
        border-radius: 20rpx;
        background-color: rgb(227, 139, 39);
        text-align: center;
        font-size: 30rpx;
    }
    .halfcur {
        width:  155rpx;
        height: 310rpx;
        display: inline-block;
    }
    .halfcurleft{
        border-radius:155rpx 0 0 155rpx;
        background-color: white;
    }
    .halfcurright{
        border-radius:0 155px 155px 0;
        background-color: rgb(227, 139, 39);
    }
    .littlecur {
        width: 155rpx;
        height: 155rpx;
        text-align: center;
        position: absolute;
        border-radius: 100rpx;
    }
    .littlecurtop {
        background-color: white;
        top: 0px;
        left: 50%;
        transform: translate(-50%,0%)
    }
    .littlecurbom {
        background-color: rgb(227, 139, 39);
        bottom: 0px;
        left: 50%;
        transform: translate(-50%,0%)
    }
     .inlittlecur {
        width: 70rpx;
        height: 70rpx;
        text-align: center;
        position: absolute;
        border-radius: 100rpx;
        text-align: center;
        line-height: 70rpx;
    }
    .inlittlecurtop {
        top: 0px;
        left: 50%;
        transform: translate(-50%,0%)
    }
    .inlittlecurbom {
        bottom: 0px;
        left: 50%;
        transform: translate(-50%,0%)
    }
    .systemtypedot {
        position: absolute;
        top: -41%;
        right: 10%;
        display: inline-block;
        width: 10rpx;
        height: 10rpx;
        border-radius: 10rpx;
        background-color: black;
    }
    .systemtypetitle {
        position: absolute;
        top: -51%;
        right: -35%;
        font-size: 20rpx;
        display: inline-block;
        font-size: 25rpx;
    }
</style>
