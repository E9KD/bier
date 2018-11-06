<template>
  <div class="groupreport">
    <div class="groupreport_warning" v-if="notChildren">
      <p>请先添加数据。</p>
    </div>
    <div class="groupreport_list" v-else>
      <div class="list_box" v-for="(item,index) in childrenLIst" :key="index" @click="GoHightPrediction(item.sex,item.age,item.hight)">
        <div class="list_top list">
          <div class="top_name">
            <p class="name_p">{{item.name}}</p>
            <img :src="sex==1?manimg:womanimg" class="name_icon">
          </div>
          <div class="list_age">
            <p class="age_p">年龄：{{item.age}}岁</p>
          </div>
        </div>
        <div class="list_mid list">
          <p class="mid_p">期待身高:{{item.hopeHight}}CM</p>
          <p class="mid_p">目前身高:{{item.hightNow}}CM</p>
          <p class="mid_p">母亲身高:{{item.motherHight}}CM</p>
          <p class="mid_p">父亲身高:{{item.fatherHight}}CM</p>
          <p class="mid_p">未来身高:{{item.futherHightA}}~{{item.futherHightB}}CM</p>
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
    mapMutations
  } from 'vuex';
  export default {
    data() {
      return {
        timeicon: require('../../../static/image/time.png'),
        notChildren: false,
        sex: 2,
        manimg: require('../../../static/image/man.png'),
        womanimg: require('../../../static/image/woman.png'),
        childrenLIst: [{
          name: 123,
          age: 15,
          hopeHight: 190,
          hightNow: 110,
          motherHight: 1000,
          fatherHight: 1010,
          futherHightA: 1004,
          futherHightB: 5004,
          time: '2018-01-01',
          number: 11,
          sex: 1,
          hight:150
        }, {
          name: 123,
          age: 8,
          hopeHight: 190,
          hightNow: 110,
          motherHight: 1000,
          fatherHight: 1010,
          futherHightA: 1004,
          futherHightB: 5004,
          time: '2018-01-01',
          number: 12,
          sex: 2,
          hight:100
        }, {
          name: 123,
          age: 10,
          hopeHight: 190,
          hightNow: 110,
          motherHight: 1000,
          fatherHight: 1010,
          futherHightA: 1004,
          futherHightB: 5004,
          time: '2018-01-01',
          number: 13,
          sex: 2,
          hight:120
        }]
      }
    },
    methods: {
      ...mapMutations(['ChangeEchartsParam']),
      GoHightPrediction(sex, age,hight) {
        this.ChangeEchartsParam({
          sex,
          age,
          hight
        })
        wx.navigateTo({
          url: `/pages/childrenhightreport/main`
        })
      }
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
