<template>
  <div class="space">
    <div v-if="isshow > 0">
      <scroll-div scroll-y="true">
        <!-- <div class='box'> -->
        <div class="result-item" v-for="(item,index) in searchSongList" :key="index">
          <!-- <div class="content" wx:for="{{resultData}}" wx:key="item"> -->
  
          <!--头像-->
          <div class="head">
            <img class="baseimg" :src="item.headimg" mode="scaleToFill" alt="">
          </div>
  
          <div class="right_box">
            <!--昵称-->
            <text class="wz">{{item.name}}</text>
            <!--内容-->
            <text class="desc">{{item.content}}</text>
            <!--显示上传图片-->
            <div v-if="item.imgnum > 0" style="margin-left: 20rpx;margin-top:20rpx;">
              <div class="images-wrapper">
                <div class="images-list">
                  <div v-for="(item2,index2) in item.imglist" :key='index2' style='margin-left:20rpx;'>
                    <img class="images-image1" :src="'https://wx.biergao.vip/uploads/thumb' + item2" @click="PreviewImage(item2,item.imglist)">
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-else style="margin-left: 20rpx;">
                            <div class="images-wrapper">
                              <div class="images-list">
                                <div v-for="(item,index3) in item.imglist" :key='index3'>
                                  <img class="images-img" src="https://wx.biergao.vip/uploads/thumb">
                                </div>
                              </div>
                            </div>
                          </div> -->
            <!--显示发布时间-->
            <div class="time">
              <p class="time_p">{{item.datatime}}</p>
  
  
              <div v-if="item.dianzan" style="float:right;overflow:hidden">
                <!-- <p style="vertical-align: middle;font-size:20rpx;">已赞</p> -->
                <img class="xin" src="../../../static/image/zan1.png">
                <div style='display:inline-block;vertical-align: middle;font-size:30rpx;margin-left:10rpx;'>已赞</div>
              </div>
  
              <div v-else style="float:right;overflow:hidden" @click="UpStar(item.id,item.dianzan,index)">
                <!-- <p style="vertical-align: middle;font-size:20rpx;">点赞</p> -->
                <img class="xin" src="../../../static/image/zan.png">
                <div style='display:inline-block;vertical-align: middle;font-size:30rpx;margin-left:10rpx;'>点赞</div>
              </div>
            </div>
  
            <!--显示点赞-->
  
            <div v-if="item.dianzanlist" style="margin-left: 20rpx;">
              <div class="dianzan-box">
                <!-- <div class="dianzan-biao">
                                  <img class="xin2" src="../../../static/image/zan.png"  style='line-height:35rpx;'>
                                </div> -->
                <div class="dianzan-text">
                  <img class="xin2" src="../../../static/image/zan1.png">
                  <p class="dianzan_text_p">{{item.dianzanlist}}</p>
                </div>
              </div>
            </div>
            <div style='height:30rpx;'></div>
          </div>
  
        </div>
  
      </scroll-div>
  
      <div class="qbutton">
        <div style='width:100%;height:100%; ' @click='WriteMsg' v-if="isshow > 0">
          <img src='../../../static/image/qianbi.png' style='width:70rpx;height:70rpx '>
        </div>
      </div>`
    </div>
    <view class="loading" v-if="isDoom">上滑查看更多</view>
    <view class="loading complete" :class="isshow==0?c:''" v-else>我是有底线的</view>
  </div>
</template>

<script>
  import request from '../../utils/api.js'
  import {
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        isshow: 5,
        searchSongList: null,
        pageNumber: null,
        reachIndex: 1,
        pageall: null,
        isDoom: true,
        c: 'c',
      }
    },
    methods: {
      init() {
        this.DefaultRequest()
      },
      DefaultRequest() {
        let url = `https://wx.biergao.vip/api/qzone/getlist`
        let data = {
          uid: this.userParam.userid,
          page: 1
        }
        request.GetWithData(url, data, res => {
          let data = res.data
          // if (data.pageall == 0) {
          //   this.isshow = 0
          //   this.isDoom=false
          //   return
          // }
          this.pageall = data.pageall
          this.searchSongList = data.orderlist
          this.pagenumber = data.pageall
        })
      },
      UpStar(x, y, z) {
        if (y) {
          return
        }
        let url = `https://wx.biergao.vip/api/qzone/setdianzan`
        let data = {
          userId: this.userParam.userid,
          id: x,
          nickname: this.userParam.nickName
        }
        request.GetWithData(url, data, res => {
          console.log(res);
          this.searchSongList[z].dianzan = true
          if (this.searchSongList[z].dianzanlist) {
            this.searchSongList[z].dianzanlist += `,${this.userParam.nickName}`
          } else {
            this.searchSongList[z].dianzanlist = this.userParam.nickName
          }
  
        })
      },
      WriteMsg() {
        wx.navigateTo({
          url: '/pages/writemsg/main'
        })
      },
      PreviewImage(x,y) {
        let url=`https://wx.biergao.vip/uploads/qzone${x}`
        let list=[]
        for(let i =0;i<y.length;i++){
          list.push(`https://wx.biergao.vip/uploads/qzone${y[i]}`)
        }
        console.log(list);
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: list // 需要预览的图片http链接列表
        })
      },
    },
    computed: {
      ...mapState(['userParam'])
    },
    onLoad() {
      this.init()
    },
    onReachBottom() {
      console.log(this.reachIndex, this.pageall);
      if (this.reachIndex == this.pageall) {
        this.isDoom = false
        return
      } else {
        this.reachIndex = this.reachIndex + 1
        let url = `https://wx.biergao.vip/api/qzone/getlist`
        let data = {
          uid: this.userParam.userid,
          page: this.reachIndex
        }
        request.GetWithData(url, data, res => {
          for (let i = 0; i < res.data.orderlist.length; i++) {
            this.searchSongList.push(res.data.orderlist[i])
          }
        })
      }
    },
  }
