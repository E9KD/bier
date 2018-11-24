<template>
    <div :class="[isshow?s:h]" class="pushcardbox" @touchmove.stop="preventD">
        <img src="/static/image/nutrition.png" class="backgroundimg">
        <div class="com" v-if="iscomment">
            <div class="commentclose" @click="closePushcard">
                <img src="/static/image/x.png" class="closeimg">
            </div>
            <div class="commenthead">
                <p class="headtitle">想知道您的孩子当前{{title}}情况<br>仅需<i class="headtip">2</i>步</p>
            </div>
            <div class="commenttext">
                <p class="textconent">第<i class="headtip">1</i>步&nbsp;&nbsp;完成《{{title}}调查表》答题</p>
                <div class="textdiv">
                    <span class="textconent">第<i class="headtip">2</i>步</span>
                    <span class="textconent">&nbsp;&nbsp;获得一对一个性化{{title}}<br>&nbsp;&nbsp;评价及建议</span>
                </div>
            </div>
            <div class="commentbtn">
                <div class="btncom btnleft goldbg" :class="isPastShow?t:o" @click="GoAnswer">{{isPastShow?t1:t2}}</div>
                <div class="btncom btnright goldbg" @click="GoPastScore" v-if="isPastShow">往期评价</div>
            </div>
            <div class="commenttip">（题目均为单选题）</div>
        </div>
        <div class="com" v-else>
            <div class="commentclose" @click="closePushcard">
                <img src="/static/image/x.png" class="closeimg">
            </div>
            <div class="pushcardtext">
                <p class="textcom">尊敬的小主：</p>
                <p class="textcom">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;坚持每天打卡，养成营养摄入好习惯，我会为小主统计每周打卡生成报告。请常来看我哦！</p>
            </div>
            <!-- <div class="btncom pushcardbtn">打卡&nbsp;></div>
                                                <div class="btncom pushcardbtn">评价&nbsp;></div> -->
            <div class="commentbtn">
                <div class="btncom btnleft goldbg" style="float:left;" @click="GoPunch(index)">打卡 ></div>
                <div class="btncom btnright goldbg" @click="GoEvaluate(index)">评价 ></div>
            </div>
    
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from "vuex";
    import request from "../utils/api.js";
    export default {
        data() {
            return {
                isshow: false,
                s: "show",
                h: "hide",
                iscomment: true,
                isPastShow: true,
                t: "two",
                o: "one",
                typeIndex: null,
                title: `营养`,
                t1: `重新答题`,
                t2: `开始答题`
            };
        },
        methods: {
            ...mapMutations(["closePushcardType"]),
            init() {
                let url = `https://wx.biergao.vip/api/Yypfjl/getlist`;
                let data = {
                    userid: this.userParam.userid,
                    pid: this.cardType
                };
                request.GetWithData(url, data, res => {
                    let data = res.data;
                    if (data.status == 200) {
                        if(this.cardType!=0){
                            this.isPastShow=false
                            return
                        }
                        this.isPastShow = true;
                    } else {
                        
                        this.isPastShow = false;
                    }
                });
            },
            GoEvaluate() {
                this.closePushcardType();
                wx.navigateTo({
                    url: "/pages/pastscore/main?show=1"
                });
            },
            GoPunch() {
                this.closePushcardType();
                wx.navigateTo({
                    url: "/pages/cardpage/main"
                });
            },
            // 阻止冒泡
            preventD() {},
            // 关闭pushcard
            closePushcard() {
                this.closePushcardType();
            },
            GoAnswer() {
                this.closePushcardType();
                wx.navigateTo({
                    url: `/pages/question/main?id=${this.cardType}`
                });
            },
            GoPastScore() {
                this.closePushcardType();
                wx.navigateTo({
                    url: `/pages/pastscore/main?show=0`
                });
            }
        },
        computed: {
            ...mapState(["isPushcardshow", "pushCardtype", "cardType", "userParam"])
        },
        onLoad() {},
        watch: {
            isPushcardshow(x) {
                this.isshow = x;
                this.init();
                switch (this.cardType) {
                    case 0:
                        this.title = "营养";
                        break;
                    case 1:
                        this.title = "情绪";
                        break;
                    case 2:
                        this.title = "内分泌";
                        break;
                    case 3:
                        this.title = "运动";
                        break;
                    case 4:
                        this.title = "睡眠";
                        break;
                }
            },
            pushCardtype(x) {
                if (x == 0) {
                    this.iscomment = true;
                } else {
                    this.iscomment = false;
                }
            }
        }
    };
</script>

<style scoped>
    .pushcardbtn {
        margin-top: 30rpx;
        display: inline-block;
    }
    
    .textcom {
        font-size: 44rpx;
        color: #fff;
        line-height: 80rpx;
        padding-top: 20rpx;
        font-weight: lighter;
    }
    
    .pushcardtext {
        padding-top: 100rpx;
        width: 90%;
        margin: 0 auto;
    }
    
    .closeimg {
        width: 50rpx;
        height: 50rpx;
    }
    
    .commentclose {
        width: 50rpx;
        height: 50rpx;
        border-radius: 40rpx;
        border: 1px solid #999;
        overflow: hidden;
        position: absolute;
        top: 10rpx;
        right: 10rpx;
    }
    
    .commenttip {
        font-size: 26rpx;
        color: #999999;
        text-align: center;
        width: 100%;
        margin-top: 30rpx;
    }
    
    .btnright {
        float: right;
    }
    
    .two {
        float: left;
    }
    
    .one {
        width: 300rpx !important;
        position: absolute;
        top: 60rpx;
        left: 50%;
        transform: translate(-50%, 0px);
    }
    
    .btncom {
        text-align: center;
        color: white;
        height: 80rpx;
        width: 210rpx;
        line-height: 80rpx;
        font-size: 36rpx;
        border-radius: 30rpx;
        font-weight: lighter;
    }
    
    .commentbtn {
        overflow: hidden;
        padding-top: 60rpx;
        width: 80%;
        height: 80rpx;
        margin: 0 auto;
        position: relative;
    }
    
    .textconent {
        vertical-align: top;
        font-size: 35rpx;
        color: #ffffff;
        line-height: 50rpx;
        margin-top: 50rpx;
        display: inline-block;
    }
    
    .commenttext {
        width: 90%;
        margin: 0 auto;
        font-weight: lighter;
        margin-top: 70rpx;
    }
    
    .headtip {
        display: inline-block;
        width: 40rpx;
        height: 40rpx;
        border-radius: 30rpx;
        background-color: white;
        color: #999999;
        line-height: 40rpx;
        text-align: center;
    }
    
    .headtitle {
        font-size: 40rpx;
        color: #fff;
        text-align: center;
        line-height: 60rpx;
        position: absolute;
        font-weight: lighter;
    }
    
    .commenthead {
        width: 90%;
        margin: 0 auto;
        padding: 100rpx 0px 50rpx 0px;
        border-bottom: 1px solid #999999;
    }
    
    .com {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 750rpx;
        border-radius: 20rpx;
        border: 1px solid #999999;
        z-index: 99;
    }
    
    .backgroundimg {
        background-size: cover;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        z-index: 1;
    }
    
    .pushcardbox {
        overflow: hidden;
        width: 100%;
        position: fixed;
        bottom: 0px;
        left: 0px;
        z-index: 9999;
    }
</style>
