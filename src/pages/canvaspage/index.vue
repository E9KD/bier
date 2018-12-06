<template>
    <div class="sharepage">
        <cover-view class="share_box">
            <cover-view class="sharepage_top">
                <cover-view class="top_box">
                    <cover-image :src="big" alt="" class="canvas_big" v-if="big" />
                    <cover-image :src='img' alt="" class="canvas_img" v-if="img" />
                    <cover-image :src="userParam.avatarUrl" alt="" class="canvas_userimg" v-if="userParam.avatarUrl" />
                    <cover-view class="canvas_username">{{userParam.nickName}}</cover-view>
                </cover-view>
            </cover-view>
            <button class="bottom_btn" @click="SaveCanvas">点击保存到相册中</button>
        </cover-view>
        <canvas canvas-id="myCanvas" class="canvas" v-if="ishow" />
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
                poster: '1',
                userFace: '1',
                width: '',
                height: '',
                big: 'http://192.144.199.129/json/aaa.jpeg',
                img: 'http://192.144.199.129/json/logo.jpeg',
                ishow: true
            }
        },
        methods: {
            async init() {
                let that = this
                let url1 = 'http://192.144.199.129/json/aaa.jpeg'
                this.poster = await this.DownLoadImage(url1)
                this.userFace = await this.DownLoadImage(this.userParam.avatarUrl)
            },
            DownLoadImage(url, param) {
                return new Promise(resolve => {
                    wx.downloadFile({
                        url: url,
                        success: res => {
                            if (res.statusCode === 200) {
                                resolve(res.tempFilePath)
                            }
                        }
                    })
                })
            },
            SaveImage(x) {
                wx.saveImageToPhotosAlbum({
                    filePath: x,
                    success: res => {
                        this.ishow = false
                        wx.showToast({
                            title: '图片已保存到相册',
                            icon: 'none',
                            duration: 2000
                        })
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2500)
                    }
                })
            },
            SaveCanvas() {
                console.log(123);
                let that = this
                const ctx = wx.createCanvasContext('myCanvas')
                ctx.drawImage(this.poster, 0, 0, 300, 500)
                ctx.drawImage(this.userFace, 25, 22, 20, 20)
                ctx.fillText(this.userParam.nickName, 50, 35)
                ctx.draw(true, () => {
                    wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: 300,
                        height: 500,
                        canvasId: 'myCanvas',
                        success(res) {
                            that.SaveImage(res.tempFilePath)
                        }
                    })
                })
            },
        },
        computed: {
            ...mapState(['userParam'])
        },
        onLoad() {
            this.init()
        }
    }
</script>

<style scoped>
    .share_box {
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    
    .bottom_btn {
        padding: 30rpx;
        background-color: #12e2a3;
        font-size: 35rpx;
        text-align: center;
        line-height: 40rpx;
        z-index: 999;
        border-radius: 20rpx;
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        color: white;
    }
    
    .sharepage {
        background-color: #374955;
        width: 100vw;
        height: 100vh;
    }
    
    .canvas_username {
        font-size: 20rpx;
        line-height: 20rpx;
        position: absolute;
        top: 10.5%;
        left: 20%;
    }
    
    .canvas_userimg {
        width: 35rpx;
        height: 35rpx;
        position: absolute;
        top: 9.5%;
        left: 10%;
    }
    
    .top_box {
        width: 300px;
        height: 400px;
        margin: 0 auto;
        padding: 50rpx 0px;
        background-color: #374955;
        position: relative;
    }
    
    .canvas_big {
        width: 300px;
        height: 400px;
    }
    
    .canvas_img {
        width: 100rpx;
        height: 90rpx;
        position: absolute;
        bottom: 12.5%;
        right: 18.6%;
    }
    
    .canvas {
        width: 100vh;
        height: 100vh;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 10;
    }
</style>
