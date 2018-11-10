<template>
  <div class="buylesson">
    <div class="videobox">
      <video class="video" controls page-gesture direction show-fullscreen-btn show-play-btn show-center-play-btn></video>
    </div>
    <div class="listbox">
      <div class="listhead">
        <p class="listhead_title">科学身高管理，每个孩子多长15厘米！</p>
        <p class="listhead_tip">热销中</p>
        <!-- <p class="listhead_price">{{showlist[showlistid].price}}&nbsp;&nbsp;￥</p> -->
      </div>
      <div class="listhead_changecard">
        <div class="changecardcom" :class="[changecardisshow?a:n]" @click="changecardtype(0)">课程概述</div>
        <div class="changecardcom" :class="[changecardisshow?n:a]" @click="changecardtype(1)">课程目录</div>
      </div>
      <div class="listhead_showlist">
        <!-- 课程概述 -->
        <div class="showlist_list" v-show="lessonlistshowtype==0">
          <p class="showlist_introduce">老师介绍</p>
          <div class="showlist_teacherimagebox">
            <!-- <img :src="showlist[showlistid].teacherinfo.faceimg" alt="" srcset="" class="showlist_teacherimage"> -->
          </div>
          <!-- <p class="showlist_name">{{showlist[showlistid].teacherinfo.name}}</p> -->
          <!-- <p class="showlist_teacherinfo">{{showlist[showlistid].teacherinfo.teacher_text}}</p> -->
          <p class="showlist_introduce">适用人群</p>
          <p class="showlist_useinfo">一、不了解长高知识的父母</p>
          <p class="showlist_useinfo">二、想系统学习身高管理的父母</p>
          <p class="showlist_useinfo">三、想让孩子长到理想身高的父母</p>
          <p class="showlist_useinfo">四、0-18岁成长关键期孩子的父母</p>
          <p class="showlist_introduce">课程介绍</p>
          <!-- <p class="showlist_lessoncontent" v-for="(item,index) in showlist[showlistid].content " :key="index">{{item}}</p> -->
        </div>
        <!-- 课程目录 -->
        <div class="showlist_lessonindex" v-show="lessonlistshowtype==1">
          <!-- 每次都有请求，现在还没给我 -->
          <wxParse :content="showlistcontent " @preview="preview" @navigate="navigate" />
          <!-- <div class="lessonindex_list" v-for="(item,index) in showlist[showlistid].content " :key="index" >{{item}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import wxParse from "mpvue-wxparse";
export default {
  data() {
    return {
      lessonlistshowtype: 0,
      item: "200",
      changecardisshow: true,
      a: "active",
      n: "normal",
      showlist: [],
      showlistid: 0,
      showlistcontent: ""
    };
  },
  components: {
    wxParse
  },
  methods: {
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    },
    changecardtype(x) {
      this.lessonlistshowtype = x;
      if (x == 0) {
        this.changecardisshow = true;
      } else {
        this.changecardisshow = false;
      }
    }
  },
  computed: {
    ...mapState(["lessonListcontent", "lessoninfoid"])
  },
  watch: {
    // 每次当前的课程信息改变，让展示信息等于当前信息
    lessonListcontent(x) {
      this.showlist = x;
    },
    lessoninfoid(x) {
      // 每次改变点击的index，获得点击的index
      this.showlistid = x;
    }
  }
};
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.lessonlist_list {
  padding: 30rpx 0px;
  border-bottom: 1px solid #999;
  font-size: 30rpx;
  color: #999;
}

.showlist_lessonindex {
  width: 90%;
  margin: 30rpx auto;
}

.showlist_lessoncontent {
  color: #999;
  font-size: 20rpx;
  margin-top: 20rpx;
}

.showlist_useinfo {
  font-size: 28rpx;
  color: #999;
  margin-top: 18rpx;
}

.showlist_teacherinfo {
  font-size: 28rpx;
  color: #999;
  line-height: 40rpx;
  margin-top: 20rpx;
}

.showlist_name {
  font-size: 30rpx;
  text-align: center;
  height: 50rpx;
  line-height: 50rpx;
  margin-top: 20rpx;
}

.showlist_teacherimage {
  width: 250rpx;
  height: 250rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 200rpx;
  margin-top: 20rpx;
}

.showlist_teacherimagebox {
  height: 300rpx;
  width: 100%;
  position: relative;
}

.showlist_introduce {
  font-size: 36rpx;
  line-height: 50rpx;
  padding: 20rpx 0rpx;
  border-bottom: 1px solid #999;
}

.showlist_list {
  width: 90%;
  margin: 0 auto;
}

.changecardbor {
  width: 50%;
  height: 6rpx;
  background-color: rgb(227, 139, 39);
  display: inline-block;
}

.active {
  border-bottom: 8rpx solid rgb(227, 139, 39);
}

.normal {
  border: none;
}

.changecardcom {
  display: inline-block;
  width: 50%;
  height: 100rpx;
  font-size: 40rpx;
  line-height: 100rpx;
  text-align: center;
  color: black;
}

.listhead_changecard {
  background-color: #eeeeee;
  margin-top: 30rpx;
}

.listhead_price {
  color: red;
  font-size: 35rpx;
  margin-top: 20rpx;
}

.listhead_tip {
  color: red;
  margin-top: 20rpx;
  font-size: 25rpx;
}

.listhead_title {
  font-size: 36rpx;
  font-weight: bold;
  padding-top: 20rpx;
}

.listhead {
  width: 90%;
  margin: 0 auto;
}
</style>
