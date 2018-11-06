<template>
  <div>
    <Swiper></Swiper>
    <Tools></Tools>
    <System></System>
    <div class="process">
      <div class="processhead">
        <h3 class="processheadtitle">PROCESS</h3>
        <p class="processheadtext">身高管理指导流程</p>
      </div>
      <div class="processlist">
        <div class="processlistrow">
          <div class="processlistcol" v-for="(item,index) in processlist" :key="index">
            <div class="processlistcolcom processlistcolleft">
              <img :src="item.processleftimg" alt="#" class="processleftimg">
            </div>
            <div class="processlistcolcom processlistcolright">
              <p class="processicontitle">{{item.processicontitle}}</p>
              <img :src="item.processicon" alt="#" srcset="" class="processicon">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="videobox">
      <video class="video" :src="httpVideo" controls page-gesture direction show-fullscreen-btn show-play-btn show-center-play-btn></video>
    </div>
    <Pushcard></Pushcard>
  </div>
</template>

<script>
  import Swiper from '../../components/swiper';
  import Tools from '../../components/tools';
  import {
    mapState
  } from 'vuex';
  import System from '../../components/system';
  import Pushcard from '../../components/pushcard'
  export default {
    data() {
      return {
        processlist: [{
            processleftimg: '/static/image/z1.png',
            processicontitle: '身高预测',
            processicon: '/static/image/icon6.png'
          },
          {
            processleftimg: '/static/image/z2.png',
            processicontitle: '定制初期目标',
            processicon: '/static/image/icon6.png'
          },
          {
            processleftimg: '/static/image/z3.png',
            processicontitle: '身高管理',
            processicon: '/static/image/icon6.png'
          },
          {
            processleftimg: '/static/image/z4.png',
            processicontitle: '专业评估',
            processicon: '/static/image/icon6.png'
          },
          {
            processleftimg: '/static/image/z5.png',
            processicontitle: '1对1全程指导',
            processicon: '/static/image/icon6.png'
          },
          {
            processleftimg: '/static/image/z6.png',
            processicontitle: '达到初期目标',
            processicon: '/static/image/icon6.png'
          },
        ]
      }
    },
    components: {
      Swiper,
      Tools,
      System,
      Pushcard,
    },
    methods: {
      click() {
        this.a = 1
      }
    },
    computed: {
      ...mapState(['httpVideo','openid','session_key'])
    },
    onLoad(){
    }
  }
</script>

<style scoped>
  .processleftimg {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .processicontitle {
    width: 100%;
    font-size: 30rpx;
    margin-top: 70rpx;
    text-align: center;
  }
  .processicon {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  .processlistcolcom {
    height: 300rpx;
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }
  .processlistcolleft {
    width: 45%;
  }
  .processlistcolright {
    width: 50%;
    background-color: #F56700;
  }
  .processlistcol {
    width: 50%;
    display: inline-block;
    margin-top: 20rpx;
  }
  .processlistrow {
    margin: 0 auto;
  }
  .process {
    padding-top: 20rpx;
    background-color: white;
  }
  .processhead {
    padding-bottom: 20rpx;
  }
  .processheadtext {
    width: 100%;
    height: 50rpx;
    font-size: 30rpx;
    text-align: center;
    line-height: 50rpx;
  }
  .processheadtitle {
    width: 100%;
    height: 70rpx;
    font-size: 50rpx;
    text-align: center;
    line-height: 70rpx;
  }
</style>