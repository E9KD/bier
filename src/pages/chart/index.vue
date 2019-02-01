<template>
  <div class="chartbox">
    <div class="container">
      <scroll-view
        class="scrool-div"
        :scroll-y="true"
        :scroll-with-animation="true"
        :enable-back-to-top="true"
        :scroll-top="talkHeight"
      >
        <div class="chat-list">
          <div v-for="(item,index) in chartList" :key="index">
            <!-- 对话 -->
            <div v-if="item.stype == 1">
              <!-- 这是对方 -->
              <div class="chat-left" v-if="item.from_id != MineId">
                <img class="avatar-img" src="../../../static/image/addman.png">
                <div>
                  <div>{{item.from_client_name}}</div>
                  <text class="lefttext">{{item.content}}</text>
                </div>
              </div>
              <!-- 这是自己 -->
              <div class="chat-right" v-if="item.from_id == MineId">
                <div>
                  <text class="timecenter">{{item.time}}</text>
                  <div style="text-align:right;">{{item.from_client_name}}</div>
                  <text class="righttext">{{item.content}}</text>
                </div>
                <img class="avatar-img" src="../../../static/image/addman.png">
              </div>
            </div>
            <!-- 录音 -->
            <div v-if="item.stype == 2">
              <!-- 这是对方 -->
              <div class="chat-left" v-if="item.from_id != MineId">
                <img class="avatar-img" src="../../../static/image/addman.png">
                <div>
                  <text class="timecenter">{{item.time}}</text>
                  <div>{{item.from_client_name}}</div>
                  <div class="recorebox_left" @click="PlayVoice(item.content)">
                    <img
                      src="../../../static/image/playing.png"
                      class="emoji leftadoimg page-body-button"
                    >
                  </div>
                </div>
              </div>
              <!-- 这是自己 -->
              <div class="chat-right" v-if="item.from_id == MineId">
                <div>
                  <text class="timecenter">{{item.time}}</text>
                  <div style="text-align:right;">{{item.from_client_name}}</div>
                  <div class="recorebox_right" @click="PlayVoice(item.content)">
                    <img
                      src="../../../static/image/playing-180.png"
                      class="emoji rightadoimg page-body-button"
                    >
                  </div>
                </div>
                <img class="avatar-img" src="../../../static/image/addman.png">
              </div>
            </div>
            <!-- 图片 -->
            <div v-if="item.stype == 3">
              <!-- 这是对方 -->
              <div class="chat-left" v-if="item.from_id != MineId">
                <img class="avatar-img" src="../../../static/image/addman.png">
                <div>
                  <div>{{item.from_client_name}}</div>
                  <img
                    class="file-img file_img_left"
                    mode="aspectFit"
                    @click="GoBig(item.content)"
                    :src="item.content"
                  >
                </div>
              </div>
              <!-- 这是自己 -->
              <div class="chat-right" v-if="item.from_id == MineId">
                <div>
                  <text class="timecenter">{{item.time}}</text>
                  <div style="text-align:right;">{{item.from_client_name}}</div>
                  <img
                    class="file-img file_img_right"
                    mode="aspectFit"
                    @click="GoBig(item.content)"
                    :src="item.content"
                  >
                </div>
                <img class="avatar-img" src="../../../static/image/addman.png">
              </div>
            </div>
          </div>
        </div>
      </scroll-view>

      <div class="cf-bg" catchtap="cemojiCfBg" style="display:none;"></div>
      <div class="comment-fixed">
        <div class="cf-box">
          <img
            src="../../../static/image/input.png"
            v-if="!isTalk"
            class="emoji"
            @click="isTalk=true"
          >
          <img src="../../../static/image/recode.png" v-else class="emoji" @click="isTalk=false">
          <input
            v-if="isTalk"
            v-model="keyWord"
            name="ask_word"
            type="text"
            class="cf-content"
            placeholder="输入消息"
            @confirm="SendText"
            @input="Senda"
            auto-height
          >
          <button v-else class="cf-content" @touchend="touchup" @longpress="touchdown">按住 说话</button>
          <img src="../../../static/image/more.png" class="emoji" @click="isShow=!isShow">
        </div>

        <div :class="[isShow ? 'emoji-move-in' : 'emoji-move-out']" class="emoji-box">
          <div class="emoji-cell">
            <img
              src="../../../static/image/pic.png"
              class="touch-active"
              @click="ImgUplaod($event)"
            >
          </div>
        </div>
      </div>
    </div>
    <img class="speaker" v-if="isSpeake" src="../../../static/image/speake.gif">
    <Toast></Toast>
  </div>
