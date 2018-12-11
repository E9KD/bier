<template>
  <div class="changechildrenhight backgroundImg">
    <div class="page_box">
      <div class="box">
        <div class="box_p">
          <p>修改目前身高</p>
        </div>
        <picker @change="ChangeHight(0,$event)" :value="hopeListindex" :range="hightList" class="pick">
          <view class="picker">
            当前身高：{{hightList[hopeListindex]}}CM
          </view>
        </picker>
      </div>
      <div class="box">
        <div class="box_p">
          <p>修改目前身高</p>
        </div>
        <picker @change="ChangeHight(1,$event)" :value="nowListindex" :range="hightList" class="pick">
          <view class="picker">
            当前身高：{{hightList[nowListindex]}}CM
          </view>
        </picker>
      </div>
      <div class="box">
        <div class="box_p">
          <p>修改父亲身高</p>
        </div>
        <picker @change="ChangeHight(2,$event)" :value="fatherListindex" :range="hightList" class="pick">
          <view class="picker">
            父亲身高：{{hightList[fatherListindex]}}CM
          </view>
        </picker>
      </div>
      <div class="box">
        <div class="box_p">
          <p>修改母亲身高</p>
        </div>
        <picker @change="ChangeHight(3,$event)" :value="motherListindex" :range="hightList" class="pick">
          <view class="picker">
            母亲身高：{{hightList[motherListindex]}}CM
          </view>
        </picker>
      </div>
      <div class="box_botton">
        <p class="btn" @click="ChangeHightButton">GO</p>
      </div>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
  import ajax from '../../utils/ajax.js'
  import Toast from '../../components/toast.vue'
  import {
    mapState,
    mapMutations
  } from 'vuex';
  import {changeHightUrl} from '@/utils/api.js'
  export default {
    data() {
      return {
        hightList: [],
        hopeListindex: 0,
        nowListindex: 0,
        fatherListindex: 0,
        motherListindex: 0,
        hopehight: null,
        nowhight: null,
        fatherhight: null,
        motherhight: null,
        time: null,
        id: null,
        name: null
      }
    },
    components: {
      Toast
    },
    methods: {
      ...mapMutations(['toastshowtype', 'closeToast']),
      init(x) {
        this.hopehight = x.x
        this.nowhight = x.y
        this.fatherhight = x.z
        this.motherhight = x.q
        this.id = x.w
        this.time = x.e
        this.name = x.r
        this.ComputeIndex()
        this.AddList()
      },
      ComputeIndex() {
        this.hopeListindex = this.hopehight - 50
        this.nowListindex = this.nowhight - 50
        this.fatherListindex = this.fatherhight - 50
        this.motherListindex = this.motherhight - 50
      },
      ChangeHight(x, e) {
        switch (x) {
          case 0:
            this.hopeListindex = e.mp.detail.value
            this.hopehight = JSON.parse(e.mp.detail.value) + 50
            break
          case 1:
            this.nowListindex = e.mp.detail.value
            this.nowhight = JSON.parse(e.mp.detail.value) + 50
            break
          case 2:
            this.fatherListindex = e.mp.detail.value
            this.fatherhight = JSON.parse(e.mp.detail.value) + 50
            break
          case 3:
            this.motherListindex = e.mp.detail.value
            this.motherhight = JSON.parse(e.mp.detail.value) + 50
            break
        }
      },
      ChangeHightButton() {
        let data = {
          qiwangheight: this.hopehight,
          nowheight: this.nowhight,
          fatherheight: this.fatherhight,
          motherheight: this.motherhight,
          openid: this.userParam.openId,
          userid: this.userParam.userid,
          time: this.time,
          id: this.id,
          name: this.name,
        }
        ajax.Get(changeHightUrl,data).then(res=>{
          if (res.code == 200) {
            this.toastshowtype({
              t:1,
              p:'修改完成！'
            })
            setTimeout(() => {
              this.closeToast()
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          } else {
            this.toastshowtype({
              t:2,p:'修改失败！'
            })
            setTimeout(() => {
              this.closeToast()
            }, 1500)
          }
        })


      },
      AddList() {
        if (this.hightList.length > 0) {
          return;
        }
        for (let i = 50; i <= 180; i++) {
          this.hightList.push(i);
        }
      },
    },
    computed: {
      ...mapState(['userParam']),
    },
    onLoad(x) {
      this.init(x)
    }
  }
</script>

<style scoped>
  .changechildrenhight {
    width: 100vw;
    height: 100vh;
  }
  
  .box_botton {
    position: relative;
    margin-top: 100rpx;
    height: 100rpx;
  }
  
  .btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40rpx;
    color: white;
    width: 130rpx;
    height: 130rpx;
    line-height: 130rpx;
    background-color: #ec881d;
    border-radius: 100%;
    text-align: center;
  }
  
  .box {
    margin-top: 50rpx;
  }
  
  .box_p {
    color: white;
    text-align: center;
    font-size: 35rpx;
    font-weight: lighter;
  }
  
  .page_box {
    width: 80%;
    margin: 0 auto;
    padding-top: 150rpx;
    height: 200rpx;
  }
  
  .pick {
    background-color: white;
    width: 400rpx;
    height: 50rpx;
    font-size: 30rpx;
    line-height: 50rpx;
    padding-left: 20rpx;
    border-radius: 10rpx;
    margin: 0 auto;
    margin-top: 10rpx;
  }
</style>
