<template>
  <div class="order">
    <div class="search">
      <div class="search-bar">
        <div style='margin:0 auto;box-size:border-box;'>
          <div class="box" style='font-size:14px;line-height:25px;text-align:center; border-radius: 7px;z-index:999;'>
            <!-- 头部选项 -->
            <div class="swiper-tab-item" :class="currentTab==3 ? 'on' :'off'" @click="clickTab(3)" style='float:left;width:50%;'>服务</div>
            <div class="swiper-tab-item" :class="currentTab==1 ? 'on' :'off'" @click="clickTab(1)" style='float:right;width:50%;'>课程</div>
            <!-- 头部选项 -->
          </div>
        </div>
      </div>
    </div>
    <div class="showList">
      <div class="vipList" v-for="(item,index) in list" :key="index" v-if="item.abv_enum==number">
        <button open-type='contact' :session-from="item.link" class="listBox_img" style='border:0px;padding:0px'>
                <img src="http://www.biergao.cn/images/b_woqu.png" alt="" class="img" >
              </button>
        <div class="contentBox">
          <p class="content_p">订单号：{{item.out_trade_no}}</p>
          <p class="content_p">服务名称：{{item.title}}</p>
          <p class="content_p">价格：{{item.price}}</p>
          <p class="content_p">订单状态：已支付</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/api.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
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
.content_p {
  white-space: nowrap;
}

.vipList {
  width: 80%;
  margin: 0 auto;
  padding: 30rpx 0px;
  border-bottom: 1px solid #eee;
}

.listBox_img {
  display: inline-block;
  width: 200rpx;
  height: 200rpx;
  vertical-align: middle;
}

.img {
  width: 100%;
  height: 100%;
}

.contentBox {
  width: 330rpx;
  height: 200rpx;
  overflow: hidden;
  display: inline-block;
  font-size: 30rpx;
  background-color: #eee;
  padding: 20rpx;
  margin-left: 30rpx;
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

/*搜索*/

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

/*搜索结果*/

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
}
</style>
