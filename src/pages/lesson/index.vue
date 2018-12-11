<template>
  <div>
    <div class="optioncardbox">
      <div class="optioncard optioncardtext" @click="changetype(9)">
        <p :class="[cur==9?a:b]">ALL</p>
        <p class="optioncardtip">全部</p>
      </div>
      <!-- 选项卡 -->
      <div class="optioncard optioncardlist" v-for='(item,index) in lessonlisttype' :key="index">
        <img :src="[cur==index?item.icon:item.ico]" alt="" :class="[cur==index?d:c]" @click="changetype(index)">
        <p class="optioncardtip">{{item.text}}</p>
      </div>
    </div>
    <div class="lessonlist">
      <div class="lessonlisthead">
        <p class="lessonlisttext">课程类型</p>
        <div class="lessonlistoption">
          <span :class="[tapcur==index?o:p]" @click="changetip(index)" v-for="(item,index) in lessontaplist" :key="index">{{item.title}}</span>
        </div>
      </div>
      <!-- 课程列表 -->
      <div class="lessonlisttitle">
        <div class="contextbox" v-for='(item,index) in goodsinfo' :key="index" @click="GoLessonPage(index)">
          <img :src="item.class_url_img" alt="" srcset="" class="contextleft">
          <div class="contextright">
            <h3 class="contexttitle">{{item.title}}</h3>
            <p class="contextin">{{item.video_text}}</p>
            <p class="contextteacher">{{item.teacherinfo.name}}</p>
            <p class="contextprice" v-if="item.status==0">￥{{item.price}}/VIP免费</p>
            <p class="contextprice" v-else>强烈推荐</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ajax from '../../utils/ajax.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import {getLessonInfo,getChooseLessonInfoUrl} from '@/utils/api.js'
  export default {
    data() {
      return {
        cur: 9,
        tapcur: 0,
        lessontaplist: [{
            title: '全部'
          },
          {
            title: '免费'
          },
          {
            title: '付费'
          },
        ],
        o: 'islessonlistoptioncard',
        p: 'lessonlistoptioncard',
        lessonlisttype: [{
            text: '营养',
            ico: '/static/image/icon16.png',
            icon: '/static/image/icon16-y.png',
          },
          {
            text: '运动',
            icon: '/static/image/icon17-y.png',
            ico: '/static/image/icon17.png',
          },
          {
            text: '睡眠',
            icon: '/static/image/icon18-y.png',
            ico: '/static/image/icon18.png',
          },
          {
            text: '情绪',
            icon: '/static/image/icon19-y.png',
            ico: '/static/image/icon19.png',
          },
          {
            text: '内分泌',
            icon: '/static/image/icon20-y.png',
            ico: '/static/image/icon20.png',
          },
        ],
        goodsinfo: [],
        targetid: 0,
        a: 'optioncardfirst',
        b: 'notoptioncardfirst',
        c: 'optioncardimg',
        d: 'notoptioncardimg',
        lessonshowpage: [],
        lessonlistid: []
      }
    },
    methods: {
      ...mapMutations(['GetLessonlistContent', 'changeClicklessonPageindex']),
      changetype(x) {
        if (x == 9) {
          this.cur = 9
          this.targetid = 0
          this.getLessonlist(0)
          this.tapcur = 0
        } else {
          this.cur = x
          this.targetid = 16 + x
          this.getLessonlist(0)
          this.tapcur = 0
        }
      },
      changetip(x) {
        this.tapcur = x
        this.getLessonlist(x)
      },
      getDefaultlist() {
        ajax.Get(getLessonInfo).then((result) => {
          this.goodsinfo = result
        }).catch((err) => {
          console.log(err);
        });
      },
      getLessonlist(x) {
        let data={
          catid:this.targetid,
          classtypeid:x
        }
        ajax.Get(getChooseLessonInfoUrl,data).then((result) => {
          this.goodsinfo = result
        }).catch((err) => {
          console.log(err);
        });
      },
      GoLessonPage(x, y) {
        this.GetLessonlistContent(this.goodsinfo[x])
        wx.navigateTo({
          url: `/pages/buylesson/main`
        })
      }
    },
    onLoad() {
      this.getDefaultlist()
    },
    computed: {
      ...mapState(['lessonListcontent'])
    },
    onPullDownRefresh() {
      wx.showNavigationBarLoading()
      this.changetype(0)
      this.getDefaultlist()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  }
</script>

<style scoped>
  .contextprice {
    font-size: 26rpx;
    position: absolute;
    bottom: 10rpx;
    right: 20rpx;
    color: red;
  }
  
  .contextteacher {
    font-size: 26rpx;
    position: absolute;
    bottom: 10rpx;
    left: 20rpx;
  }
  
  .contexttitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 36rpx;
    padding: 10rpx 10rpx;
  }
  
  .contextin {
    font-size: 28rpx;
    color: #999;
    padding: 0px 10rpx;
    height: 85rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .contextright {
    float: right;
    height: 200rpx;
    width: 65%;
    position: relative;
  }
  
  .contextleft {
    float: left;
    width: 32%;
    height: 200rpx;
  }
  
  .contextbox {
    width: 95%;
    margin: 20rpx auto;
    height: 200rpx;
    overflow: hidden;
    background-color: white;
    border-radius: 30rpx;
  }
  
  .lessonlist {
    margin-top: 10rpx;
  }
  
  .lessonlisthead {
    background-color: white;
    overflow: hidden;
    padding: 30rpx 0px;
  }
  
  .lessonlisttext {
    float: left;
    font-size: 40rpx;
    line-height: 60rpx;
    height: 60rpx;
    margin-left: 20rpx;
  }
  
  .lessonlistoption {
    float: right;
    margin-right: 10rpx;
  }
  
  .lessonlistoptioncard {
    font-size: 30rpx;
    display: inline-block;
    text-align: center;
    padding: 0px 15rpx;
    line-height: 60rpx;
    height: 60rpx;
  }
  
  .islessonlistoptioncard {
    font-size: 30rpx;
    display: inline-block;
    text-align: center;
    padding: 0px 15rpx;
    line-height: 60rpx;
    height: 60rpx;
    border-bottom: 1px solid #ec881d;
  }
  
  .optioncardbox {
    background-color: white;
    padding-bottom: 30rpx;
    padding-top: 30rpx;
  }
  
  .optioncardlist {
    display: inline-block;
  }
  
  .optioncard {
    width: 16.66vw;
    height: 150rpx;
    display: inline-block;
    vertical-align: middle;
  }
  
  .optioncardimg {
    width: 80rpx;
    height: 80rpx;
    border-radius: 70rpx;
    background-color: #ec881d;
    margin: 0 auto;
    display: block;
    border: 1px solid #ec881d;
  }
  
  .notoptioncardimg {
    width: 80rpx;
    height: 80rpx;
    border-radius: 70rpx;
    background-color: #eeeeee;
    margin: 0 auto;
    display: block;
    border: 1px solid #ec881d;
  }
  
  .optioncardfirst {
    font-size: 30rpx;
    width: 80rpx;
    height: 80rpx;
    border-radius: 70rpx;
    background-color: #eee;
    border: 1px solid #ec881d;
    color: #ec881d;
    text-align: center;
    line-height: 80rpx;
    margin: 0 auto;
  }
  
  .notoptioncardfirst {
    font-size: 30rpx;
    width: 80rpx;
    height: 80rpx;
    border-radius: 70rpx;
    background-color: #ec881d;
    border: 1px solid #ec881d;
    color: #eee;
    text-align: center;
    line-height: 80rpx;
    margin: 0 auto;
  }
  
  .optioncardtip {
    margin-top: 8px;
    text-align: center;
    font-size: 30rpx;
  }
</style>