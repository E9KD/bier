<template>
    <div class="system">
        <div class="systembox">
            <div class="curbox">
                <div class="curtext">
                    <div class="curtext1" v-if="isBoxShow">
                        <h4 class="curtexthead">SYSTEM</h4>
                        <P class="curtextp">一站式身高管理方案</P>
                        <button class="curtextbtn " @click="GoToolsPage">即刻开启</button>
                    </div>
                    <div class="curtext1" v-else>
                        <div class="curtext1_wait">敬请期待</div>
                    </div>
                    <div class="curcard" v-show='iscurcard'>
                        <div class="halfcurleft halfcur"></div>
                        <div class="halfcurright halfcur"></div>
                        <div class="littlecurtop littlecur" @click="ShowPushCard(0)">
                            <div class="inlittlecurtop inlittlecur" style="margin-top:15rpx;background-color:rgb(227, 139, 39);color:white;">评</div>
                            <div class="inlittlecurbom inlittlecur" style="color:rgb(227, 139, 39)">价</div>
                        </div>
                        <div class="littlecurbom littlecur" @click="ShowPushCard(1)">
                            <div class="inlittlecurtop inlittlecur" style="color:white;">打</div>
                            <div class="inlittlecurbom inlittlecur" style="margin-bottom:15rpx;background-color:white;color:rgb(227, 139, 39)">卡</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="systemtype systemtype1" @click="GetCurCard(0)">
                <div class="systemtypetext">
                    <img src="/static/image/icon16.png" alt="" srcset="" class="systeminco">
                </div>
                <div class="systemtypedot dot0"></div>
                <div class="systemtypetitle title0">营养</div>
            </div>

            <!-- 0 营养 1 运动 2 睡眠 3情绪 4 内分泌 -->
            <!-- // 0 营养 1 情绪 2 没有 3运动 4 睡眠 -->
            <div class="systemtype systemtype2" @click="GetCurCard(4)">
                <div class="systemtypetext">
                    <img src="/static/image/icon18.png" alt="" srcset="" class="systeminco">
                </div>
                <div class="systemtypedot dot1"></div>
                <div class="systemtypetitle title1">睡眠</div>
            </div>

            <div class="systemtype systemtype3" @click="GetCurCard(1)">
                <div class="systemtypetext">
                    <img src="/static/image/icon19.png" alt="" srcset="" class="systeminco">
                </div>
                <div class="systemtypedot dot2"></div>
                <div class="systemtypetitle title2">情绪</div>
            </div>

            <div class="systemtype systemtype4" @click="GetCurCard(3)">
                <div class="systemtypetext">
                    <img src="/static/image/icon17.png" alt="" srcset="" class="systeminco">
                </div>
                <div class="systemtypedot dot3"></div>
                <div class="systemtypetitle title3">运动</div>
            </div>

            <div class="systemtype systemtype5" @click="GetCurCard(2)">
                <div class="systemtypetext">
                    <img src="/static/image/icon20.png" alt="" srcset="" class="systeminco">
                </div>
                <div class="systemtypedot dot4"></div>
                <div class="systemtypetitle title4">内分泌</div>
            </div>
            
        </div>
    </div>
</template>

<script>
    import {
        mapMutations
    } from 'vuex';
    export default {
        data() {
            return {
                iscurcard: false,
                list1: [10, 20, 30, 40, 50, 60, 70, 80],
                list2: [50, 20, 30, 40, 50, 60, 70, 80],
                typeIndex: null,
                isBoxShow: true
            }
        },
        methods: {
            ...mapMutations(['openPushcardType', 'ChangePolarParam']),
            GetCurCard(x) {
                // 0 营养 1 运动 2 睡眠 3情绪 4 内分泌
                // 0 营养 1 情绪 2 内分泌没有 3运动 4 睡眠
                if (x == 2) {
                    this.isBoxShow = !this.isBoxShow
                    this.iscurcard = false
                    return
                }
                this.iscurcard = !this.iscurcard
                this.typeIndex = x
    
            },
            ShowPushCard(x) {
                if (this.typeIndex != 0 && x == 1) {
                    wx.showToast({
                        title: '暂未开启，敬请期待！',
                        icon: 'none',
                        duration: 1000
                    })
                    return
                }
                this.openPushcardType({
                    type: x,
                    index: this.typeIndex
                })
            },
            GoToolsPage() {
                wx.navigateTo({
                    url: '/pages/toolspage/main'
                })
            },
        }
    }
</script>

<style>
    .curtext1_wait {
        font-size: 40rpx;
        text-align: center;
        line-height: 300rpx;
    }
    
    .system {
        height: 700rpx;
        width: 100%;
        background-color: white;
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
        margin-top: 15rpx;
        width: 200rpx;
        height: 70rpx;
        border-radius: 20rpx;
        background-color: rgb(227, 139, 39);
        text-align: center;
        font-size: 30rpx;
        line-height: 70rpx;
        color: white;
    }
    
    .halfcur {
        width: 155rpx;
        height: 310rpx;
        display: inline-block;
    }
    
    .halfcurleft {
        border-radius: 155rpx 0 0 155rpx;
        background-color: white;
    }
    
    .halfcurright {
        border-radius: 0 155px 155px 0;
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
        transform: translate(-50%, 0%)
    }
    
    .littlecurbom {
        background-color: rgb(227, 139, 39);
        bottom: 0px;
        left: 50%;
        transform: translate(-50%, 0%)
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
        transform: translate(-50%, 0%)
    }
    
    .inlittlecurbom {
        bottom: 0px;
        left: 50%;
        transform: translate(-50%, 0%)
    }
    
    .systemtypedot {
        position: absolute;
        display: inline-block;
        width: 10rpx;
        height: 10rpx;
        border-radius: 10rpx;
        background-color: black;
    }
    
    .systemtypetitle {
        position: absolute;
        font-size: 20rpx;
        display: inline-block;
        font-size: 25rpx;
    }
    
    .dot0 {
        top: 54%;
        right: -49%;
    }
    
    .title0 {
        top: 45%;
        right: -95%;
    }
    
    .dot1 {
        top: -41%;
        right: 10%;
    }
    
    .title1 {
        top: -51%;
        right: -35%;
    }
    
    .dot2 {
        bottom: -37%;
        left: 43%;
    }
    
    .title2 {
        bottom: -46%;
        left: -2%;
    }
    
    .dot3 {
        top: -41%;
        left: -28%;
    }
    
    .title3 {
        top: -52%;
        left: -17%;
    }
    
    .dot4 {
        bottom: 13%;
        left: -24%;
    }
    
    .title4 {
        bottom: 5%;
        left: -94%;
    }
</style>
