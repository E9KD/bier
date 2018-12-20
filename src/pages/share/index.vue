<template>
  <div class="share">
    <div class="container" disable-scroll="true">
      <div class="mine-top-fen">
        <div class="classname">
          <img class="userinfo-avatar" :src="userParam.avatarUrl" background-size="cover">
          <div class="moname">{{userParam.nickName}}</div>
          <!-- <div class='moname'>{{userInfo.nickName}}</div> -->
        </div>
      </div>
      <div class="weui-cells weui-cells_show" @click="userinfo">
        <div class="list_a weui-cell weui-cell_access">
          <div class="weui-cell__bd">累计用户数量</div>
          <div class="weui-cell__ft weui-cell__ft_in-access">0</div>
        </div>
      </div>
      <div style="height:10px;"></div>
      <div style="height:10px;"></div>
      <div class="cat-list">
        <scroll-div scroll-x="true">
          <div class="list-content">
            <div class="cat-item">
              <div style="padding:15px 8px;">
                <div style="padding:5px;border-radius:5px;background:#EBC98B" @click="GoServe">
                  <div class="tui" style="color:#fff;font-size:12pt">服务推广</div>
                  <div class="tui-next">赢服务</div>
                </div>
              </div>
            </div>
            <div class="cat-item">
              <div style="padding:15px 8px;">
                <div style="padding:5px;border-radius:5px;background:#ECB6B5" @click="GoLesson">
                  <div class="tui">课程推广</div>
                  <div class="tui-next">看课程</div>
                </div>
              </div>
            </div>
            <div class="cat-item">
              <div style="padding:15px 8px;">
                <div style="padding:5px;border-radius:5px;background:#6FBF2F" @click="GoDefault">
                  <div class="tui">普通推广</div>
                  <div class="tui-next">齐推广</div>
                </div>
              </div>
            </div>
          </div>
        </scroll-div>
      </div>
      <div style="width:100%;position:fixed;bottom: 0;">
        <div class="weui-footer">
          <div class="weui-footer__links">
            <div class="weui-footer__link" @click="GoHome">返回首页</div>
          </div>
          <div class="weui-footer__text">Copyright © 2016-2019 biergao.com</div>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <div class="cf-bg" style="z-index:999;" v-if="isDefault">
      <div class="bg-blur" style="background:#fff"></div>
      <div class="jz" style="width:100vw;height:1005;">
        <div class="jz" style="width:80vw;height:100vh;padding-top:10vh;">
          <div
            style="width:100%;height:64vh;border:1px solid #fff;border-radius:5px;position:relative;background:#fff"
          >
            <div style="width:100%;height:28px;">
              <div
                style="width:30px;height:30px;line-height:30px;margin:0 auto;float:right;font-size:16px;text-align:center;"
                @click="CloseDefault"
              >X</div>
            </div>
            <!-- 查询 300 1500 -->
            <!-- 头部三部分 -->
            <div style="height:50vh;">
              <img style="width:100%;height:50vh" src="https://wx.biergao.vip/uploads/code/8.jpg">
            </div>
            <!-- 底部 -->
            <div
              style="width:100%;background:#e5e5e5;overflow:hidden;position:absolute;bottom:0;box-sizing:border-box;"
            >
              <div style="background:#e5e5e5;">
                <!-- 底部 -->
                <button
                  class="share"
                  open-type="share"
                  plain="true"
                  style="width:50%;height:40px;float:left;line-height:40px;border:none"
                >转发</button>
                <div
                  style="width:50%;height:40px;float:right;line-height:40px;"
                  @click="SaveCanvas"
                >保存</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      type: "f",
      isDefault: false
    };
  },
  methods: {
    GoServe() {
      wx.switchTab({
        url: `/pages/serve/main`
      });
    },
    GoLesson() {
      wx.switchTab({
        url: `/pages/lesson/main`
      });
    },
    GoDefault() {
      this.isDefault = true;
    },
    CloseDefault() {
      this.isDefault = false;
    },
    SaveCanvas() {
      this.DownCanvas().then(res => {
        wx.saveImageToPhotosAlbum({
          filePath: res,
          success: res => {
            wx.showToast({
              title: "图片已保存到相册",
              icon: "none",
              duration: 2000
            });
            setTimeout(() => {
              this.isDefault = false;
            }, 2500);
          }
        });
      });
    },
    DownCanvas() {
      return new Promise(resolve => {
        wx.downloadFile({
          url: `https://wx.biergao.vip/uploads/code/8.jpg`,
          success: res => {
            if (res.statusCode === 200) {
              resolve(res.tempFilePath);
            }
          }
        });
      });
    }
  },
  computed: {
    ...mapState(["userParam"])
  }
};
</script>

