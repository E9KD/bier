<template>
    <div class="toastbox" v-show="toastshow">
        <div class="toast">
            <img src="/static/image/close.png" alt="#" class="toastclose" v-show="toastcom[1]" @click="toastclose">
            <img :src="toastcom[2]" class="toastimg" v-show="toastcom[0]">
            <p class="toastext">{{toastcom[3]}}</p>
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
                toastcom: [
                    true,
                    true,
                    '/static/image/loading.gif',
                    'Hello World'
                ]
            }
        },
        methods: {
            ...mapMutations(['closeToast']),
            // 点击关闭执行mutations，将组件隐藏
            toastclose() {
                this.closeToast()
            },
        },
        computed: {
            ...mapState([
                'toastshow',
                'toasttype',
                'toastListevent',
                'toastListload'
            ]),
        },
        watch: {
            // 监视toasttype的改变，每次
            toastshow() {
                console.log(123);
                // 判定是事件还是等待
                if (this.toasttype == 0) {
                    console.log(789);
                    // 如果是事件，展示数组等于事件数组
                    this.toastcom = this.toastListevent
                } else {
                    console.log(456);
                    // 如果是load，展示数组等于等待数组
                    this.toastcom = this.toastListload
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
        background-color: #6E727D;
        position: absolute;
        top: 0px;
        left: 0px;
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
