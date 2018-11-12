<template>
  <div class="buylesson">
    <video class="video_list" :src="videoSrc" controls page-gesture direction show-fullscreen-btn show-play-btn show-center-play-btn></video>
    <scroll-view :scroll-y='true' @scroll="aaa" class="asd">
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
            <wxParse :content="showList.teacherinfo.teacher_text" @preview="preview" @navigate="navigate" />
            <p class="showlist_introduce">适用人群</p>
            <p class="showlist_useinfo">一、不了解长高知识的父母</p>
            <p class="showlist_useinfo">二、想系统学习身高管理的父母</p>
            <p class="showlist_useinfo">三、想让孩子长到理想身高的父母</p>
            <p class="showlist_useinfo">四、0-18岁成长关键期孩子的父母</p>
            <p class="showlist_introduce">课程介绍</p>
            <wxParse :content="showList.content " @preview="preview" @navigate="navigate" />
          </div>
          <!-- 课程目录 -->
          <div class="showlist_lessonindex" v-show="lessonlistshowtype==1">
            <div class="lessonindex_list" v-for="(item,index) in lessonNumber " :key="index">
              <p class="list_p">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  import wxParse from "mpvue-wxparse";
  import request from "../../utils/api.js";
  export default {
    data() {
      return {
        lessonlistshowtype: 0,
        item: "200",
        changecardisshow: true,
        a: "active",
        n: "normal",
        showList: [],
        showlistcontent: "",
        lessonNumber: 123,
        f: "fixed",
        n: "nofixed",
        videoSrc: null
      };
    },
    components: {
      wxParse
    },
    methods: {
      ...mapMutations(["changevideo"]),
      aaa(e) {
        console.log(e);
      },
      init() {
        let url = `https://wx.biergao.vip/api/index/getvideourl`;
        let data = {
          cid: this.lessonListcontent.id,
          scode: 1,
          openid: this.userParam.openId
        };
        request.GetWithData(url, data, res => {
          this.lessonNumber = res.data;
          this.videoSrc = res.data[0].content;
        });
        this.showList = this.lessonListcontent;
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
      console.log(this.videoSrc);
    }
  };
</script>

<style scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  .asd {
    width: 100%;
    height: 400px;
  }
  
  .buylesson {
    background-color: white;
    position: relative;
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
    border-bottom: 1px solid #999;
    border-bottom: 3rpx solid #eee;
    font-size: 30rpx;
    color: #999;
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