<style scoped>
page {
  background: #f8f8f8;
}

.usermotto {
  width: 92%;
  background: #fff;
  border-bottom: 2rpx #f1f1f1 solid;
  padding: 0 4%;
}

.classname {
  margin: 0 auto;
  width: 100%;
}

.moname {
  overflow: hidden;
  padding-left: 10px;
}

.mine-top-fen {
  padding: 120rpx 10px;
  box-sizing: border-box;
  background: #004299;
  color: white;
}

.mine-top-fen image {
  width: 100rpx;
  height: 100rpx;
  display: inline-block;
  overflow: hidden;
  border-radius: 50%;
  float: left;
}

.tui {
  color: #fff;
  font-size: 12pt;
}

.tui-next {
  color: #fff;
  font-size: 9pt;
}

/* .mine-top-fen view {
                                      margin-bottom: 20rpx;
                                    } */

.weui-cells {
  margin-top: 0px;
  font-size: 11pt;
  background: #fff;
}

.bbt {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  background: #fff;
}

.item {
  width: 33.5vw;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
}

.cat-list {
  white-space: nowrap;
  border-bottom: 1rpx solid #e3e3e3;
  background: #fff;
}

.cat-list .list-content {
  white-space: nowrap;
}

.cat-list .cat-item {
  white-space: nowrap;
  display: inline-block;
  width: 33.5vw;
  margin: 0 auto;
  /* text-align:center; */
  height: 100%;
}

.cat-list .cat-item text {
  white-space: nowrap;
  border-bottom: 5rpx solid transparent;
  height: 100%;
  transform: translateY(1rpx);
}

.cat-list .cat-item.active text {
  color: #ff4544;
  border-bottom-color: #ff4544;
}

.list_a {
  width: 90vw;
  padding: 30rpx 0;
  margin: 0 auto;
}

.list_b {
  border-top: 2rpx #f1f1f1 solid;
  padding: 30rpx 0;
}

.kefu {
  width: 90rpx;
  height: 90rpx;
  position: fixed;
  right: 20rpx;
  bottom: 120rpx;
  border: 1px solid #ba77ff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ba77ff;
  border-radius: 50%;
}

.menu-item {
  width: 50%;
}

/* 作为展示用的样式 */

.weui-footer {
  margin-bottom: 50px;
  font-size: 25rpx;
  text-align: center;
}

/*jz  */

.jz {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  margin: 0 auto;
  text-align: center;
}

.jz button[plain] {
  color: #353535;
  border: 1px solid #353535;
  background-color: transparent;
  line-height: 1.5;
  width: 49%;
  display: inline;
}

.nav {
  width: 49%;
  border: 1px solid #353535;
  float: right;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 1.5;
  border-radius: 5px;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000;
  background-color: transparent;
}

.bg-blur {
  position: fixed;
  float: left;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* -webkit-filter: blur(15px);
                                      -moz-filter: blur(15px);
                                      -o-filter: blur(15px);
                                      -ms-filter: blur(15px);
                                      filter: blur(15px); */
}

/* 控制圆圈样式 */

.on {
  background: #ed881e;
  color: #fff;
}

.off {
  background: #fff;
  color: #000;
}

.share {
  line-height: 40px;
  background: none !important;
}
</style>