</template>
 
<script>
import { qzone, socketUrl } from "@/utils/api.js";
import { mapState } from "vuex";
import Toast from "@/components/toast.vue";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      chartList: [],
      isTalk: false,
      voice: null,
      isSpeake: false,
      isVoice: false,
      keyWord: null,
      isShow: false,
      socketOpen: false,
      MineId: null,
      talkHeight: 9999
    };
  },
  components: {
    Toast
  },
  methods: {
    init() {
      this.chartList = [];
      this.sendContent = null;
      this.Link();
      this.MineId = this.userParam.userid;
    },
    Link() {
      wx.connectSocket({
        url: socketUrl,
        success: () => {
          console.log("websocket握手成功，发送登录数据:");
        },
        fail: () => {
          this.ErrorToast();
        }
      });
      wx.onSocketOpen(res => {
        this.socketOpen = true;
        this.SendLoginMessage();
        console.log("WebSocket连接已打开！");
      });
      wx.onSocketError(res => {
        this.socketOpen = false;
        this.ErrorToast();
        console.log("WebSocket连接打开失败，请检查！");
      });
      wx.onSocketMessage(res => {
        console.log(res);
        console.log(JSON.parse(res.data));
        if (
          JSON.parse(res.data).type == "ping" ||
          JSON.parse(res.data).type == "login" ||
          JSON.parse(res.data).from_id == this.userParam.userid
        )
          return;
        let data = JSON.parse(res.data);
        let type = {
          stype: data.stype,
          from_client_name: data.from_client_name,
          content: data.content,
          from_id: data.from_id
        };
        this.LocalListPush(type);
      });
      wx.onSocketClose(res => {
        this.socketOpen = false;
        console.log("WebSocket 已关闭！");
      });
    },
    ErrorToast() {
      let x = {
        t: 2,
        p: `无连接，请重进！`
      };
      setTimeout(() => {
        this.$store.commit("toastshowtype", x);
      }, 100);
      setTimeout(() => {
        this.$store.commit("closeToast");
      }, 3000);
    },
    ImgUplaod(e) {
      self = this;
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          this.SendImage(res);
        }
      });
    },
    GoBig(x) {
      // wx.uploadFile({
      //   url: `${qzone}uploadsfiles`,
      //   filePath: x,
      //   name: "image",
      //   success: res => {
      //     console.log(`${qzone}${JSON.parse(res.data).img}`);
      //     wx.previewImage({
      //       current: `${qzone}${JSON.parse(res.data).img}`
      //     });
      //   }
      // });
    },
    // 发送信息
    SendText() {
      // let type = {
      //   stype: 1,
      //   content: this.keyWord,
      //   to_client_name: "NewPc",
      //   to_client_id: "123",
      //   from_id: "808",
      //   to_id: "100"
      // };
      let type = `{ "type": "chatMessage", "data": { "to_id": "KF2", "to_name": "客服", "content": "${
        this.keyWord
      }", "from_name": "${
        this.userParam.nickName
      }", "from_id": "808", "from_avatar": "${this.userParam.avatarUrl}"}}`;
      this.LocalListPush(type);
      this.ServeListPush(type);
      this.keyWord = null;
    },
    // 发送音频
    SendVoice() {
      let type = {
        stype: 2,
        content: this.voice,
        to_client_name: "冰镇",
        to_client_id: "asd",
        from_id: "808",
        to_id: "20"
      };
      this.LocalListPush(type);
      this.ServeListPush(type);
    },
    // 发送图片
    SendImage(res) {
      let type = {
        stype: 3,
        content: res.tempFilePaths[0],
        to_client_name: "冰镇",
        to_client_id: "asd",
        from_id: "808",
        to_id: "20"
      };
      this.LocalListPush(type);
      this.ServeListPush(type);
    },

    Senda() {},
    PlayVoice(x) {
      console.log(1111);
      console.log(x);
      wx.playVoice({
        filePath: x,
        success: res => {
          console.log(`成功了`);
        }
      });
    },
    ServeListPush(x) {
      this.sendSocketMessage(x);
    },
    SendLoginMessage() {
      let data = `{"type":"userInit","name":"${
        this.userParam.nickName
      }","group":"1","uid":"808","kid":"KF2","avatar":"${
        this.userParam.avatarUrl
      }"}`;
      this.sendSocketMessage(data);
    },
    // 发送信息给服务器
    sendSocketMessage(data) {
      if (this.socketOpen) {
        wx.sendSocketMessage({
          data: data,
          success: res => {
            console.log(res);
          }
        });
      } else {
        this.ErrorToast();
        console.log("请先建立连接");
      }
    },
    CheckAuthorize() {
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.record"]) {
            wx.authorize({
              scope: "scope.record",
              success() {
                console.log(`启动录音成功`);
              },
              fail() {
                console.log(`启动录音失败`);
              }
            });
          }
        }
      });
    },
    LocalListPush(x) {
      this.chartList.push(x);
      this.talkHeight += 1;
    },
    touchdown() {
      this.isSpeake = true;
      this.CheckAuthorize();
      wx.startRecord({
        success: res => {
          this.voice = res.tempFilePath;
          this.isVoice = true;
          this.SendVoice();
        },
        fail: res => {
          console.log("cuowu");
        }
      });
    },
    touchup() {
      wx.stopRecord();
      this.isSpeake = false;
    }
  },
  computed: {
    ...mapState(["userParam"])
  },
  onLoad() {
    this.init();
  }
};
</script>


