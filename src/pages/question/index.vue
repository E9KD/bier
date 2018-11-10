<template>
  <div class="question backgroundImg">
    <div class="qusetion_container">
      <div class="container_top goldbg">
        <p class="top_p">共{{allOfquestion}}题</p>
        <p class="top_p">当前第{{nowOfquestion}}题</p>
      </div>
      <div class="container_mid">
        <div class="container_box">
          <p class="mid_question">{{questionTitle}}</p>
        </div>
      </div>
      <div class="container_bottom">
        <div class="container_box">
          <div class="bottom_box" v-for="(item,index) in questionList" :key="index">
            <input class="box_radio" type="radio" @click="ChangeChecked(index)" name="option" :checked='index==number'>
            <p class="box_p" @click="ChangeChecked(index)" >{{item.anwser}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isComplete" class="question_button goldbg" @click="GoNext">下一题</div>
    <div v-else class="question_button goldbg" @click="GoSubmit">提交</div>
    <Toast></Toast>
  </div>
</template>

<script>
import request from "../../utils/api.js";
import { mapState, mapMutations } from "vuex";
import Toast from "../../components/toast";
export default {
  data() {
    return {
      isComplete: true,
      submit: `提交`,
      nextQuestion: `下一题`,
      allOfquestion: null,
      nowOfquestion: null,
      questionList: [],
      questionTitle: null,
      number: null,
      nextRequestnumber: null,
      currentScore: null,
      assess1: 0,
      assess2: 0,
      assess3: 0,
      assess4: 0,
      assess5: 0,
      assess6: 0,
      assess7: 0,
      assess8: 0,
      totalScore: null
    };
  },
  components: {
    Toast
  },
  methods: {
    ...mapMutations(["toastshowtype", "closeToast"]),
    GoNext(x) {
      if (this.currentScore != null) {
        this.toastshowtype(0);
        this.ComputeScore(this.nowOfquestion);
        this.totalScore += this.currentScore;
        console.log(this.totalScore);
        this.currentScore = null;
        let url = `https://wx.biergao.vip/api/survey/getquestion2`;
        let data = {
          questionid: this.nextRequestnumber,
          pid: this.cardType
        };
        request.GetWithData(url, data, res => {
          let json = res.data;
          this.questionList = json.anwserdata;
          this.nowOfquestion = json.questiondata[0].id;
          this.questionTitle = json.questiondata[0].question;
          this.nextRequestnumber = json.questiondata[0].id + 1;
          this.number = null;
          if (this.nowOfquestion == 20) {
            this.isComplete = false;
          }
          this.closeToast();
        });
      } else {
        console.log(`没选择`);
      }
    },
    ComputeScore(x) {
      /**
       * @msg: x 当前的题号
       * @param {type}
       * @return:
       */
      let assess1list = [1];
      let assess2list = [1, 2, 3, 5, 6, 7, 11, 12, 13, 15, 16, 17, 18, 19, 20];
      let assess3list = [3, 5, 6, 7, 10, 18];
      let assess4list = [3, 4, 18];
      let assess5list = [3, 4, 5, 6, 7, 13, 14, 15];
      let assess6list = [7, 8, 9, 10];
      let assess7list = [5, 12];
      let assess8list = [3, 5];
      for (let i = 0; i < this.allOfquestion; i++) {
        if (x == assess1list[i]) {
          this.assess1 += this.currentScore;
        }
        if (x == assess2list[i]) {
          this.assess2 += this.currentScore;
        }
        if (x == assess3list[i]) {
          this.assess3 += this.currentScore;
        }
        if (x == assess4list[i]) {
          this.assess4 += this.currentScore;
        }
        if (x == assess5list[i]) {
          this.assess5 += this.currentScore;
        }
        if (x == assess6list[i]) {
          this.assess6 += this.currentScore;
        }
        if (x == assess7list[i]) {
          this.assess7 += this.currentScore;
        }
        if (x == assess8list[i]) {
          this.assess8 += this.currentScore;
        }
      }
    },
    GoSubmit() {
      this.toastshowtype(0);
      this.ComputeScore(this.nowOfquestion);
      this.totalScore += this.currentScore;
      this.currentScore = null;
      let url = `https://wx.biergao.vip/api/Yypfjl/add2`;
      let data = {
        assess1: this.assess1,
        assess2: this.assess2,
        assess3: this.assess3,
        assess4: this.assess4,
        assess5: this.assess5,
        assess6: this.assess6,
        assess7: this.assess7,
        assess8: this.assess8,
        userid: this.userParam.data.userid,
        openid: this.userParam.data.openId,
        unionid: this.userParam.data.unionId,
        total: this.totalScore,
        pid: this.cardType
      };
      request.GetWithData(url, data, res => {
        console.log(res);
        setTimeout(() => {
          this.closeToast();
          wx.navigateTo({
            url: '/pages/resultpage/main'
          })
        },1000);
      });
    },
    ChangeChecked(index) {
      this.number = index;
      this.currentScore = this.questionList[index].score;
    },
    init() {
      this.toastshowtype(0);
      let url = `https://wx.biergao.vip/api/survey/firstgetquestion2`;
      let data = {
        id: this.cardType
      };
      request.GetWithData(url, data, res => {
        let json = res.data;
        this.questionList = json.anwserdata;
        this.allOfquestion = json.count;
        this.nowOfquestion = json.questiondata[0].id;
        this.questionTitle = json.questiondata[0].question;
        this.nextRequestnumber = json.questiondata[0].id + 1;
        this.closeToast();
      });
    }
  },
  computed: {
    ...mapState(["userParam", "cardType"])
  },
  onLoad() {
    this.init();
  }
};
</script>

<style scoped>
.question_button {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 250rpx;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 35prx;
  text-align: center;
  border-radius: 25rpx;
}

.mid_question {
  color: white;
  font-size: 35rpx;
}

.container_mid {
  margin-top: 50rpx;
}

.bottom_box {
  margin-top: 10rpx;
}

.container_bottom {
  margin-top: 50rpx;
}

.box_radio {
  display: inline-block;
  zoom: 60%;
  vertical-align: top;
}

.box_p {
  display: inline-block;
  margin-left: 10rpx;
  color: white;
  font-size: 33rpx;
  width: 80%;
  vertical-align: top;
}

.question {
  height: 100vh;
  position: relative;
}

.qusetion_container {
  width: 90%;
  height: 600rpx;
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50rpx;
  overflow: hidden;
  border: 1px solid #999999;
}

.container_top {
  text-align: center;
  height: 80rpx;
}

.top_p {
  display: inline-block;
  line-height: 80rpx;
  font-size: 35rpx;
  color: white;
  margin-left: 20rpx;
}

.container_box {
  width: 90%;
  margin: 0 auto;
}
</style>