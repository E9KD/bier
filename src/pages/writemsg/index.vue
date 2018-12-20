<template>
  <div class="writemsg">
    <div class="box">
      <form bindsubmit="formSubmit" bindreset="formReset">
        <div class="shuru">
          <textarea
            class="shuru1"
            v-model="keyWord"
            placeholder="这一刻的想法"
            placeholder-style="font-size:12pt;color:#E4E3E3"
            name="content"
          />
        </div>

        <div class="images-wrapper">
          <div style="width:100px;height:20px;font-size:12pt;">
            <div style="float:left">上传照片</div>
            <div style="float:right">{{imgLength}}/9</div>
          </div>
          <div class="images-list">
            <div v-for="(item,index) in imglist" :key="index" style="position: relative;">
              <img :src="item" class="images-image" @click="PreviewImage(index)">
              <!-- <div class="img_close" @click="DeletePic(index)">X</div> -->
            </div>
            <div
              class="images-image image-plus"
              @click="ChooseImage"
              :style="{display:imgLength==9 ? 'none' :'div'}"
            >
              <div class="image-plus-horizontal"></div>
              <div class="image-plus-vertical"></div>
            </div>
          </div>
        </div>
        <button class="buttona" @click="PushMsg">提交</button>
      </form>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
import ajax from "../../utils/ajax.js";
import { mapState, mapMutations } from "vuex";
import Toast from "../../components/toast";
import { pushMsgUrl, getPreviewUrl, qzone } from "@/utils/api.js";
export default {
  data() {
    return {
      keyWord: "",
      imglist: [],
      picSrc: "",
      index: 0,
      imgLength: 0
    };
  },
  components: {
    Toast
  },
  methods: {
    ...mapMutations(["toastshowtype", "closeToast", "ChangeSpaceState"]),
    PushMsg() {
      let data = {
        nickName: this.userParam.nickName,
        content: this.keyWord,
        userId: this.userParam.openId,
        imgStr: this.picSrc,
        headimg: this.userParam.avatarUrl
      };
      ajax
        .Post(pushMsgUrl, data)
        .then(result => {
          setTimeout(() => {
            this.ChangeSpaceState(1);
            wx.switchTab({
              url: "/pages/space/main"
            });
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    PreviewImage(x) {
      let b = this.picSrc.split(",");
      let list = [];
      for (let i in this.imglist) {
        list.push(`${getPreviewUrl}${b[i]}`);
      }
      console.log(list);
      wx.previewImage({
        current: `${getPreviewUrl}${b[x]}`,
        urls: list
      });
    },

    ChooseImage() {
      let that = this;
      wx.chooseImage({
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          that.imglist.push(tempFilePaths[0]);
          that.imgLength = that.imglist.length;
          wx.uploadFile({
            url: `${qzone}uploadsfiles`,
            filePath: tempFilePaths[0],
            name: "image",
            success: res => {
              if (JSON.parse(res.data).status == 0) {
                that.toastshowtype({
                  t: 2,
                  p: "图片过大！"
                });
                that.imglist.pop();
                setTimeout(() => {
                  that.closeToast();
                }, 2000);
                return;
              }
              if (that.picSrc == "") {
                that.picSrc += `${JSON.parse(res.data).img}`;
              } else {
                that.picSrc += `,${JSON.parse(res.data).img}`;
              }
              that.closeToast();
            },
            fail: function(res) {
              console.debug(res);
            }
          });
        }
      });
    }
    // DeletePic(x) {
    //   console.log(x);
    //   if (this.imglist.length != 1) {
    //     this.imglist.splice(x, 1)
    //     let list=this.picSrc.split(",")
    //     console.log(list);
    //     this.picSrc=''
    //     list.splice(x, 1)
    //     console.log(list.splice(x, 1));
    //     console.log(list);
    //     for (let i = 0; i < list.length; i++) {
    //       this.picSrc+=list[i]
    //     }
    //   } else {
    //     this.imglist = []
    //     this.picSrc = ''
    //   }
    //   this.imgLength=this.imglist.length
    //   // console.log(this.imglist);
    //   // console.log(this.picSrc);
    // }
  },
  computed: {
    ...mapState(["userParam"])
  },
  onUnload() {
    this.keyWord = "";
    this.picSrc = "";
    this.imglist = [];
    this.index = 0;
  }
};
</script>

<style scoped>
.box {
  position: fixed;
  width: 100vw;
  height: 100%;
  background: #fff;
}

.img_close {
  position: absolute;
  top: 5%;
  right: 5%;
  height: 40rpx;
  width: 40rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 30rpx;
  border-radius: 100%;
  background-color: black;
  color: white;
}

.shuru {
  /*border:1px solid red;*/
  overflow: hidden;
  padding-top: 20px;
  margin: 0 auto;
  width: 90vw;
}

.shuru1 {
  width: 100%;
  height: 150rpx;
}

.buttona {
  background: #ffbe3c;
  width: 400rpx;
  height: 30px;
  border-radius: 20px;
  color: #fff;
  font-size: 14pt;
  margin-top: 100rpx;
  line-height: 30px;
}

.images-wrapper {
  background-color: #fff;
  margin: 0 auto;
  width: 90vw;
}

.images-wrapper-text {
  font-size: 28rpx;
}

.images-list {
  display: flex;
  margin-top: 20rpx;
  flex-wrap: wrap;
}

.images-image {
  width: 220rpx;
  height: 220rpx;
  background: #f2f2f2;
  /* border:1px solid red */
}

.image-plus {
  position: relative;
}

.image-plus-horizontal {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #d9d9d9;
  width: 4rpx;
  height: 80rpx;
  transform: translate(-50%, -50%);
}

.image-plus-vertical {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #d9d9d9;
  width: 80rpx;
  height: 4rpx;
  transform: translate(-50%, -50%);
}
</style>
