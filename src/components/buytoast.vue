<template>
    <div class="buytoast">
        <div class="buylinkbox" :class="buyshow?s:h">
            <div class="buylink">
                <div class="buyclose" @click="closebutlink">X</div>
                <div class="buyhead">购买</div>
                <div class="buytitle">1对1专业身高管理服务</div>
                <div class="buytip">
                    <i></i>
                </div>
                <div class="buychoose">
                    <div class="choosecom chooseleft" :class="[priceischoose==0?a:n]" @click="changeprice(0)">￥{{price1}}元/</div>
                    <div class="choosecom chooseright" :class="[priceischoose==1?a:n]" @click="changeprice(1)">￥{{price2}}元/</div>
                </div>
                <div class="buyfoot">
                    <div class="foottip"></div>
                    <div class="foothead"> 
                        <!-- <p class="footheadtop">支付金额{{lessonprice}}元</p> -->
                        <p class="footheadmid">进入客服消息后，发送“{{number}}”获取购买链接</p>
                    </div>
                    <button class="footbtn" @click="pay">马上咨询</button>
                    <button  open-type="contact" :session-from='asd' @click="GoPay" class="footbtn">好的</button>
                    <button  open-type="contact" :session-from='qwe' @click="GoVip" class="footbtn">好的</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import request from "../utils/api.js";
export default {
  data() {
    return {
      number: null,
      buyshow: null,
      buyToaststate: 1,
      s: "show",
      h: "hide",
      a: "active",
      n: "normal",
      price1: null,
      price2: null,
      priceischoose: 0,
      asd: {
        type: "vip",
        userid: null,
        unionId: null,
        goodsid: "1",
        price: null
      },
      qwe: {
        type: "fuwu",
        userid: null,
        unionId: null,
        goodsid: null,
        price: null
      }
    };
  },
  computed: {
    ...mapState(["buytoastState", "userParam",'buytoastShow'])
  },
  methods: {
    ...mapMutations(["ChangeToast2State"]),
    handleContact(e) {
      console.log(e);
    },
    click() {
      this.asd.userid = this.userParam.userid;
      this.asd.unionId = this.userParam.unionId;
      this.asd.price = this.price;
      console.log(this.asd);
    },
    init() {
      let url = `https://wx.biergao.vip/api/vip/price`;
      request.api(url, res => {
        this.price1 = res.data[0];
        this.price2 = res.data[1];
        this.price = this.price1;
      });

      // console.log(this.userParam);
    },

    Close() {
      this.ChangeToast2State(0);
    },
    changeprice(x) {
      this.priceischoose = x;
      if (x == 0) {
        this.price = this.price1;
      } else {
        this.price = this.price2;
      }
    }
  },
  onLoad() {
    this.init();
  },
  watch: {
    buytoastShow(x) {
      if (x) {
        this.buyshow = true;
        console.log(this.buyshow);
      } else {
        this.buyshow = false;
        console.log(this.buyshow);
      }
    },
    buytoastState(x) {
      if (x == 0) {
        // 0是课程
        this.number = 12;
        this.buyToaststate=0
      } else {
        // 1是vip
        this.number = 19;
        this.buyToaststate=1
      }
    }
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
  background-color: rgb(227, 139, 39);
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
  background-color: rgb(227, 139, 39);
  color: white;
}

.normal {
  background-color: white;
  border: 1px solid rgb(227, 139, 39);
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
  background-color: rgb(227, 139, 39);
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
</style>
