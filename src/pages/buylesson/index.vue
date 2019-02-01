
<template>
  <div class="lesson">
    <div class="lessonbox">
      <div class="lessonVideo">
        <div class="video_top">
          <div v-if="isPlay" class="video_top_img" @click.stop="isPlay=false">
            <img :src="lessonInfo.class_url_img" alt class="top_img_cover" style="height:200px;">
            <div class="top_img_p">
              <img src="../../../static/image/playwhite.png" alt class="img_p_img">
              <p class="img_p_p">点击播放</p>
            </div>
          </div>
          <div v-else class="video_top_video">
            <video
              id="myVideo"
              class="video"
              :src="videoSrc"
              style="height:200px;"
              direction="0"
              objectFit="fill"
              controls
              page-gesture
              show-fullscreen-btn
              show-play-btn
              show-center-play-btn
            ></video>
            <cover-view class="top_video_icon" @click="isPlay=true">
              <!-- <cover-image src="../../../static/image/besmall.png" alt="" class="video_icon_icon"/> -->
              <cover-view class="video_icon_p">收起</cover-view>
            </cover-view>
          </div>
        </div>
        <div class="video_bom">
          <div class="lesson_box">
            <div class="video_bom_title">
              <p class="bom_title_p">{{lessonInfo.title}}</p>
            </div>
            <div class="video_bom_time">
              <div class="bom_time_time">
                <p class="time_time_p">时间</p>
                <p class="time_time_content">{{date}}</p>
              </div>
            </div>
            <div class="video_bom_time" style="padding-bottom:50rpx;">
              <p class="time_time_p">分类</p>
              <p class="time_time_type">{{lessonType}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="lessonIntro">
        <div class="lesson_box">
          <p class="lessonIntro_title">课程简介</p>
          <p class="lessonIntro_content">{{lessonInfo.video_text}}</p>
        </div>
      </div>

      <div class="lessonIntro">
        <div class="lesson_box">
          <p class="lessonIntro_title">讲师介绍</p>
          <div class="lessonIntro_teacher">
            <div
              class="teacher_img"
              v-if="lessonInfo.teacherinfo.faceimg"
              :style="{backgroundImage:'url(' + lessonInfo.teacherinfo.faceimg + ')'}"
            ></div>
            <!-- <img :src="faceimg" alt="" class="teacher_img"> -->
            <p class="teacher_name">{{lessonInfo.teacherinfo.name}}</p>
          </div>
          <p class="lessonIntro_content">{{lessonInfo.teacherinfo.teacher_text}}</p>
        </div>
      </div>

      <div class="lessonIntro" style="padding-bottom:50rpx;">
        <div class="lesson_box">
          <p class="lessonIntro_title">课程表</p>
          <div class="lessonIntro_tip">
            <div class="tip_box">
              <img class="tip_box_img" src="../../../static/image/tip.png" alt>
              <p class="tip_box_p">视频观看</p>
            </div>
            <div class="tip_box" style="margin-left:30rpx;">
              <img class="tip_box_img" src="../../../static/image/tip.png" alt>
              <p class="tip_box_p">无限次重播</p>
            </div>
            <div class="tip_box" style="margin-left:30rpx;">
              <img class="tip_box_img" src="../../../static/image/tip.png" alt>
              <p class="tip_box_p">VIP免费</p>
            </div>
          </div>
          <div class="lessonList">
            <div v-for="(item,index) in lessonList" :key="index" class="lessonList_box">
              <p class="lessonList_index">&nbsp;</p>
              <div class="lessonList_titlebox">
                <p class="titlebox_title">{{item.title}}</p>
                <p class="titlebox_lessontime">课程时长：{{lessontime}}分钟</p>
              </div>
              <div class="lessonList_btn">
                <p v-if="isWatch" class="btn" @click="WatchVideo(item.content)">观看</p>
                <p v-else class="btn" @click="isBuy=true">咨询</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="isBuy?s:h"
      style="height:100px;border:1rpx solid #333;border-radius:5px;  position: fixed;background:#fff; top: 50%;transform: translate(0,-50%); left: 0; bottom: 0; right: 0;"
    >
      <div style="width:100%;height:28px;">
        <div
          style="width:30px;height:30px;line-height:30px;margin:0 auto;float:right;font-size:16px;text-align:center;"
          @click="isBuy=false"
        >X</div>
      </div>
      <div
        style="position:absolute;width:100%;height:30px;margin:0 auto;float:right;font-size:10pt;text-align:center;"
      >进入客服消息后，发送"{{lessonInfo.id}}"获取查询链接</div>
      <!-- 底部 -->
      <div
        style="width:100%;height:40px;overflow:hidden;position:absolute;bottom:0;box-sizing:border-box;"
      >
        <button
          plain="true"
          style="margin-bottom:0px;height:40px;line-height:40px;float:right;border:none;color:#00B26A;font-size:10pt;"
          open-type="contact"
          :session-from="link"
        >马上咨询</button>
      </div>
    </div>
    <div class="userinfo" @click.stop="GetShare" style="display:none;">
      <img src="../../../static/image/share.png" alt class="shareIcon">
      <p>分享给好友</p>
    </div>
  </div>
</template>

<script>
import ajax from "../../utils/ajax.js";
import { mapState, mapMutations } from "vuex";
import { lessonListUrl, isVipUrl } from "@/utils/api.js";
export default {
  data() {
    return {
      videoSrc: "",
      isPlay: true,
      lessonType: "视频课",
      lessontime: "60",
      lessonInfo: {},
      lessonList: null,
      isWatch: false,
      s: "show",
      h: "hidden",
      link:
        '{"type": "keceng","unionId":"null","userid":"null","goodsid":"null"}',
      isBuy: false,
      videoContext: null,
      share: false
    };
  },
  methods: {
    // 默认执行
    init() {
      this.lessonInfo = this.$store.state.lessonListcontent;
      let time = new Date(this.lessonInfo.teacherinfo.time_create * 1000);
      this.date = `${time.getFullYear()}/${time.getMonth() +
        1}/${time.getDate()}`;
      this.GetLessonInfo();
      this.GetVipState();
      this.ChangeLink();
    },

    // 修改link信息
    ChangeLink() {
      let data = JSON.parse(this.link);
      data.userid = this.$store.state.userParam.userid;
      data.unionId = this.$store.state.userParam.unionId;
      data.goodsid = this.lessonInfo.id;
      this.link = JSON.stringify(data);
    },

    //获取课程信息
    GetLessonInfo() {
      ajax
        .Get(lessonListUrl, {
          cid: this.lessonInfo.id,
          scode: 1,
          openid: this.$store.state.userParam.openId
        })
        .then(res => {
          this.lessonList = res;
          if (res.isset) {
            this.isWatch = true;
          }
          delete this.lessonList.isset;
          this.videoSrc = this.lessonList[0].content;
        });
    },

    //获取用户vip信息
    GetVipState() {
      ajax
        .Post(isVipUrl, { openid: this.$store.state.userParam.openId })
        .then(res => {
          if (res == "success") {
            this.isWatch = true;
            return;
          }
          this.isWatch = false;
        });
    },

    // 播放视频
    WatchVideo(x) {
      this.isPlay = true;
      this.videoContext = wx.createVideoContext("myVideo");
      this.videoSrc = x;
      setTimeout(() => {
        this.isPlay = false;
      }, 500);
    },

    // 分享
    GetShare() {
      wx.navigateTo({
        url: "/pages/canvaspage/main"
      });
    }
  },
  onLoad() {
    this.init();
  }
};
</script>
 
<style scoped>
/* .shareIcon {
                display: inline-block;
                margin-left: 10rpx;
                width: 30rpx;
                height: 30rpx;
                vertical-align: middle;
            }
            
            .userinfo p {
                vertical-align: middle;
                margin-left: 10rpx;
                display: inline-block;
            }
            
            .userinfo {
                opacity: 0.9;
                background-color: #ff5da2;
                position: absolute;
                top: 10%;
                right: 0px;
                color: white;
                padding: 10rpx 20rpx;
                font-size: 25rpx;
                border-bottom-left-radius: 30rpx;
                border-top-left-radius: 30rpx;
            } */

.show {
  display: block;
  z-index: 9999;
}

.hidden {
  display: none;
}

.lessonList_box {
  margin-top: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1px solid #eee;
}

.btn {
  font-size: 25rpx;
  display: inline-block;
  vertical-align: top;
  padding: 5rpx 20rpx;
  border: 1px solid #999;
  border-radius: 20rpx;
}

.lessonList_btn {
  width: 20%;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
}

.titlebox_lessontime {
  margin-top: 20rpx;
  font-size: 25rpx;
  color: #999;
}

.lessonList_titlebox {
  font-size: 28rpx;
  display: inline-block;
  vertical-align: top;
  width: 70%;
}

.lessonList_index {
  display: inline-block;
  font-size: 28rpx;
  vertical-align: top;
  width: 10%;
}

.tip_box_p {
  display: inline-block;
  margin-left: 10rpx;
  font-size: 22rpx;
  vertical-align: middle;
}

.tip_box_img {
  display: inline-block;
  vertical-align: middle;
  width: 30rpx;
  height: 30rpx;
}

.tip_box {
  display: inline-block;
  /* margin-left: 30rpx; */
}

.lessonIntro_tip {
  margin-top: 30rpx;
}

.teacher_name {
  font-size: 25rpx;
  margin-left: 30rpx;
  float: left;
  height: 80rpx;
  line-height: 80rpx;
}

.teacher_img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 100%;
  float: left;
  background: url("") no-repeat center top;
  background-size: cover;
  margin: 0 auto;
}

