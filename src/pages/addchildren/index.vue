<template>
  <div class="backgroundImg box">
    <div class="addchildren ">
      <div class="sexchoose">
        <div class="radio_box_left">
          <input type="radio" name="asd" :checked='checked==1' @click="checked=1" class="radio radio_man">
          <p class="radio_p">男</p>
        </div>
        <div class="radio_box_right">
          <input type="radio" name="asd" :checked='checked==2' @click="checked=2" class="radio radio_woman">
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
        <div class="input_box" v-if="isParshow">
          <p class="input_box_p">父亲身高</p>
          <picker @change="ChangeFatherHightNow" :value="fatherHightnowIndex" :range="childrenHightlist" class="input_box_input">
            <view class="picker">
              当前选择：{{childrenHightlist[fatherHightnowIndex]}}厘米
            </view>
          </picker>
        </div>
        <div class="input_box" v-if="isParshow">
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
  </div>
</template>
 
<script>
  import {
    mapMutations,
    mapState
  } from "vuex";
  import ajax from '../../utils/ajax.js'
  import {
    addChildrenUrl,
    isParUrl
  } from '@/utils/api.js'
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
        isParshow: true,
        name: null,
        motherHightnow: null,
        fatherHightnow: null,
        childrenHightnow: null,
        childrenHight: null,
        age: null
      };
    },
    methods: {
      ChangeMotherHightNow(e) {
        this.motherHightnowIndex = e.mp.detail.value
        this.motherHightnow = this.ComputeNumber(e.mp.detail.value)
      },
      ChangeFatherHightNow(e) {
        this.fatherHightnowIndex = e.mp.detail.value
        this.fatherHightnow = this.ComputeNumber(e.mp.detail.value)
      },
      ChangeChildrenHightNow(e) {
        this.childrenHightnowIndex = e.mp.detail.value
        this.childrenHightnow = this.ComputeNumber(e.mp.detail.value)
      },
      ChangeChildrenHight(e) {
        this.childrenHightindex = e.mp.detail.value
        this.childrenHight = this.ComputeNumber(e.mp.detail.value)
      },
      ChangeChildrenBirthday(e) {
        this.childrenBirthday = e.mp.detail.value;
        this.ComputeAge(e.mp.detail.value)
      },
      ComputeNumber(x) {
        let a = JSON.parse(x)
        return a + 100
      },
      ComputeAge(x) {
        let a = x.slice(0, 4)
        this.age = new Date().getFullYear() - parseInt(a)
      },
      showMessage(x) {
        wx.showToast({
          title: x,
          icon: 'none',
          duration: 1500
        })
      },
      GoTest() {
        //获取所有信息，进行请求，然后跳转
        let nameRule = /^[\u4e00-\u9fa5]{2,4}$/i
        if (this.checked == null) {
          this.showMessage('请选择性别')
        } else if (this.name == null) {
          this.showMessage('请输入姓名')
        } else if (!nameRule.test(this.name)) {
          this.showMessage('请输入中文名2-4位')
        } else if (this.childrenBirthday == null) {
          this.showMessage('请选择生日')
        } else if (this.age > 20) {
          this.showMessage('您孩子已经大于20岁！')
        } else if (this.age < 0) {
          this.showMessage('您孩子不能小于0岁！')
        } else if (this.childrenHightnow == null) {
          this.showMessage('请选择期望身高')
        } else if (this.childrenHight == null) {
          this.showMessage('请选择目前身高')
        } else {
          let data = {
            sex: this.checked,
            username: this.name,
            brithday: this.childrenBirthday,
            qiwangheight: this.childrenHight,
            nowheight: this.childrenHightnow
          }
          ajax.Get(`${addChildrenUrl}${this.userParam.openId}`, data).then(res => {
            if (res == 'em') {
              this.showMessage('添加失败已存在');
            } else {
              this.showMessage('添加成功已保存');
              wx.navigateTo({
                url: `/pages/hightpre/main?id=${res.id}&m=${res.m}&y=${res.y}`
              })
            }
          })
  
        }
      },
      init() {
        if (this.childrenHightlist.length > 0) return
        for (let i = 100; i <= 180; i++) {
          this.childrenHightlist.push(i);
        }
        this.GetDefaultState()
      },
      GetDefaultState() {
        let data = {
          openid: this.userParam.openId
        }
        ajax.Post(isParUrl, data).then(res => {
          if (res.result == 'true') {
            this.isParshow = false
          } else {
            this.isParshow = true
          }
        })
  
      }
    },
    computed: {
      ...mapState(['userParam'])
    },
    onLoad() {
  
      // 跳转到这个页面，先进行一次检查，如果已经添加过孩子，说明已经获取了父母的身高，则isparshow为false
    },
    onShow() {
      this.init()
    }
  };
</script>

<style scoped>
  .box {
    height: 100vh;
  }
  
  .addchildren {
    width: 70%;
    margin: 0 auto;
  }
  
  .sexchoose {
    padding-top: 100rpx;
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
    background-color: #ec881d;
    text-align: center;
    color: white;
    font-size: 30rpx;
  }
</style>