<style scoped>
.recorebox_left {
  float: left;
  width: 200rpx;
  background-color: white;
}
.recorebox_right {
  float: right;
  width: 200rpx;
  background-color: white;
}
.file_img_right {
  float: right;
}
.file_img_left {
  float: left;
}
page {
  line-height: 1.2;
  height: 100%;
  background-color: #e3e3e3;
}
.chartbox {
  height: 100vh;
}
.container {
  height: 80%;
  min-height: 97.6%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 15rpx 15rpx;
  background-color: gainsboro;
}

.chat-list {
  flex: 1;
  padding-bottom: 80rpx;
}

.scrool-div {
  height: 91%;
}

.chat-left {
  font-size: 35rpx;
  display: flex;
  align-items: center;
  margin-top: 20rpx;
}

.chat-left div {
  flex: 1;
  margin-left: 10rpx;
  padding: 10rpx 10rpx;
  border-radius: 11rpx;
  word-break: break-all;
}

.lefttext {
  font-size: 30rpx;
  display: flex;
  float: left;
  text-align: left;
  flex: 1;
  margin-left: 10rpx;
  padding: 10rpx 20rpx;
  background-color: white;
  border-radius: 11rpx;
  word-break: break-all;
}

.chat-right {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
  font-size: 35rpx;
}

.righttext {
  font-size: 30rpx;
  display: flex;
  text-align: right;
  float: right;
  flex: 1;
  margin-right: 10rpx;
  padding: 10rpx 20rpx;
  background-color: white;
  border-radius: 11rpx;
  word-break: break-all;
}
.page-body-img {
  text-align: center;
  border: 1rpx solid #e8ffc7;
}
.rightadoimg {
  text-align: right;
  float: right;
  background-color: #e8ffc7;
}
.leftadoimg {
  text-align: left;
  float: left;
  background-color: #e8ffc7;
}
.file-img {
  width: 100rpx;
  height: 80rpx;
}
.chat-right div {
  flex: 1;
  margin-right: 10rpx;
  padding: 10rpx 10rpx;
  border-radius: 11rpx;
  word-break: break-all;
}

.timecenter {
  display: flex;
  text-align: center;
  margin: auto;
  width: 220rpx;
  font-size: 9px;
}

