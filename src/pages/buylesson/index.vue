<template>
  <div class="buylesson">
    <video id="myVideo" class="video_list" :src="videoSrc" controls page-gesture direction show-fullscreen-btn show-play-btn show-center-play-btn></video>
    <scroll-div :scroll-y='true' @scroll="aaa" class="asd">
      <div class="listbox">
        <div class="listhead">
          <p class="listhead_title">{{showList.title}}</p>
          <p class="listhead_tip">热销中</p>
          <p class="listhead_price" v-if="showList.price">{{showList.price}}&nbsp;¥</p>
          <p class="listhead_price" v-else>&nbsp;</p>
        </div>
        <div class="listhead_changecard">
          <div class="changecardcom" :class="[changecardisshow?a:n]" @click="changecardtype(0)">课程概述</div>
          <div class="changecardcom" :class="[changecardisshow?n:a]" @click="changecardtype(1)">课程目录</div>
        </div>
        <div class="listhead_showlist">
          <!-- 课程概述 -->
          <div class="showlist_list" v-show="lessonlistshowtype==0">
            <p class="showlist_introduce">老师介绍</p>
            <div class="showlist_teacherimagebox">
              <div class="showlist_teacherimage" :style="{backgroundImage:'url(' + showList.teacherinfo.faceimg + ')'}"></div>
              <p class="showlist_teachername">{{showList.teacherinfo.name}}</p>
            </div>
            <div v-html="showList.teacherinfo.teacher_text" class="html"> </div>
            <p class="showlist_introduce">适用人群</p>
            <p class="showlist_useinfo">一、不了解长高知识的父母</p>
            <p class="showlist_useinfo">二、想系统学习身高管理的父母</p>
            <p class="showlist_useinfo">三、想让孩子长到理想身高的父母</p>
            <p class="showlist_useinfo">四、0-18岁成长关键期孩子的父母</p>
            <p class="showlist_introduce">课程介绍</p>
            <div v-html="showList.content" class="html"></div>
          </div>
          <!-- 课程目录 -->
          <div class="showlist_lessonindex" v-show="lessonlistshowtype==1">
            <div class="lessonindex_list" @click="ChangeVideo(item.content)" v-for="(item,index) in lessonNumber " :key="index">
              <p class="list_p">{{item.title}}</p>
              <img class="list_img" :src="isVip?playIcon:buyIcon" alt="">
            </div>
          </div>
        </div>
      </div>
    </scroll-div>
    <div class="btn" v-if="isVip" @click="PlayVideo">{{i}}</div>
    <div class="btn" v-else @click="GoBuyLesson">{{z}}</div>
  
    <div :class="isBuy?s:h" style='height:100px;border:1rpx solid #333;border-radius:5px;  position: absolute;background:#fff; top: 40%; left: 0; bottom: 0; right: 0;'>
      <div style='width:100%;height:28px;'>
        <div style='width:30px;height:30px;line-height:30px;margin:0 auto;float:right;font-size:16px;text-align:center;' @click='CloseTip'>
          X
        </div>
      </div>
      <div style='position:absolute;width:100%;height:30px;margin:0 auto;float:right;font-size:10pt;text-align:center;'>
        进入客服消息后，发送"{{buyId}}"获取查询链接
      </div>
      <!-- 底部 -->
      <div style='width:100%;height:40px;overflow:hidden;position:absolute;bottom:0;box-sizing:border-box;'>
        <button plain='true' style='margin-bottom:0px;height:40px;line-height:40px;float:right;border:none;color:#00B26A;font-size:10pt;' open-type='contact' :session-from='link'>马上咨询</button>
      </div>
  
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  import request from "../../utils/api.js";
  import Toast from '../../components/toast.vue'
  export default {
    data() {
      return {
        playIcon: require('../../../static/image/play.png'),
        buyIcon: require('../../../static/image/buy.png'),
        lessonlistshowtype: 0,
        item: "200",
        isBuy: false,
        changecardisshow: true,
        a: "active",
        n: "normal",
        s: 'show',
        h: 'hidden',
        showList: [],
        showlistcontent: "",
        lessonNumber: 123,
        videoSrc: null,
        isVip: false,
        z: '立刻查询',
        i: '立刻观看',
        videoContext: null,
        link: '{"type": "keceng","unionId":"null","userid":"null","goodsid":"null"}',
        buyId: null,
      };
    },
    components: {
      Toast
    },
    methods: {
      ...mapMutations(["changevideo", 'toastshowtype', 'closeToast']),
      aaa(e) {},
      init() {
        this.toastshowtype(0)
        this.videoContext = wx.createVideoContext('myVideo');
        let url = `https://wx.biergao.vip/api/index/getvideourl`;
        let data = {
          cid: this.lessonListcontent.id,
          scode: 1,
          openid: this.userParam.openId
        };
        this.buyId = this.lessonListcontent.id
        request.GetWithData(url, data, res => {
          this.lessonNumber = res.data;
          this.videoSrc = res.data[0].content;
          this.ChangeParam()
        });
        this.showList = this.lessonListcontent;
        this.GetVipState()
  
        this.closeToast()
      },
      ChangeParam() {
        let data = JSON.parse(this.link)
        data.userid = this.userParam.userid
        data.unionId = this.userParam.unionId
        data.goodsid = this.lessonNumber[0].cid
        this.link = JSON.stringify(data)
        console.log(this.link);
      },
      CloseTip() {
        this.isBuy = false
      },
      PlayVideo() {
        this.videoContext.play()
      },
      GoBuyLesson() {
        this.isBuy = true
      },
      ChangeVideo(x) {
        if (this.isVip) {
          this.videoSrc = x
          this.videoContext.play()
          return
        }
        this.isBuy = true
      },
      GetVipState() {
        let url = 'https://wx.biergao.vip/api/vip/show'
        let data = {
          openid: this.userParam.openId
        }
        request.Post(url, data, res => {
          if (res.data == 'success') {
            this.isVip = true
          }
        })
      },
      preview(src, e) {
        // do something
      },
      navigate(href, e) {
        // do something
      },
      changecardtype(x) {
        this.lessonlistshowtype = x;
        if (x == 0) {
          this.changecardisshow = true;
        } else {
          this.changecardisshow = false;
        }
      },
      ComputeHight(e) {
        console.log(e);
      }
    },
    computed: {
      ...mapState(["lessonListcontent", "userParam"])
    },
    onLoad() {
      this.init();
    },
    onShow() {
      this.isBuy = false
    }
  };
