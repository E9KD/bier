<template>
  <div class="chartpage">
    <div class="pickbox">
      <picker @change="ChangeChildren($event)" :value="index" :range="childrenList" class="pick">
        <view class="picker">
          {{childrenList[index]}}
        </view>
      </picker>
      <div style="height:8rpx;"></div>
    </div>
    <Echarts></Echarts>
    <div class="chartpage_bottom">
      <div class="bottom_button">
        <img class="btn" src="../../../static/image/add.png" alt="" @click="ChangeHightNow">
      </div>
      <div class="bottom_content">
        <p class="content_p">连续添加数据，</p>
        <p class="content_p">即可自动生成您或（孩子）的身高曲线图，</p>
        <p class="content_p">根据曲线图判断您或（孩子）生长情况。</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.chartpage_bottom {
  margin-top: 30rpx;
}

.bottom_button {
  text-align: center;
}

.bottom_content {
  margin-top: 20rpx;
}

.content_p {
  color: #999;
  font-size: 30rpx;
  text-align: center;
}

.btn {
  width: 50rpx;
  height: 50rpx;
  background-color: rgb(250, 124, 34);
  border-radius: 80rpx;
  padding: 20rpx;
}

.pick {
  color: #f56700;
  text-align: center;
  background-color: white;
  width: 90%;
  margin: 0 auto;
  border-radius: 30rpx;
  padding: 10rpx 0px;
  margin-bottom: 5rpx;
}

.pickbox {
  background-color: blue;
}
</style>

<script>
import Echarts from "../../components/echarts";
import { mapMutations, mapState } from "vuex";
import request from "../../utils/api.js";
export default {
  data() {
    return {
      childrenList: [],
      index: 0,
      childrenInfolist: []
    };
  },
  components: {
    Echarts
  },
  methods: {
    ...mapMutations(["ChangeEchartsParam", "ChangeChildrenIndex"]),
    ChangeChildren(e) {
      let that = this;
      this.index = e.mp.detail.value;
      this.ChangeChildrenIndex(this.index);
      this.ChangeEchartsParam({
        age: this.childrenInfolist[this.index].age,
        sex: this.childrenInfolist[this.index].sex,
        hight: this.childrenInfolist[this.index].hight
      });
    },
    init() {
      //  请求获取孩子的数量和信息，获取成功push到childrenList中,获取年龄和性别，还有自己的身高
      let that = this;
      request.api("http://192.144.199.129/json/a.json", res => {
        for (let i = 0; i < res.data.length; i++) {
          that.childrenList.push(res.data[i].name);
        }
        that.childrenInfolist = res.data;
        that.ChangeEchartsParam({
          age: res.data[that.index].age,
          sex: res.data[that.index].sex,
          hight: res.data[that.index].hight
        });
      });
    },
    ChangeHightNow() {
      wx.navigateTo({
        url: `/pages/changehight/main?hight=${this.childrenInfolist[this.index].hight}`
      })
    }
  },
  created() {
    this.init();
    
  },
  onLoad(){
    console.log(this.userInfo);
  },
  computed:{
    ...mapState(['userInfo'])
  }
};
</script>
