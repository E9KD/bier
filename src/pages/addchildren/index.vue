<template>
  <div class="addchildren">
    <div class="sexchoose">
      <div class="radio_box_left">
        <input type="radio" name="asd" :checked='checked==1' @click="ChangeChecked(1)" class="radio radio_man">
        <p class="radio_p">男</p>
      </div>
      <div class="radio_box_right">
        <input type="radio" name="asd" :checked='checked==2' @click="ChangeChecked(2)" class="radio radio_woman">
        <p class="radio_p">女</p>
      </div>
    </div>
    <div class="add_input">
      <div class="input_box">
        <p class="input_box_p">姓名</p>
        <input type="text" v-model="name" class="input_box_input" placeholder="请输入姓名">
      </div>
      <div class="input_box">
        <p class="input_box_p">生日</p>
        <picker mode="date" name="activity.endDate" class="input_box_input" :value="childrenBirthday" start="1990-01-01" end="2020-09-01" @change="ChangeChildrenBirthday">
          <view class="weui-input">{{childrenBirthday}}</view>
        </picker>
      </div>
      <div class="input_box">
        <p class="input_box_p">期望身高</p>
        <picker @change="ChangeChildrenHight" :value="childrenHightindex" :range="childrenHightlist" class="input_box_input">
          <view class="picker">
            当前选择：{{childrenHightlist[childrenHightindex]}}厘米
          </view>
        </picker>
      </div>
      <div class="input_box">
        <p class="input_box_p">目前身高</p>
        <picker @change="ChangeChildrenHightNow" :value="childrenHightnowIndex" :range="childrenHightlist" class="input_box_input">
          <view class="picker">
            当前选择：{{childrenHightlist[childrenHightnowIndex]}}厘米
          </view>
        </picker>
      </div>
      <div class="input_box" v-if="isparshow">
        <p class="input_box_p">父亲身高</p>
        <picker @change="ChangeFatherHightNow" :value="fatherHightnowIndex" :range="childrenHightlist" class="input_box_input">
          <view class="picker">
            当前选择：{{childrenHightlist[fatherHightnowIndex]}}厘米
          </view>
        </picker>
      </div>
      <div class="input_box" v-if="isparshow">
        <p class="input_box_p">母亲身高</p>
        <picker @change="ChangeMotherHightNow" :value="motherHightnowIndex" :range="childrenHightlist" class="input_box_input">
          <view class="picker">
            当前选择：{{childrenHightlist[motherHightnowIndex]}}厘米
          </view>
        </picker>
      </div>
    </div>
    <div class="add_btn_box">
      <div class="add_btn" @click="GoTest">GO</div>
    </div>
  </div>
</template>
 
<script>
  import {
    mapMutations,
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        motherHightnowIndex: null,
        fatherHightnowIndex: null,
        childrenHightnowIndex: null,
        childrenHightindex: null,
        childrenHightlist: [],
        childrenBirthday: '请选择生日',
        checked: null,
        isparshow: true,
      };
    },
    methods: {
      ChangeMotherHightNow(e) {
        this.motherHightnowIndex = e.mp.detail.value
      },
      ChangeFatherHightNow(e) {
        this.fatherHightnowIndex = e.mp.detail.value
      },
      ChangeChildrenHightNow(e) {
        this.childrenHightnowIndex = e.mp.detail.value
      },
      ChangeChildrenHight(e) {
        this.childrenHightindex = e.mp.detail.value
      },
      ChangeChildrenBirthday(e) {
        this.childrenBirthday = e.mp.detail.value;
      },
      ChangeChecked(x) {
        // 1是男 2是nv
        this.checked = x;
      },
      GoTest() {
        // 获取所有信息，进行请求，然后跳转
        wx.navigateTo({
          url: '/pages/test/main'
        })
      },
      init() {
        if (this.childrenHightlist.length > 0) {
          return
        } else {
          for (let i = 100; i <= 180; i++) {
            this.childrenHightlist.push(i);
          }
        }
      }
    },
    onLoad() {
      this.init()
      // 跳转到这个页面，先进行一次检查，如果已经添加过孩子，说明已经获取了父母的身高，则isparshow为false
    }
  };
</script>

<style scoped>
  .addchildren {
    width: 70%;
    margin: 0 auto;
  }
  
  .sexchoose {
    margin-top: 60rpx;
    overflow: hidden;
  }
  
  .radio_box_left {
    float: left;
  }
  
  .radio_box_right {
    float: right;
  }
  
  .radio {
    display: inline-block;
  }
  
  .radio_p {
    display: inline-block;
  }
  
  .input_box_p {
    font-size: 30rpx;
    color: #999;
  }
  
  .input_box_input {
    margin-top: 20rpx;
    padding-left: 20rpx;
    border-radius: 10px;
    background-color: white;
    font-size: 35rpx;
    color: #999;
  }
  
  .input_box {
    margin-top: 30rpx;
  }
  
  .add_btn_box {
    margin-top: 50rpx;
  }
  
  .add_btn {
    margin: 0 auto;
    width: 80rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 80rpx;
    background-color: #f56700;
    text-align: center;
    color: white;
    font-size: 30rpx;
  }
</style>
