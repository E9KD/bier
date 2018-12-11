<template>
  <div>
    <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" class="swiper">
      <block v-for="(item,index) in imgUrls" v-bind:key="index">
        <swiper-item>
          <image :src="item.url" class="slide-image" />
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";
import ajax from "../utils/ajax.js";
import {bannerUrl} from '@/utils/api.js'
  export default {
  
    data() {
      return {
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        interval: 300000,
        duration: 2000
      }
    },
    methods: {
      click() {
        this.imgUrls = []
  
      },
      getBanner() {
        ajax.Get(bannerUrl).then(res => {
          this.imgUrls = res.banner
        })
      }
    },
    onLoad() {
      this.getBanner()
    },
  };
</script>

<style>
  .swiper {
    height: 40vh;
  }
  
  .slide-image {
    width: 100%;
    height: 40vh;
  }
</style>
