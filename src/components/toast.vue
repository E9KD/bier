<template>
    <div class="toastbox" v-show="toastshow">
    
        <!-- loading -->
        <div class="toast">
            <!-- <img src="/static/image/close.png" alt="#" class="toastclose" v-show="toastcom[1]" @click="toastclose"> -->
            <img :src="toastcom[0]" class="toastimg">
            <p class="toastext">{{toastcom[1]}}</p>
        </div>
    
        <!-- 完成-->
        <div class="toast">
            <!-- <img src="/static/image/close.png" alt="#" class="toastclose" v-show="toastcom[1]" @click="toastclose"> -->
            <img :src="toastcom[0]" class="toastimg">
            <p class="toastext">{{toastcom[1]}}</p>
        </div>
    
        <!-- 警告 -->
        <div class="toast">
            <!-- <img src="/static/image/close.png" alt="#" class="toastclose" v-show="toastcom[1]" @click="toastclose"> -->
            <img :src="toastcom[0]" class="toastimg">
            <p class="toastext">{{toastcom[1]}}</p>
        </div>
    
        <div class="toast">
            <!-- <img src="/static/image/close.png" alt="#" class="toastclose" v-show="toastcom[1]" @click="toastclose"> -->
            <img :src="toastcom[0]" class="toastimg">
            <p class="toastext">{{toastcom[1]}}</p>
        </div>
    
        <div class="toast">
            <!-- <img src="/static/image/close.png" alt="#" class="toastclose" v-show="toastcom[1]" @click="toastclose"> -->
            <img :src="toastcom[0]" class="toastimg">
            <p class="toastext">{{toastcom[1]}}</p>
        </div>

        
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex';
    export default {
        data() {
            return {
                toastcom: [],
                a: 'all',
                b: '',
                toastListload: [
                    '/static/image/loading.gif',
                    '请耐心等待'
                ],
                toastListcomplete: [
                    '/static/image/success.png',
                    '成功！'
                ],
                toastListwarning: [
                    '/static/image/error.png',
                    '失败！'
                ],
                toastListnull: [
                    '/static/image/error.png',
                    '不能为空！'
                ],
                toastListlarge: [
                    '/static/image/error.png',
                    '图片过大！'
                ],
            }
        },
        methods: {
            // ...mapMutations(['closeToast']),
            // 点击关闭执行mutations，将组件隐藏
            // toastclose() {
            //     this.closeToast()
            // },
        },
        computed: {
            ...mapState([
                'toastshow',
                'toasttype',
            ]),
        },
        watch: {
            // 监视toasttype的改变，每次
            toastshow() {
                /**
                 * @msg: 0loading 1完成 2警告
                 * @param {type} 
                 * @return: 
                 */
                if (this.toasttype == 0) {
                    this.toastcom = this.toastListload
                } else if (this.toasttype == 1) {
                    this.toastcom = this.toastListcomplete
                } else if (this.toasttype == 2) {
                    this.toastcom = this.toastListwarning
                } else if (this.toasttype == 3) {
                    this.toastcom = this.toastListnull
                } else if (this.toasttype == 4) {
                    this.toastcom = this.toastListlarge
                }
            }
        }
    }
</script>

<style>
    /* 外围 mark*/
    
    .toastbox {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    
    .all {
        background-color: white;
    }
    
    
    /* box */
    
    .toast {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 50rpx;
    }
    
    
    /* 图片 */
    
    .toastimg {
        width: 160rpx;
        height: 160rpx;
        padding: 60rpx 80rpx 0px 80rpx;
    }
    
    
    /* 文字 */
    
    .toastext {
        display: block;
        width: 160rpx;
        white-space: nowrap;
        font-size: 30rpx;
        height: 40rpx;
        line-height: 40rpx;
        padding: 10rpx 80rpx 30rpx 80rpx;
        text-align: center;
    }
    
    
    /* 关闭按钮 */
    
    .toastclose {
        width: 30rpx;
        height: 30rpx;
        position: absolute;
        top: 10%;
        right: 10%;
    }
</style>
