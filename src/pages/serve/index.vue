<template>
  <div>
    <div class="servehead">
      <div class="seveheadbox">
        <h2 class="servetext texthead">TEAM</h2>
        <p class="servetext phead">国内一流的身高管理团队</p>
        <p class="servetext phead">一对一定制并全程跟踪身高促进</p>
      </div>
    </div>
    <!-- 老师列表 -->
    <!-- 第一部分加载老师 -->
    <div class="teacher">
      <div class="teacherrow" v-for='(item,index) in teacherinfolist' :key="index" @click="getTeacherid(item.id)">
        <img class="teachercolleft teachercol" :src='item.faceimg'>
      </div>
      <!-- 第二部分加载老师 -->
      <div class="teacherrow" v-for='(item,index) in teacherinfolist2' :key="index" @click="getTeacherid2(item.id)">
        <img class="teachercolleft teachercol" :src='item.faceimg'>
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
  export default {
    data() {
      return {
        teacherinfolist: [],
        teacherinfolist2: [],
      }
    },
    components: {
      Toast
    },
    methods: {
      ...mapMutations(['changeteacherid', 'toastshowtype', 'closeToast']),
      getTeacherinfo() {
        let that = this
        let url = this.httpHead + this.httpTeacherpage1
        this.toastshowtype({
          t:0,p:'Loading...'
        });
        ajax.Get(url).then((result) => {
          this.teacherinfolist = result.orderlist
          this.closeToast()
        }).catch((err) => {
          console.log(err);
        });
      },
      getTeacherid(x) {
        this.changeteacherid(x)
        wx.navigateTo({
          url: '/pages/teacherinfo/main'
        })
      },
      getTeacherid2(x) {
        this.changeteacherid(x)
        wx.navigateTo({
          url: '/pages/teacherinfo/main'
        })
      }
    },
    computed: {
      ...mapState(['httpHead', 'httpTeacherpage1', 'httpTeacherpage2'])
    },
    onLoad() {
      this.getTeacherinfo()
    },
    onReachBottom() {
      let that = this
      let url = this.httpHead + this.httpTeacherpage2
      ajax.Get(url).then((result) => {
        this.teacherinfolist2 = result.orderlist
      }).catch((err) => {
        console.log(err);
      });
    },
    onPullDownRefresh() {
      wx.showNavigationBarLoading()
      // this.isteacherpage2=false
      this.teacherinfolist2 = []
      this.getTeacherinfo()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  }
</script>

<style scoped>
  .seveheadbox {
    border: 1px solid #888888;
    border-radius: 50rpx;
    width: 90%;
    margin: 30rpx auto;
  }
  
  .servetext {
    text-align: center;
  }
  
  .texthead {
    font-size: 60rpx;
  }
  
  .phead {
    font-size: 30rpx;
    padding: 10rpx;
    color: #888888;
  }
  
  .teacher {
    width: 100%;
    margin: 0 auto;
  }
  
  .teacherrow {
    width: 47vw;
    margin-left: 2%;
    height: 47vw;
    display: inline-block;
  }
  
  .teachercol {
    width: 100%;
    height: 100%;
  }
</style>