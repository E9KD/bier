<template>
  <div class="exchange">
    <div class="container">
      <div class="title">比尔高VIP兑换</div>

      <div class>
        <div class="form-item-bd">
          <input type="text" name="number" value placeholder="请输入兑换码" v-model="keyWord">
        </div>
      </div>

      <div class="b-tp">
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
import { mapState, mapMutations } from "vuex";
import ajax from "../../utils/ajax.js";
import { getVipUrl } from "@/utils/api.js";
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
        this.toastshowtype({
          t: 2,
          p: "不能为空！"
        });
        setTimeout(() => {
          this.closeToast();
        }, 1500);
        return;
      }
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
      ajax
        .Post(getVipUrl, data)
        .then(result => {
          if (result.res == "success") {
            this.toastshowtype({
              t: 1,
              p: "兑换成功！"
            });
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);
          } else {
            this.toastshowtype({
              t: 2,
              p: "兑换失败！"
            });
            setTimeout(() => {
              this.closeToast();
            }, 1500);
          }
        })
        .catch(err => {
          console.log(err);
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
