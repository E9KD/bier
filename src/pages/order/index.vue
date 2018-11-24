<template>
  <div class="bottom">
  
    <div class="btm-top">
      <div class="left">
        <div class="" :class="currentTab==3 ? 'liActive' :''" @click="clickTab(3)">我的服务</div>
        <div class="" :class="currentTab==1 ? 'liActive' :'off'" @click="clickTab(1)">我的课程</div>
      </div>
    </div>
  
  
  
    <div class="btm-list">
      <div class="list" v-for="(item,index) in list" :key="index" v-if="item.abv_enum==number">
  
  
        <button open-type='contact' :session-from="item.link" class="img">
                      <img :src="currentTab==3 ?item.orderimg :imgsrc" alt=""  >
            </button>
  
  
        <div class="infor">
          <div class="title">{{item.title}}</div>
          <div class="intro">单号:{{item.out_trade_no}}</div>
          <div class="num">订单状态：已支付
            <div style="float:right">{{item.price}}</div>
          </div>
        </div>
  
      </div>
    </div>
  
  
  
  </div>
</template>ss

<script>
  import request from "../../utils/api.js";
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        imgsrc: "http://www.biergao.cn/images/b_woqu.png",
        currentTab: 3,
        list: [],
        number: 3,
        userid: null,
        unionId: null,
        linkcom: null,
        linkListF: [],
        linkListL: [],
        link: `{"type": "fuwu","userid":"null","unionId":"null","goodsid":"null","price":"null"}`,
        link2: `{"type": "keceng","unionId": "null","userid": "null","goodsid": "null"}`
      };
    },
    methods: {
      init() {
        let url = `https://wx.biergao.vip/api/order/getdingdan`;
        let pageindex = 1;
        let data = {
          oid: this.userParam.openId,
          page: pageindex
        };
        request.order(url, data, res => {
          this.list = res.orderlist;
          this.AddLink();
        });
        this.ChangeParamUserifo();
      },
      AddLink() {
        for (let i = 0; i < this.list.length; i++) {
          // 3服务 1课程
          if (this.list[i].abv_enum == 3) {
            let a = {
              price: this.list[i].price,
              goodsid: this.list[i].goodsid,
              type: "fuwu",
              userid: this.userParam.userid,
              unionId: this.userParam.unionId
            };
            // this.linkListF.push(this.list[i]);
            this.list[i].link = JSON.stringify(a);
          } else {
            let b = {
              goodsid: this.list[i].goodsid,
              type: "keceng",
              userid: this.userParam.userid,
              unionId: this.userParam.unionId
            };
            // this.linkListL.push(this.list[i]);
            this.list[i].link = JSON.stringify(b);
          }
        }
        console.log(this.list);
      },
      ChangeParam(x, y, z) {
        if (z == 3) {
          let data1 = JSON.parse(this.link);
          data1.goodsid = x;
          data1.price = y;
          this.linkcom = JSON.stringify(data1);
          console.log(this.linkcom);
        } else {
          let data2 = JSON.parse(this.link2);
          data2.goodsid = x;
          this.linkcom = JSON.stringify(data2);
          console.log(this.linkcom);
        }
      },
      ChangeParamUserifo() {
        let data1 = JSON.parse(this.link);
        let data2 = JSON.parse(this.link2);
        data1.userid = this.userParam.userid;
        data1.unionId = this.userParam.unionId;
        data2.userid = this.userParam.userid;
        data2.unionId = this.userParam.unionId;
        this.link = JSON.stringify(data1);
        this.link2 = JSON.stringify(data2);
      },
      clickTab(x) {
        this.currentTab = x;
        this.number = x;
      }
    },
    onLoad() {
      this.init();
    },
    computed: {
      ...mapState(["userParam", "userParam"])
    }
  };
</script>