</script>

<style scoped>
  page {
    line-height: 1.2;
    font-weight: 300
  }
  
  .space {
    background-color: white;
  }
  
  .tui-menu-list {
    /* line-height: 80rpx; */
    /* color: #555; */
    /* font-size: 35rpx; */
    /* padding: 0 0rpx 0 10px; */
    position: relative;
  }
  
  .time_p {
    float: left;
    font-size: 30rpx;
  }
  
  .tui-menu-list:before {
    content: '';
    display: div;
    height: 1px;
    width: 100%;
    background-color: #c8c7cc;
    position: absolute;
    bottom: 0;
    left: 10px;
  }
  
  .tui-menu-list:last-child:before {
    height: 0;
  }
  
  .c {
    background-color: #eee;
  }
  
  .result-item {
    position: relative;
    display: flex;
    flex-direction: row;
    border-bottom: 1rpx solid #f3f3f5;
    width: 90%;
    margin: 0 auto;
  }
  
  .loading {
    padding: 10rpx;
    text-align: center;
    padding: 10rpx;
    text-align: center;
    font-size: 35rpx;
    margin-top: 20rpx;
    color: #999;
  }
  
  .loading:before {
    display: inline-div;
    margin-right: 5rpx;
    vertical-align: middle;
    content: '';
    width: 40rpx;
    height: 40rpx;
    background-size: contain;
    animation: rotate 1s linear infinite;
  }
  
  .loading.complete:before {
    display: none;
  }
  
  .baseimg {
    width: 100rpx;
    height: 100rpx;
  }
  
  
  /*心  */
  
  .xin {
    width: 40rpx;
    height: 40rpx;
    vertical-align: middle;
    display: inline-block;
  }
  
  .xin2 {
    width: 30rpx;
    height: 30rpx;
    vertical-align: middle;
    display: inline-block;
    margin-left: 20rpx;
  }
  
  .dianzan_text_p {
    vertical-align: middle;
    display: inline-block;
    margin-left: 20rpx;
    line-height: 30rpx;
    width: 80%;
  }
  
  .oneImg {
    width: auto;
    height: auto;
    /*margin-left:100rpx;*/
    overflow: hidden;
  }
  
  .images-img {
    width: 160rpx;
    height: 160rpx;
    margin: 6rpx;
  }
  
  .images-image1 {
    width: 150rpx;
    height: 150rpx;
  }
  
  .bg {
    /* height: 400rpx; */
    /*background: red;*/
    overflow: hidden;
  }
  
  .headimg {
    text-align: center;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -60%);
    z-index: 999;
    border: 1px solid #ffbe3c;
  }
  
  .left {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  
  .right {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  
  .on {
    height: 35px;
    background: #f08519;
    color: #fff;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 35px;
  }
  
  .off {
    height: 35px;
    color: #000;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 35px;
  }
  
  .nickname {
    width: 400rpx;
    text-align: right;
    position: absolute;
    color: #fff;
    margin-top: -70rpx;
    font-size: 14pt;
    font-weight: 600;
    /*border:1px solid red;*/
  }
  
  .lie {
    /* border: 1px solid #ccc; */
    margin-top: 60rpx;
    /* flex-direction: column; */
  }
  
  .right_box {
    width: 80vw;
    margin-top: 20rpx;
    overflow: hidden;
    flex-direction: column
  }
  
  .head {
    margin-top: 20rpx;
  }
  
  .wz {
    font-size: 35rpx;
    color: #576b95;
    margin-left: 20rpx;
    display: block;
  }
  
  .desc {
    display: block;
    margin-top: 10rpx;
    font-size: 18px;
    margin-left: 20rpx;
  }
  
  .address {
    margin-top: 20rpx;
    height: 30rpx;
    font-size: 10pt;
    color: #576b95;
    margin-bottom: 20rpx;
    width: 580rpx;
  }
  
  .time {
    margin-top: 20rpx;
    flex-direction: row;
    height: 70rpx;
    /* font-size: 10pt; */
    color: #ccc;
    margin-left: 20rpx;
  }
  
  .dele {
    margin-top: 20rpx;
    width: 80rpx;
    height: 30rpx;
    font-size: 10pt;
    color: #576b95;
    margin-top: -28rpx;
    margin-left: 270rpx;
  }
  
  .biao {
    /* width: 40rpx; */
    /* height: 40rpx; */
    overflow: hidden;
    float: right;
  }
  
  .caozuo {
    width: 250rpx;
    height: 40rpx;
    background: rgba(0, 0, 0, 0.6);
    font-size: 12px;
    color: #fff;
    font-weight: 600;
    position: absolute;
    border-radius: 2px;
    overflow: hidden;
    opacity: 0;
  }
  
  .dianzan {
    position: absolute;
    width: 120rpx;
    border-right: 1px solid #ccc;
    top: 5rpx;
    left: 0;
    text-align: center;
  }
  
  
  /*点赞*/
  
  .dianzan-box {
    height: auto;
    background: #eee;
    /* border-bottom: 1px solid #ccc; */
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }
  
  .dianzan-biao {
    width: 33rpx;
    height: 36rpx;
    position: relative;
    overflow: hidden;
    margin-left: 10rpx;
  }
  
  .dianzan-text {
    position: relative;
    color: #576b95;
    font-size: 30rpx;
    padding: 10rpx 0px;
    /* margin-top: -29rpx;
                          margin-left: 50rpx; */
  }
  
  
  /*评论*/
  
  .pinglun {
    position: absolute;
    width: 120rpx;
    border-left: 1px solid #ccc;
    right: 0;
    top: 5rpx;
    text-align: center;
  }
  
  .pinglun-box {
    width: 580rpx;
    height: auto;
    background: #f3f3f5;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  
  .pinglun-one {
    /*border-bottom: 1px solid #ccc;*/
    padding-bottom: 5rpx;
  }
  
  .pinglun-nickname {
    color: #576b95;
    font-size: 10pt;
    margin-left: 15rpx;
  }
  
  .pinglun-content {
    color: #000;
    font-size: 10pt;
  }
  
  
  /*图片*/
  
  .images-wrapper {
    margin-top: 10rpx;
  }
  
  .images-wrapper-text {
    font-size: 28rpx;
  }
  
  .images-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .img-plus {
    border: 1px solid #999;
    position: relative;
  }
  
  .img-plus-horizontal {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #d9d9d9;
    width: 4rpx;
    height: 80rpx;
    transform: translate(-50%, -50%);
  }
  
  .img-plus-vertical {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #d9d9d9;
    width: 80rpx;
    height: 4rpx;
    transform: translate(-50%, -50%);
  }
  
  
  /*空间  */
  
  .qbutton {
    width: 70rpx;
    height: 70rpx;
    position: fixed;
    right: 20rpx;
    bottom: 10%;
    border: 1px solid #f08519;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
</style>
