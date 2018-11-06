<template>
  <div class="asd">
    <scroll-view :scroll-y='true' @scroll="aaa" :style="{'height': '100vh'}">
      <div class="a" @click="click" id="a"> {{text}}</div>
      <div class="b" :class="[a?b:c]"></div>
      <div class="c"></div>
    </scroll-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: 'asd',
        a: false,
        b: 'fixed',
        c: 'ab',
        aheight: 0
      }
    },
    methods: {
      aaa(e) {
        console.log(e.target.scrollTop);
        console.log(this.aheight);
        if (e.target.scrollTop >= this.aheight - 5) {
          this.a = true
        }else if(e.target.scrollTop<=this.aheight){
          this.a=false
        }
      }
    },
    onLoad() {
      let that = this
      let query = wx.createSelectorQuery();
      query.select('#a').boundingClientRect()
      query.exec(function(res) {
        that.aheight = res[0].height
      })
    }
  };
</script>

<style scoped>
  .fixed {
    position: fixed;
    top: 0px;
    left: 0px;
  }
  .none {
    position: static;
  }
  .a {
    background-color: red;
    height: 300rpx;
    width: 100%;
  }
  .b {
    background-color: black;
    width: 100%;
    height: 100rpx;
  }
  .c {
    background-color: blue;
    width: 100%;
    height: 2800rpx;
  }
</style>