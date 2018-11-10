export default {
  changeteacherid(state, x) {
    state.teacherid = x
  },
  // 打开pushcard组件
  openPushcardType(state, {type,index}) {
    //修改展示的类型，是打卡还是评价,0是评价，1是打卡
    state.pushCardtype = type
    // 当前的类型是什么 0是营养
    state.cardType=index
    // 修改展示的状态，显示还是隐藏,只需要展示不需要点击隐藏
    state.isPushcardshow = true
  },                
  // 关闭pushcard组件
  closePushcardType(state) {
    state.isPushcardshow = false
  },
  // 获取type和显示toast
  toastshowtype(state, x) {
    // 0是事件，1是等待
    state.toasttype = x,
    state.toastshow = true
  },
  // 关闭toast，需要关闭toast就调用这个是mutations
  closeToast(state) {
    state.toastshow = false
  },
  // 获得全部的课程列表信息
  getLessonlistContent(state, x) {
    state.lessonListcontent = x
  },
  // 修改点击要去的课程的id
  changeClicklessonPageindex(state, x) {
    state.lessoninfoid = x
  },
  //  全局获取用户信息
  ChangeUserInfo(state, x) {
    state.userInfo = x
  },
  //全局获取用户参数
  ChangeUserParam(state,x){
    state.userParam=x
  },
  // 修改当前echarts的参数，age&sex&hight
  ChangeEchartsParam(state, x) {
    state.chartSex = x.sex
    state.chartAge = x.age
    state.youHight = x.hight
  },
  // 修改选择展示孩子曲线的index，哪位孩子
  ChangeChildrenIndex(state, x) {
    state.childrenIndex = x
  },
  // 修改雷达图参数
  ChangePolarParam(state,x){
    state.polarParam=x
  },
  // 修改全局分数
  ChangeScoreState(state,x){
    state.scoreState=x
  },
  //  全全局修改打卡评价参数
  ChangeEvaluateList(state,x){
    state.evaluateParam=x
  }
}
