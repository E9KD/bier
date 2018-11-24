<template>
  <div class="changenumber">
    <div class="changenumber_box">
      <p class="box_p">{{typeIndex==0?p:e}}</p>
      <input class="box_input" type="text" v-model="keyWord" :placeholder="typeIndex==0?pho:ema">
    </div>
    <button class="box_btn" @click="ChangeNumber">{{typeIndex==0?ph:em}}</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeIndex: null,
        p: `请填写手机号:`,
        e: `请填写邮箱账号:`,
        keyWord: null,
        ph: `修改号码`,
        em: `修改邮箱`,
        pho: `+86`,
        ema: `请输入邮箱`,
      }
    },
    methods: {
      ChangeNumber() {
        let emailRule = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        let phoneRule = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        console.log(this.keyWord);
        if (this.typeIndex == 0) {
          if (phoneRule.test(this.keyWord)) {
            wx.showToast({
              title: '暂未开启，敬请期待！',
              icon: 'none',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '暂未开启，敬请期待！',
              icon: 'none',
              duration: 1000
            })
          }
        } else {
          if (emailRule.test(this.keyWord)) {
            wx.showToast({
              title: '暂未开启，敬请期待！',
              icon: 'none',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '暂未开启，敬请期待！',
              icon: 'none',
              duration: 1000
            })
          }
        }
      },
    },
    onLoad(x) {
      // 0 手机号 1 是邮箱
      this.typeIndex = x.id
    }
  }
</script>

<style scoped>
  .changenumber_box {
    width: 80%;
    overflow: hidden;
    margin:  0 auto;
  }
  
  .box_btn {
    width: 50%;
    margin: 0 auto;
    background-color: #B92500;
    font-size: 30rpx;
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 60rpx;
    color: white;
    border-radius: 10rpx;
  }
  
  .box_input {
    background-color: white;
    height: 50rpx;
    padding-left: 20rpx;
    float: right;
    width: 50%;
    font-size: 30rpx;
  }
  
  .box_p {
    height: 50rpx;
    font-size: 30rpx;
    float: left;
    line-height: 50rpx;
  }
  
  .changenumber {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
</style>
