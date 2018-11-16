<template>
  <div class="groupreport">
    <div class="groupreport_warning" v-if="notChildren">
      <p>请先添加数据。</p>
    </div>
    <div class="groupreport_list" v-else>
      <div class="list_box" v-for="(item,index) in childrenList" :key="index" @click="GoHightPrediction(item.sex,item.age,item.id,item.qiwangheight,item.fm.m,item.fm.f)">
        <div class="list_top list">
          <div class="top_name">
            <p class="name_p">{{item.name}}</p>
            <img :src="item.sex==1?manimg:womanimg" class="name_icon">
          </div>
          <div class="list_age">
            <p class="age_p">年龄：{{item.age}}岁</p>
          </div>
        </div>
        <div class="list_mid list">
          <p class="mid_p">期待身高:{{item.qiwangheight}}CM</p>
          <p class="mid_p">目前身高:{{item.infos.nowheight}}CM</p>
          <p class="mid_p">母亲身高:{{item.mheight}}CM</p>
          <p class="mid_p">父亲身高:{{item.fheight}}CM</p>
          <p class="mid_p">未来身高:{{item.fm.m}}~{{item.fm.f}}CM</p>
        </div>
        <div class="list_bottom list">
          <div class="bottom_box">
            <img :src="timeicon" class="bottom_timeicon">
            <p class="bottom_time">{{item.time}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapMutations, mapState
  } from 'vuex';
  import request from '../../utils/api.js'
  export default {
    data() {
      return {
        timeicon: require('../../../static/image/time.png'),
        notChildren: false,
        sex: 2,
        manimg: require('../../../static/image/man.png'),
        womanimg: require('../../../static/image/woman.png'),
        childrenList: []
      }
    },
    methods: {

      GoHightPrediction(sex,age,id,hh,hd,hg) {
        wx.navigateTo({
          url: `/pages/childrenhightreport/main?sex=${sex}&age=${age}&id=${id}&hh=${hh}&hd=${hd}&hg=${hg}`
        })
      },
      init(){
        let url=`https://wx.biergao.vip/api/biaob/userMorenew/`
        let data={
          openid:this.userParam.openId
        }
        request.GetWithData(url,data,res=>{
          console.log(res);
          this.childrenList=res.data
        })
      }
    },
    computed:{
      ...mapState(['userParam'])
    },
    mounted(){
      this.init()
    }
  }
</script>

<style scoped>
  .bottom_time {
    font-size: 15px;
    display: inline-block;
    vertical-align: middle;
  }
  
  .bottom_timeicon {
    width: 24px;
    margin-right: 10px;
    height: 24px;
    vertical-align: middle;
    display: inline-block;
  }
  
  .bottom_box {
    float: right;
  }
  
  .list_bottom {
    padding-top: 10px;
    overflow: hidden;
    padding-bottom: 5px;
  }
  
  .mid_p {
    margin-top: 3px;
  }
  
  .list_mid {
    padding-top: 15px;
    text-align: center;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
  }
  
  .name_icon {
    width: 24px;
    height: 24px;
    margin-left: 7px;
    display: inline-block;
    vertical-align: middle;
  }
  
  .name_p {
    display: inline-block;
    vertical-align: middle;
  }
  
  .list_age {
    float: right;
  }
  
  .top_name {
    float: left;
  }
  
  .list_top {
    font-size: 15px;
    overflow: hidden;
    border-bottom: 1px solid #eeeeee;
    padding-top: 10px;
    padding-bottom: 5px;
  }
  
  .list_box {
    background-color: white;
    /* height: 30vh; */
    width: 90vw;
    margin: 0 auto;
    margin-top: 50rpx;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 4px 4px 10px #999;
  }
  
  .list {
    width: 90%;
    margin: 0 auto;
  }
</style>