.lessonIntro_teacher {
  padding: 30rpx 0;
  border-bottom: 1px solid #eee;
  overflow: hidden;
}

.lessonIntro_content {
  margin-top: 30rpx;
  padding-bottom: 30rpx;
  font-size: 25rpx;
}

.lessonIntro_title {
  padding-top: 30rpx;
  font-size: 30rpx;
}

.lessonIntro {
  margin-top: 20rpx;
  background-color: white;
}

.time_time_p {
  display: inline-block;
}

.time_time_type {
  font-size: 20rpx;
  color: #ec881d;
  padding: 6rpx;
  border: 1px solid #ec881d;
  margin-left: 30rpx;
  display: inline-block;
}

.time_time_content {
  margin-left: 30rpx;
  display: inline-block;
}

.bom_time_time {
  display: inline-block;
}

.video_bom_time {
  font-size: 25rpx;
  margin-top: 30rpx;
}

.video_bom_title {
  font-size: 30rpx;
  padding-top: 50rpx;
}

.lesson_box {
  width: 90%;
  margin: 0 auto;
}

.video_bom {
  background-color: white;
}

.video_icon_p {
  display: inline-block;
  font-size: 25rpx;
  color: white;
  vertical-align: middle;
  padding: 8rpx 17rpx;
}

.video_icon_icon {
  vertical-align: middle;
  width: 25rpx;
  height: 25rpx;
  display: inline-block;
}

.top_video_icon {
  position: absolute;
  top: 10%;
  right: 10%;
  background-color: black;
  border-radius: 18rpx;
}

.img_p_img {
  display: inline-block;
  width: 40rpx;
  height: 40rpx;
  vertical-align: middle;
  line-height: 80rpx;
  margin-left: 50rpx;
}

.img_p_p {
  display: inline-block;
  color: white;
  vertical-align: middle;
  line-height: 80rpx;
  margin-right: 50rpx;
}

.top_img_p {
  opacity: 0.7;
  border-radius: 50rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  height: 80rpx;
}

.video_top_img {
  position: relative;
}

.video_top_video {
  position: relative;
}

.share {
  position: fixed;
  bottom: 40%;
  right: 0px;
  z-index: 999;
  width: 50rpx;
  height: 50rpx;
  background-color: black;
  color: white;
}
</style>
