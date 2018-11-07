<template>
    <div :class="[isshow?s:h]" class="pushcardbox" @touchmove.stop="preventD">
        <img src="/static/image/nutrition.png" class="backgroundimg">
        <div class="com" v-if="iscomment">
            <div class="commentclose" @click="closePushcard">
                <img src="/static/image/x.png" class="closeimg">
            </div>
            <div class="commenthead">
                <p class="headtitle">想知道您的孩子当前营养情况<br>仅需<i class="headtip">2</i>步</p>
            </div>
            <div class="commenttext">
                <p class="textconent">第<i class="headtip">1</i>步&nbsp;&nbsp;完成《膳食调查表》答题</p>
                <div class="textdiv">
                    <span class="textconent">第<i class="headtip">2</i>步</span>
                    <span class="textconent">&nbsp;&nbsp;获得一对一个性化营养膳食<br>&nbsp;&nbsp;评价及建议</span>
                </div>
            </div>
            <div class="commentbtn">
                <div class="btncom btnleft" @click="goanswer">重新答题</div>
                <div class="btncom btnright" @click="GoPastScore">往期评价</div>
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
                <div class="btncom btnleft" @click="GoPunch(index)">打卡 ></div>
                <div class="btncom btnright" @click="GoEvaluate(index)">评价 ></div>
            </div>
    
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from "vuex";
    export default {
        data() {
            return {
                isshow: false,
                s: "show",
                h: "hide",
                iscomment: true
            };
        },
        methods: {
            ...mapMutations(["closePushcardType"]),
            GoEvaluate() {},
            GoPunch() {
                wx.navigateTo({
                    url: '/pages/cardpage/main'
                })
            },
            // 阻止冒泡
            preventD() {},
            // 关闭pushcard
            closePushcard() {
                this.closePushcardType();
            },
            goanswer() {
                wx.navigateTo({
                    url: "/pages/answer/main"
                });
            },
            GoPastScore(){
                wx.navigateTo({
                    url: '/pages/pastscore/main'
                })
            }
        },
        computed: {
            ...mapState(["isPushcardshow", "pushCardtype"])
        },
        watch: {
            isPushcardshow(x) {
                this.isshow = x;
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
        /* position: absolute;
              top: 80%;
              left: 50%;
              transform: translate(-50%, -50%); */
    }
    
    .textcom {
        font-size: 44rpx;
        color: #999999;
        line-height: 80rpx;
        padding-top: 20rpx;
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
    }
    
    .btnright {
        float: right;
    }
    
    .btnleft {
        float: left;
    }
    
    .btncom {
        text-align: center;
        color: white;
        background-color: #f56700;
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
        margin: 0 auto;
    }
    
    .textconent {
        vertical-align: top;
        font-size: 35rpx;
        color: #999999;
        line-height: 50rpx;
        margin-top: 50rpx;
        display: inline-block;
    }
    
    .commenttext {
        width: 90%;
        margin: 0 auto;
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
        color: #999999;
        text-align: center;
        line-height: 60rpx;
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
