<template>
  <div class="teacherinfo">
    <div class="teacherimg">
      <img :src="teacherinfo.fuwuimg" alt="" srcset="" style="width:100%;">
      <div class="userinfo" @click.stop="GetShare" style="display:none;">
        <img src="../../../static/image/share.png" alt="" class="shareIcon">
        <p>分享给好友</p>
      </div>
    </div>
    <div class="teacherlist">
      <div class="listhead">我能为您提供的服务</div>
      <div class="listtext">
        <div class="listextbox">
          <p class="listtextcom">{{isBuy?t1:t2}}</p>
          <p class="listtextcom">量身定制月度/季度的身高管理服务</p>
          <!-- <span class="listprice" v-if="isBuy">
                                      <p class="listpriceb">￥399</p>
                                      <p class="listprices">/月</p>
                                    </span>
                      <span class="listprice" v-if="isBuy">
                                      <p class="listpriceb">￥999</p>
                                      <p class="listprices">/月</p>
                                    </span> -->
          <div class="listbtnbox">
            <button class="listbtn" @click="buyLesson" v-if="isBuy">查询</button>
            <button open-type="contact" class="listbtn" v-else :session-from='link2' plain='true'>查询</button>
            <!-- <button class="" @click="AindAll">查询</button> -->
            <p class="listbtntext">VIP免费</p>
          </div>
          <div class="listtext">
            <div v-html="teacherinfo.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="buylinkbox" :class="[buyshow?s:h]">
      <div class="buylink">
        <div class="buyclose" @click="closebutlink">X</div>
        <div class="buyhead">查询</div>
        <div class="buytitle">1对1专业身高管理服务</div>
        <div class="buytip">
          <i></i>
        </div>
        <div class="buychoose">
          <div class="choosecom chooseleft" :class="[priceischoose==0?a:n]" @click="changeprice(0)">{{price1}}</div>
          <!-- <div class="choosemin"></div> -->
          <div class="choosecom chooseright" :class="[priceischoose==1?a:n]" @click="changeprice(1)">{{price2}}</div>
        </div>
        <div class="buyfoot">
          <div class="foottip"></div>
          <div class="foothead">
            <p class="footheadtop">支付金额{{lessonprice}}元</p>
            <p class="footheadmid">进入客服消息后，发送“{{teacherinfo.id}}”获取购买链接</p>
          </div>
          <button open-type="contact" class="footbtn" :session-from='link' :contact="handleContact">马上咨询</button>
        </div>
      </div>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
  import ajax from '../../utils/ajax.js'
  import Toast from "../../components/toast.vue";
  import {
    mapState,
    mapMutations
  } from "vuex";
  import {
    isVipUrl,
    getTeacherPriceUrl,
    getTeacherUrl
  } from "@/utils/api.js";
  export default {
    data() {
      return {
        isBuy: false,
        t1: `购买后，您的孩子可以享受:`,
        t2: `查询后,您的孩子可以享受:`,
        t3: `购买`,
        t4: "查询",
        teacherinfo: [],
        buyshow: false.buyshowa,
        s: "show",
        h: "hide",
        a: "active",
        n: "normal",
        priceischoose: 0,
        price1: null,
        price2: null,
        price: 399,
        link: `{"type": "fuwu","userid":"null","unionId":"null","goodsid":"null","price":"null"}`,
        link2: '{"type": "image", "title": "点击开启您的一站式专属身高管理服务之旅吧！", "url": "http://www.biergao.cn/kefu"}'
      };
    },
    components: {
      Toast
    },
    methods: {
      ...mapMutations(["toastshowtype", "closeToast"]),
      init() {
        this.GetDefaultPrice()
        let data = {
          openid: this.userParam.openId
        }
        ajax.Get(isVipUrl, data).then((result) => {
          if (result == 'success') {
            this.isBuy = false
          } else {
            this.isBuy = true
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      GetDefaultPrice() {
        ajax.Get(getTeacherPriceUrl).then((result) => {
          this.price1 = result[0]
          this.price2 = result[1]
        }).catch((err) => {
          console.log(err);
        });
      },
      ChangeParam() {
        let data = JSON.parse(this.link);
        data.userid = this.userParam.userid;
        data.unionId = this.userParam.unionId;
        data.goodsid = this.teacherinfo.id;
        data.price = this.price;
        this.link = JSON.stringify(data);
        console.log(this.link);
      },
      changeprice(x) {
        this.priceischoose = x;
        if (x == 0) {
          this.price = 399;
          this.ChangeParam();
        } else {
          this.price = 999;
          this.ChangeParam();
        }
      },
      closebutlink() {
        this.buyshow = false;
      },
      buyLesson() {
        this.buyshow = true;
        this.ChangeParam();
      },
      getDefaultinfo() {
        this.toastshowtype({
          t: 0,
          p: 'Loading...'
        });
        let data = {
          id: this.teacherid
        }
        ajax.Get(getTeacherUrl, data).then((result) => {
          this.teacherinfo = result;
          this.closeToast();
        }).catch((err) => {
          console.log(err);
        });
      },
      GetShare() {
        wx.navigateTo({
          url: '/pages/canvaspage/main'
        })
      }
    },
    onLoad() {
      this.buyshow = false;
      this.teacherinfo = [];
      this.init()
      this.getDefaultinfo();
    },
    computed: {
      ...mapState(["teacherid", "userParam"])
    }
  };
</script>

<style scoped>
  .buyclose {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    font-size: 40rpx;
  }
  
  .footbtn {
    margin: 0 auto;
    width: 300rpx;
    height: 80rpx;
    background-color: #ec881d;
    text-align: center;
    font-size: 30rpx;
    line-height: 80rpx;
    margin-top: 20rpx;
  }
  
  .footheadmid {
    color: black;
    font-size: 30rpx;
    text-align: center;
    margin-top: 20rpx;
  }
  
  .footheadtop {
    color: #eeeeee;
    font-size: 30rpx;
    text-align: center;
  }
  
  .foothead {
    padding-top: 30rpx;
  }
  
  .foottip {
    position: absolute;
    top: -15rpx;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 0px;
    width: 0px;
    border-left: 50rpx solid transparent;
    border-right: 50rpx solid transparent;
    border-bottom: 60rpx solid #999999;
  }
  
  .buyfoot {
    height: 3000rpx;
    width: 100%;
    background-color: #999999;
    position: relative;
  }
  
  .chooseright {
    float: right;
  }
  
  .chooseleft {
    float: left;
  }
  
  .active {
    background-color: #ec881d;
    color: white;
  }
  
  .normal {
    background-color: white;
    border: 1px solid #ec881d;
    color: black;
  }
  
  .choosecom {
    width: 220rpx;
    height: 220rpx;
    border-radius: 200rpx;
    vertical-align: middle;
    margin-top: 30rpx;
    text-align: center;
    line-height: 220rpx;
    /* display: inline-block; */
  }
  
  .buychoose {
    width: 80%;
    height: 300rpx;
    margin: 30rpx auto;
  }
  
  .buytip i {
    width: 100rpx;
    background-color: #ec881d;
    height: 6rpx;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .buytip {
    margin-top: 20rpx;
    width: 100%;
    height: 10rpx;
    position: relative;
  }
  
  .buytitle {
    text-align: center;
    font-size: 40rpx;
    margin-top: 10rpx;
  }
  
  .buyhead {
    text-align: center;
    font-size: 100rpx;
    color: black;
    margin-top: 100rpx;
  }
  
  .buylink {
    border: 1px solid #999999;
    border-radius: 30rpx;
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }
  
  .buylinkbox {
    background-color: white;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    overflow: hidden;
  }
  
  .teacherlist {
    background-color: #eeeeee;
  }
  
  .teacherinfo {
    background-color: white;
  }
  
  .listbtntext {
    font-size: 30rpx;
    color: red;
    padding-left: 50rpx;
    float: left;
    height: 80rpx;
    line-height: 80rpx;
  }
  
  .listbtn {
    width: 300rpx;
    height: 80rpx;
    background-color: #ec881d;
    text-align: center;
    font-size: 35rpx;
    color: white;
    float: left;
    line-height: 80rpx;
  }
  
  .listbtnbox {
    width: 100%;
    height: 100rpx;
    overflow: hidden;
    margin-top: 30rpx;
  }
  
  .listprices {
    display: inline-block;
    font-size: 30rpx;
    color: #999999;
    margin-left: 30rpx;
  }
  
  .listpriceb {
    font-size: 60rpx;
    font-weight: bold;
    color: red;
    display: inline-block;
    margin-left: 50rpx;
  }
  
  .listprice {
    width: 100%;
    padding-top: 20rpx;
    display: block;
  }
  
  .listtextcom {
    padding-top: 20rpx;
    color: #999999;
    font-size: 35rpx;
  }
  
  .listextbox {
    width: 96%;
    margin: 0 auto;
  }
  
  .listtext {
    background-color: white;
    width: 100%;
    font-size: 30rpx;
  }
  
  .listhead {
    text-align: center;
    font-size: 40rpx;
    color: #616060;
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    margin-bottom: 5rpx;
    background-color: white;
  }
</style>


