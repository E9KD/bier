<template>
  <div class="exchange">
    <div class='container'>
  
      <div class="title">比尔高VIP兑换</div>
  
      <div class=''>
        <div class="form-item-bd">
          <input type="text" name="number" value="" placeholder='请输入兑换码' v-model="keyWord" />
        </div>
      </div>
  
      <div class='b-tp'>
        <button class="vBtn_ok" @click="setVipToUser">兑换</button>
      </div>
  
      <div class="guize">
        <div style="color:#555;">兑换规则：</div>
        <div>1.查询比尔高产品获得VIP兑换码</div>
        <div>2.兑换成功后您将获得免费享受本小程序的咨询服务以及课程</div>
      </div>
  
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
  import Toast from "../../components/toast";
  import {
    mapState,
    mapMutations
  } from "vuex";
  import request from "../../utils/api.js";
  export default {
    data() {
      return {
        keyWord: null
      };
    },
    components: {
      Toast
    },
    computed: {
      ...mapState(["userParam"])
    },
    methods: {
      ...mapMutations(["toastshowtype", "closeToast"]),
      setVipToUser() {
        if (this.keyWord == null) {
          this.toastshowtype(3);
          setTimeout(() => {
            this.closeToast();
          }, 1500);
          return;
        }
        let url = `https://wx.biergao.vip/api/vip/getvip`;
        let str = "abcdefghigklmnopqrstuvwxyz";
        let token =
          Math.floor(Math.random() * 1000) +
          str[Math.floor(Math.random() * 25)] +
          this.userParam.openId +
          this.keyWord +
          str[Math.floor(Math.random() * 25)];
        let data = {
          token: token
        };
        console.log(data);
        request.Post(url, data, res => {
          if (res.data.res == "success") {
            this.toastshowtype(1);
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);
          } else {
            console.log(`shibai`);
            this.toastshowtype(2);
            setTimeout(() => {
              this.closeToast();
            }, 1500);
          }
        });
      }
    }
  };
</script>

<style scoped>
  .title {
    margin-top: 30px;
  }
  
  .form-item-bd input {
    height: 50px;
    width: 70%;
    font-size: 16px;
    display: block;
    margin: 20px auto 40px;
    border: 1px solid #ec881d;
    padding: 0 5%;
    background: #fff;
    border-radius: 3px;
  }
  
  .vBtn_ok {
    width: 80%;
    background: #ec881d;
    color: #fff;
  }
  
  .title {
    font-size: 18px;
    text-align: center;
  }
  
  .guize {
    width: 80%;
    margin: 50px auto 0;
    font-size: 14px;
    color: #999;
  }
</style>