<style scoped>
  /**index.wxss**/
  
  div {
    width: auto;
  }
  
  .liActive {
    color: #2f7d5f !important;
    border-bottom: 4rpx solid #2f7d5f;
  }
  
  .bottom {
    padding-bottom: 80rpx;
    border-bottom: 1rpx solid #e6e6e6;
  }
  
  .bottom .btm-top {
    padding: 0 30rpx;
    line-height: 90rpx;
    border-bottom: 1rpx solid #f5f5f5;
    overflow: hidden;
  }
  
  .bottom .btm-top .left {
    text-align: center;
  }
  
  .bottom .btm-top .left div {
    font-size: 32rpx;
    color: #4f4f4f;
    /* margin-right: 50rpx; */
    display: inline-block;
    margin: 0 10px;
  }
  
  .bottom .btm-top .right {
    float: right;
    margin-top: 15rpx;
  }
  
  .bottom .btm-top .right navigator {
    font-size: 26rpx;
    width: 180rpx;
    height: 60rpx;
    color: #fefefe;
    line-height: 60rpx;
    text-align: center;
    background-color: #a67b44;
    border-radius: 60rpx;
  }
  
  .btm-list .list {
    padding: 20rpx 30rpx;
    overflow: hidden;
    border-bottom: 14rpx solid #f5f5f5;
  }
  
  .btm-list .img {
    float: left;
    width: 128rpx;
    height: 128rpx;
    padding: 0px;
  }
  
  .btm-list image {
    width: 128rpx;
    height: 128rpx;
  }
  
  .btm-list .infor {
    margin-left: 155rpx;
    /* float: left; */
  }
  
  .btm-list .infor .title {
    font-size: 32rpx;
    color: #333;
    margin-bottom: 10rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .btm-list .infor .intro {
    font-size: 26rpx;
    color: #4f4f4f;
    margin-bottom: 10rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .btm-list .infor .num {
    font-size: 22rpx;
    color: #878787;
    padding-top: 5rpx;
    border-top: 1rpx solid #e6e6e6;
  }
  
  .navigator-hover {
    color: #2f7d5f !important;
  }
  
  .add_citying {
    color: #2f7d5f !important;
  }
  
  scroll-div {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  
  .liActive {
    color: #2f7d5f !important;
    border-bottom: 4rpx solid #2f7d5f;
  }
  
  .order-header {
    color: #666666;
    height: 71rpx;
    line-height: 71rpx;
    border-bottom: 1px solid #e2e2e2;
    font-size: 26rpx;
  }
  
  .order_list {
    background: #fff;
    width: 95%;
    position: relative;
    min-height: 100vh;
    margin: 0 auto;
    /* margin: 20rpx 20rpx 20rpx 20rpx; */
  }
  
  
  /* .content_p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 20rpx;
    }
    
    .content_order {
      width: 100%;
      float: left;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #999;
    }
    
    .vipList {
      overflow: hidden;
      width: 80%;
      margin: 0 auto;
      padding: 30rpx 0px;
      border-bottom: 1px solid #eee;
    }
    
    .listBox_img {
      float: left;
      width: 15vw;
      height: 15vw;
      vertical-align: middle;
    }
    
    .img {
      width: 100%;
      height: 100%;
    }
    
    .contentBox {
      width: 50vw;
      overflow: hidden;
      float: right;
      font-size: 30rpx;
      border-radius: 20rpx;
      vertical-align: middle;
    }
    
    .order {
      background-color: white;
    }
    
    .box {
      width: 50vw;
    }
    
    .item {
      padding: 10px;
      height: auto;
      background: #fff;
      border-radius: 5px;
      margin-top: 5px;
      float: right;
      font-size: 73%;
      margin: 0 auto;
      background: #eeedf2;
    }
    
    
  
    
    .search {
      flex: auto;
      display: flex;
      flex-direction: column;
      background: white;
    }
    
    .search-bar {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx;
      background: #fff;
    }
    
    
    
    .search-result {
      flex: auto;
      position: relative;
    }
    
    .search-result scroll-div {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    
    .on {
      background: #f08519;
      color: #fff;
      border: 1px solid #f08519;
      box-sizing: border-box;
    }
    
    .off {
      background: #fff;
      color: #000;
      border: 1px solid #f08519;
      box-sizing: border-box;
    }  */
</style>