</script>

<style scoped>
  .lessonindex_list {
    overflow: hidden;
    border-bottom: 3rpx solid #eee;
  }
  
  .show {
    display: block;
    z-index: 9999;
  }
  
  .hidden {
    display: none;
  }
  
  .listhead_showlist {
    margin-bottom: 140rpx;
  }
  
  .btn {
    width: 100%;
    height: 100rpx;
    position: fixed;
    left: 0px;
    bottom: 0px;
    background-color: #f2892c;
    color: white;
    line-height: 100rpx;
    font-size: 35rpx;
    text-align: center;
  }
  
  .asd {
    width: 100%;
    height: 400px;
  }
  
  .buylesson {
    background-color: white;
    position: relative;
  }
  .html{
    color: #999;
    font-size: 30rpx;
  }
  .fixed {
    position: -webkit-fixed;
    top: 0px;
    left: 0px;
  }
  
  .nofixed {
    position: static;
  }
  
  .list_p {
    padding: 30rpx;
    font-size: 30rpx;
    color: #999;
    float: left;
    vertical-align: middle;
  }
  
  .list_img {
    width: 45rpx;
    height: 45rpx;
    float: right;
    margin-right: 20rpx;
    vertical-align: middle;
    padding: 30rpx;
  }
  
  .showlist_teachername {
    text-align: center;
    margin-top: 25rpx;
    color: #999;
    width: 100%;
    font-size: 40rpx;
  }
  
  .showlist_lessonindex {
    width: 90%;
    margin: 0px auto;
    margin-top: 30rpx;
  }
  
  .showlist_lessoncontent {
    color: #999;
    font-size: 20rpx;
    margin-top: 20rpx;
  }
  
  .showlist_useinfo {
    font-size: 28rpx;
    color: #999;
    margin-top: 18rpx;
  }
  
  .showlist_teacherinfo {
    font-size: 28rpx;
    color: #999;
    line-height: 40rpx;
    margin-top: 20rpx;
  }
  
  .showlist_name {
    font-size: 30rpx;
    text-align: center;
    height: 50rpx;
    line-height: 50rpx;
    margin-top: 20rpx;
  }
  
  .showlist_teacherimage {
    width: 220rpx;
    height: 220rpx;
    background: url("") no-repeat center top;
    border-radius: 90%;
    background-size: cover;
    display: block;
    margin: 0 auto;
    margin-top: 30rpx;
  }
  
  .showlist_teacherimagebox {
    width: 100%;
    position: relative;
  }
  
  .showlist_introduce {
    font-size: 36rpx;
    line-height: 50rpx;
    padding: 20rpx 0rpx;
    border-bottom: 1px solid #eee;
  }
  
  .showlist_list {
    width: 90%;
    margin: 0 auto;
  }
  
  .changecardbor {
    width: 50%;
    height: 6rpx;
    background-color: #f2892c;
    display: inline-block;
  }
  
  .active {
    border-bottom: 5rpx solid #f2892c;
  }
  
  .normal {
    border: none;
  }
  
  .changecardcom {
    display: inline-block;
    width: 50%;
    height: 100rpx;
    font-size: 40rpx;
    line-height: 100rpx;
    text-align: center;
    color: black;
  }
  
  .listhead_changecard {
    background-color: #f4f4f4;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: 999;
  }
  
  .listhead_price {
    color: red;
    font-size: 35rpx;
    margin-top: 20rpx;
  }
  
  .listhead_tip {
    color: red;
    margin-top: 20rpx;
    font-size: 25rpx;
  }
  
  .listhead_title {
    font-size: 36rpx;
    font-weight: bold;
    padding-top: 20rpx;
  }
  
  .listhead {
    width: 90%;
    margin: 0 auto;
    height: 200rpx;
    background-color: white;
  }
  
  .video_list {
    width: 100%;
    height: 400rpx;
    width: 100%;
  }
</style>
