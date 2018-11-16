<template>
    <div class="cf-bg" :class="isToast2show?b:n" style="z-index:999;">
        <div class='bg-blur' style='background:#fff'></div>
        <div class='jz' style='width:100vw;height:1005;'>
            <div class='jz' style='width:80vw;height:100vh;padding-top:10vh;'>
                <div style='width:100%;height:80vh;border:1px solid #333;border-radius:5px;position:relative;'>
                    <div style='width:100%;height:28px;'>
                        <div style='width:30px;height:30px;line-height:30px;margin:0 auto;float:right;font-size:16px;text-align:center;' @click='Close'>
                            X
                        </div>
                    </div>
                    <!-- 查询 300 1500 -->
                    <!-- 头部三部分 -->
                    <div style='height:50%;'>
                        <div style='text-align:center;margin:0px auto;margin-top:10px;font-size:35px;width:30%;'>查询</div>
                        <div style='font-size:10px;width:100%;margin:0 auto;'>比尔高VIP服务</div>
                        <div style='width:10%;height:3px;margin:3px auto;background:#ee8720;'></div>
                        <!-- 价格 -->
                        <div style='width:75%;margin:20px auto;overflow:hidden;margin-bottom:50px;'>
                            <div :class="currentTab==0 ? 'on' :'off'" @click="ClickTab(0)" style='border-radius:90%;border:1px solid #ee8720;width:15vh;height:15vh;float:left;text-align:center;margin:20px auto;'>
                                <text :class="currentTab==0 ? 'on' :'off'" @click="ClickTab(0)" style='border-radius:50%;margin:auto;font-size:30rpx;line-height:15vh;'>¥{{price1}}/月</text>
                            </div>
                            <div :class="currentTab==1 ? 'on' :'off'" @click="ClickTab(1)" style='border-radius:90%;border:1px solid #ee8720;width:15vh;height:15vh;float:right;text-align:center;margin:20px auto;'>
                                <text :class="currentTab==1 ? 'on' :'off'" @click="ClickTab(1)" style='border-radius:50%;margin:auto;font-size:30rpx;line-height:15vh;'>¥{{price2}}/季</text>
                            </div>
                        </div>
                    </div>
                    <!-- 底部 -->
                    <div style='width:100%;height:40%;background:#e5e5e5;overflow:hidden;position:absolute;bottom:0;box-sizing:border-box;'>
                        <div class="div1" style='background:#fff;height:25px;'></div>
                        <div style='background:#e5e5e5;'>
                            <div style='font-size:14px;color:#5d5d5d;padding-top:10%;'>------</div>
                            <div style='position:absolute;width:100%;height:30px;margin:0 auto;float:right;font-size:10pt;text-align:center;'>
                                进入客服消息后，发送"1"获取查询链接
                            </div>
                            <!-- <button open-type='contact' session-from='{"type": "vip","userid":"{{userinfo.userid}}","unionId":"{{userinfo.unionId}}","goodsid":"1","price":"{{price}}"}' style='width:45%;border:none;color:#fff;background:#f1840f;margin-top:20px;font-size:16px;'>好的</button> -->
                            <button open-type="contact" :session-from='asd' @click="click" :contact="handleContact" style='width:45%;border:none;color:#fff;background:#f1840f;margin-top:20px;font-size:16px;'>好的</button>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex';
    import request from '../utils/api.js';
    export default {
        data() {
            return {
                isToast2show: false,
                b: 'block',
                n: 'none',
                price1: null,
                price2: null,
                currentTab: 0,
                price: null,
                asd: {
                    "type": "vip",
                    "userid": null,
                    "unionId": null,
                    "goodsid": "1",
                    "price": null
                }
            }
        },
        computed: {
            ...mapState(['toast2State', 'userParam'])
        },
        methods: {
            ...mapMutations(['ChangeToast2State']),
            handleContact(e) {
                console.log(e);
            },
            click() {
                this.asd.userid = this.userParam.userd
                this.asd.unionId = this.userParam.unionId
                this.asd.price = this.price
                console.log(this.asd);
            },
            init() {
                let url = `https://wx.biergao.vip/api/vip/price`
                request.api(url, res => {
                    this.price1 = res.data[0]
                    this.price2 = res.data[1]
                    this.price = this.price1
                })
    
                // console.log(this.userParam);
            },
    
            Close() {
                this.ChangeToast2State(0)
            },
            ClickTab(x) {
                this.currentTab = x
                if (x == 0) {
                    this.price = this.price1
                } else {
                    this.price = this.price2
                }
            }
        },
        onLoad() {
            this.init()
        },
        watch: {
            toast2State(x) {
                if (x == 1) {
                    this.isToast2show = true
                } else {
                    this.isToast2show = false
                }
            }
        }
    }
</script>

<style scoped>
    page {
        width: 100%;
    }
    
    .block {
        display: block;
    }
    
    .none {
        display: none;
    }
    
    .vip-head {
        background: #004299;
        width: 90%;
        border-radius: 6px;
        margin: 20px auto;
    }
    
    .vip-head-title {
        color: #e2e2e2;
        text-align: center;
        padding: 80px 20px;
        font-size: 30px;
    }
    
    image {
        margin: 0 auto;
        display: block;
    }
    
    .vip-title {
        font-size: 18px;
        text-align: center;
        color: #616161;
        margin-top: 10px;
    }
    
    .vip-text {
        font-size: 12px;
        text-align: center;
        color: #616161;
    }
    
    .vip-content {
        justify-content: center;
        margin-top: 20px;
        width: 96px;
    }
    
    
    /*弹出层  */
    
    .cf-bg {
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    
    
    /*jz  */
    
    .jz {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1000;
        margin: 0 auto;
        text-align: center;
    }
    
    .jz button[plain] {
        color: #353535;
        border: 1px solid #353535;
        background-color: transparent;
        line-height: 1.5;
        width: 49%;
        display: inline;
    }
    
    .nav {
        width: 49%;
        border: 1px solid #353535;
        float: right;
        position: relative;
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding-left: 14px;
        padding-right: 14px;
        box-sizing: border-box;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        line-height: 1.5;
        border-radius: 5px;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
        color: #000;
        background-color: transparent;
    }
    
    .bg-blur {
        position: fixed;
        float: left;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        /* -webkit-filter: blur(15px);
                  -moz-filter: blur(15px);
                  -o-filter: blur(15px);
                  -ms-filter: blur(15px);
                  filter: blur(15px); */
    }
    
    
    /* 控制圆圈样式 */
    
    .on {
        background: #ed881e;
        color: #fff;
    }
    
    .off {
        background: #fff;
        color: #000;
    }
    
    
    /* 箭头 */
    
    .div1 {
        position: relative;
    }
    
    .div1:after {
        position: absolute;
        bottom: 0;
        width: 0;
        height: 15px;
        margin-left: -15px;
        left: 50%;
        content: " ";
        border-bottom: 15px solid #e5e5e5;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        box-sizing: border-box;
    }
    
    
    /* .div1:before {
                  position: absolute;
                  top: 20px;
                  width: 0;
                  height: 0;
                  left: 50%;
                  margin-left: -5px;
                  content: " ";
                  border-bottom: 15px solid #000;
                  border-left: 15px solid transparent;
                  border-right: 15px solid transparent;
                } */
</style>