.avatar-img {
  width: 70rpx;
  height: 70rpx;
  border-radius: 70rpx;
}

.button-hover {
  background-color: #ccc;
}

.pos-rel {
  position: relative;
}

.pos-abs {
  position: absolute;
}

.olami-info {
  font-size: 10px;
  align-items: right;
}

.speaker {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

.comment-fixed {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.cf-bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  z-index: 99;
  opacity: 0.5;
}

.cf-box {
  padding: 8px 5px;
  display: flex;
  justify-content: center;
}

.t-info textarea {
  background: red;
  padding: 8px;
  height: 30px;
  box-sizing: border-box;
  width: 100%;
  display: div;
}

.cf-content {
  background-color: #f2f2f2;
  font-size: 12px;
  height: 30px;
  max-height: 40px;
  width: 100%;
  margin: 0 10rpx;
  padding-left: 20rpx;
}

.cf-send {
  width: 80px;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
  border-radius: 2px;
  text-align: center;
  padding: 0 2px !important;
  font-size: 12px;
  background-color: #e95854;
  color: #fff;
  border: 1rpx solid #b03f3e;
}

.emoji {
  background-color: #fff;
  width: 50rpx;
  height: 50rpx;
  text-align: center;
  padding-top: 2px;
  box-sizing: border-box;
  font-size: 20px;
}

.emoji-box {
  position: relative;
  height: 90px;
  padding: 5px 0;
  box-sizing: border-box;
  margin-bottom: -90px;
}

.emoji-cell {
  width: 25%;
  height: 75px;
  display: inline-div;
}

.emoji-cell img {
  display: -webkit-flex;
  padding-top: 15px;
  width: 40px;
  height: 40px;
  margin: auto;
}

.emoji-move-in {
  -webkit-animation: emoji-move-in 0.3s forwards;
  animation: emoji-move-in 0.3s forwards;
}

.emoji-move-out {
  -webkit-animation: emoji-move-out 0.3s forwards;
  animation: emoji-move-out 0.3s forwards;
}

.no-emoji-move {
  -webkit-animation: none;
  animation: none;
}

@-webkit-keyframes emoji-move-in {
  0% {
    margin-bottom: -90px;
  }

  100% {
    margin-bottom: 0;
  }
}

@keyframes emoji-move-in {
  0% {
    margin-bottom: -90px;
  }

  100% {
    margin-bottom: 0;
  }
}

@-webkit-keyframes emoji-move-out {
  0% {
    margin-bottom: 0;
  }

  100% {
    margin-bottom: -90px;
  }
}

@keyframes emoji-move-out {
  0% {
    margin-bottom: 0;
  }

  100% {
    margin-bottom: -90px;
  }
}

@-webkit-keyframes pd-left-move {
  0% {
    padding-left: 5px;
  }

  100% {
    padding-left: 15px;
  }
}

@keyframes pd-left-move {
  0% {
    padding-left: 5px;
  }

  100% {
    padding-left: 15px;
  }
}

@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_609714_un21d8xb8gyfd2t9.eot");
  src: url("//at.alicdn.com/t/font_609714_un21d8xb8gyfd2t9.eot?#iefix")
      format("embedded-opentype"),
    /* url("//at.alicdn.com/t/font_609714_un21d8xb8gyfd2t9.woff") format("woff"), */
      url("//at.alicdn.com/t/font_609714_un21d8xb8gyfd2t9.ttf")
      format("truetype"),
    url("//at.alicdn.com/t/font_609714_un21d8xb8gyfd2t9.svg#iconfont")
      format("svg");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-right: 8rpx;
}

.icon-jiahao:before {
  content: "\e63c";
}

.icon-opload:before {
  content: "\e600;";
}

.icon-yuyin:before {
  content: "\e62e";
}

.icon-keyborad::before {
  content: "\e7b2";
}

.icon-laba::before {
  content: "\e623";
}

.page-body-button {
  /* width: 250rpx; */
  text-align: center;
  line-height: 48rpx;
  padding-left: 8rpx;
}
</style>
