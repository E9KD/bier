<template>

  <div class="userinfo">
    <div class="userinfo_top">
  
      <div class="top_name">
        <p class="top_p">头像</p>
        <img class="img_img" :src="img" alt="">
      </div>
  
      <div class="top_name">
        <p class="top_p">昵称</p>
        <p class="name_content">{{name}}</p>
      </div>
  
      <div class="top_name">
        <p class="top_p">性别</p>
        <p class="name_content">{{sex}}</p>
      </div>
  
      <div class="top_name">
        <p class="top_p">地域</p>
        <p class="name_content">{{local}}</p>
      </div>
  
    </div>
  
    <div class="userinfo_top a">
  
      <div class="top_name">
  
        <p class="top_p">手机</p>
        <p class="contnet_p" @click="ChangePhoneNumber(0)">></p>
        <p class="name_content" @click="ChangePhoneNumber(0)">{{userPhone}}</p>
      </div>
  
      <div class="top_name">
        <p class="top_p">邮箱</p>
        <p class="contnet_p"  @click="ChangeEmail(1)">></p>
        <p class="name_content" @click="ChangeEmail(1)">{{email}}</p>
      </div>
  
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        img: null,
        name: `123`,
        sex: `123`,
        local: `123`,
        userPhone: ``,
        email:``
      }
    },
    methods:{
      init(){
        this.img=this.userInfo.avatarUrl
        this.name=this.userInfo.nickName
        this.userPhone=this.userParam.mobile
        this.local=`${this.userInfo.city}  ${this.userInfo.province}`
        if(this.userInfo.gender==1){
          this.sex=`男`
        }else{
          this.sex=`女`
        }
        console.log(this.userParam,this.userInfo);
      },
      ChangePhoneNumber(x){
        // 0 是手机号
        wx.navigateTo({
          url: `/pages/changenumber/main?id=${x}`
        })
      },
      ChangeEmail(x){
        // 1 邮箱号
        wx.navigateTo({
          url: `/pages/changenumber/main?id=${x}`
        })
      },
    },
    computed:{
      ...mapState(['userParam','userInfo'])
    },
    onLoad(){
      this.init()
    }
  }
</script>

<style scoped>
.a{
  margin-top: 30rpx;
}
.contnet_p{
  font-size:30rpx;

  margin-left: 10rpx;
  color: #999;
  float: right;
  line-height: 100rpx;
}
.name_content{
  float: right;
  color: #999;
  font-size: 30rpx;
  text-align: right;
  line-height: 100rpx;
}
.img_img{
  width: 100rpx;
  height: 100rpx;
  border-radius: 100%;
  float: right;
}
.top_p{
  text-align: left;
  font-size: 30rpx;
  line-height: 100rpx;
  float: left;
}

.top_name{
  width: 90%;
  margin: 0 auto;
  height: 100rpx;
  overflow: hidden;
}
  .userinfo_top{
    background-color: white;
  }
</style>
