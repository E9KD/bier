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
          <div class="bottom_box-left">
            
          </div>
          <div class="bottom_box">
            <p class="bottom_fixbtn" @click.stop="ChangeChildrenhight(item.qiwangheight,item.infos.nowheight,item.fheight,item.mheight,item.id,item.time,item.name)">修改身高</p>
            <p class="bottom_time">{{item.time}}</p>
            <img :src="timeicon" class="bottom_timeicon">
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
  import ajax from '../../utils/ajax.js'
  import {getChildrenInfoUrl} from '@/utils/api.js'
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
        let data={
          openid:this.userParam.openId
        }
        ajax.Get(getChildrenInfoUrl,data).then(result => {
          this.childrenList=result
        }).catch(err => {
          console.log(err);
        });
      },
      ChangeChildrenhight(x,y,z,q,w,e,r){
        wx.navigateTo({
          url: `/pages/changechildrenhight/main?x=${x}&y=${y}&z=${z}&q=${q}&w=${w}&e=${e}&r=${r}`
        })
      }
    },
    computed:{
      ...mapState(['userParam'])
    },
    mounted(){
      this.init()
    },
    onShow(){
      this.init()
    },
    onPullDownRefresh() {
      wx.showNavigationBarLoading()
      this.init()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }

  }
</script>

<style scoped>
  .bottom_time {
    font-size: 15px;
    float: right;
    vertical-align: middle;
  }
  .bottom_fixbtn{
    font-size: 15px;
    float: left;
    vertical-align: middle;
    color:red;
  }
  .bottom_timeicon {
    width: 24px;
    margin-right: 10px;
    height: 24px;
    vertical-align: middle;
    float: right;
  }
  
 
  .bottom_box-left{
    float: left;
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
