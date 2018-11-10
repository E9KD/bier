<template>
    <div class="login" @touchmove.stop="preventD">
        <img src="/static/image/logo.jpeg" class="login_logo">
        <div class="login_in">立刻授权</div>
    </div>
</template>

<script>
    export default {
        mehtods: {
            preventD() {
            }
        }
    }
</script>

<style scoped>
    .login_in {
        position: absolute;
        bottom: 7%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2rpx solid rgb(227, 139, 39);
        width: 250rpx;
        height: 70rpx;
        border-radius: 14rpx;
        line-height: 70rpx;
        text-align: center;
    }
    .login_logo {
        width: 200rpx;
        height: 200rpx;
        position: absolute;
        top: 24%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .login {
        width: 100vw;
        height: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
        background-color: white;
    }
</style>
