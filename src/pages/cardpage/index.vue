<template>
  <div class="cardpage backgroundImg">
    <div class="card_head">
      <div class="head_box">
        <p class="head_box_title">距离形成饮食周报告还剩</p>
        <div class="font_box">
          <p class="head_box_font">{{days}}</p>
          <p class="head_box_font">天</p>
        </div>
      </div>
    </div>
    <div class="card_content">
      <div class="content_title">
        <img src="../../../static/image/cardtitle.png" alt="" class="title_img">
      </div>
      <div class="content_radio_box">
        <div class="content_radio" v-for="(item,index) in optionList" :key="index">
          <div class="radio_top">
            <p class="radio_top_p inbl">{{item.number}}</p>
            <img :src="item.img" alt="" class="radio_top_img inbl">
            <p class="radio_top_p inbl">{{item.title}}</p>
          </div>
          <div class="radio_bottom">
            <div class="radio_bottom_box inbl" v-for="(asd,index1) in radioList" :key="index1">
              <input class="radio inbl" type="radio" name="option" :checked='item.checked==index1' @click="ChangeChecked(index,index1)">
              <p class="radio_p inbl">{{asd.questionNumber}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card_botton">
      <p class="btn" @click="PushSubmit">提交</p>
    </div>
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
        days: null,
        checked: null,
        optionList: [{
            number: 1,
            img: require("../../../static/image/1.png"),
            title: "肉",
            checked: null
          }, {
            number: 2,
            img: require("../../../static/image/2.png"),
            title: "鱼虾",
            checked: null
          },
          {
            number: 3,
            img: require("../../../static/image/3.png"),
            title: "蛋",
            checked: null
          }, {
            number: 4,
            img: require("../../../static/image/4.png"),
            title: "牛奶",
            checked: null
          }, {
            number: 5,
            img: require("../../../static/image/5.png"),
            title: "豆类及豆制品",
            checked: null
          }, {
            number: 6,
            img: require("../../../static/image/6.png"),
            title: "蔬菜",
            checked: null
          }, {
            number: 7,
            img: require("../../../static/image/7.png"),
            title: "水果",
            checked: null
          }
        ],
        radioList: [{
            questionNumber: 0
          },
          {
            questionNumber: 1
          },
          {
            questionNumber: 2
          },
          {
            questionNumber: 3
          }
        ]
      };
    },
    computed: {
      ...mapState(['userParam']),
    },
    methods: {
      ChangeChecked(index, index1) {
        this.optionList[index].checked = index1
      },
      PushSubmit() {
        for (let i = 0; i < 7; i++) {
          if (this.optionList[i].checked == null) {
            console.log(`有没有填写的内容`);
            return
          }
        }
        // 发送提交数据。
        let url = `https://wx.biergao.vip/api/yybg/sign`
        let data = {
          rou: this.optionList[0].checked,
          yuxia: this.optionList[1].checked,
          dan: this.optionList[2].checked,
          doulei: this.optionList[3].checked,
          niunai: this.optionList[4].checked,
          shucai: this.optionList[5].checked,
          shuiguo: this.optionList[6].checked,
          uid: this.userParam.data.userid
        }
        request.GetWithData(url, data, res => {
          if (res.data.status != 200) {
            console.log(`打卡失败，请重新提交！`);
          } else {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      },
      init() {
        // 进行请求，天数
        let data = {
          uid: this.userParam.data.userid
        }
        request.Post('https://wx.biergao.vip/api/Yybg/getisbuka', data, res => {
          this.days = res.data.sday
        })
      }
  
    },
    onLoad() {
      this.init()
    }
  };
</script>

<style scoped>
.content_radio_box{
  margin-top: -30rpx;
}
  .btn {
    padding: 20rpx;
    font-size: 40rpx;
    background-color: #ff8c00;
    color: white;
  }
  
  .card_botton {
    text-align: center;
    margin-top: 50rpx;
  }
  
  .content_radio {
    padding-top: 30rpx;
    margin-top: 20rpx;
  }
  
  .inbl {
    display: inline-block;
  }
  
  .radio {
    margin-left: 50rpx;
    zoom: 50%;
    vertical-align: middle;
  }
  
  .radio_p {
    margin-left: 10rpx;
    vertical-align: middle;
    color: white;
    font-size: 30rpx;
  }
  
  .radio_bottom {
    width: 70%;
    margin: 0 auto;
    margin-top: 10rpx;
  }
  
  .radio_bottom_box {
    margin-right: 40rpx;
  }
  
  .radio_top {
    text-align: center;
  }
  
  .radio_top_p {
    font-size: 30rpx;
    margin-left: 10rpx;
    vertical-align: middle;
    color: white;
  }
  
  .radio_top_img {
    vertical-align: middle;
    margin-left: 10rpx;
    width: 60rpx;
    height: 60rpx;
  }
  
  .title_img {
    width: 350rpx;
    height: 210rpx;
  }
  
  .content_title {
    text-align: center;
  }
  
  .card_head {
    background: linear-gradient(to right, rgb(227, 139, 39), rgb(227, 200, 39));
  }
  
  .head_box_title {
    display: block;
    color: white;
    font-size: 50rpx;
    text-align: center;
    font-weight: 100;
  }
  
  .font_box {
    text-align: center;
    margin-top: 30rpx;
    padding-bottom: 30rpx;
  }
  
  .head_box_font {
    display: inline-block;
    padding: 10rpx;
    background-color: white;
    color: #ff8c00;
    margin-left: 10rpx;
    border-radius: 20rpx;
    width: 50rpx;
    height: 50rpx;
    font-size: 40rpx;
    line-height: 50rpx;
    box-shadow: 0 0 10rpx #999;
  }
</style>
