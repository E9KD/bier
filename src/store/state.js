export default {
  // toast
  toastshow: false, //toast显示隐藏切换
  toasttype: 0, //展示toast的类型，默认为0是事件 1是等待
  toastContent:'',//toast展示的文字
  // 获得用户信息
  userInfo:null,
  userParam:{},
  teacherid: 0,
  pushCardtype: 0,
  // 营养是0
  cardType:null,
  isPushcardshow: false,
  // 选中课程的所有信息
  lessonListcontent: [],
  // 点击要去的课程的id
  lessoninfoid: 0,
  //  图表的当前参数,age\sex\youhight
  chartAge:10,
  chartSex:0,
  youHight:100,
  // 日历签到天数
  signDate:{},
  // 选择是那个孩子的index
  childrenIndex:null,
  // 雷达图参数
  polarParam:null,
  //  全局分数
  scoreState:null,
  // 打卡评价需要的参数
  evaluateParam:[],
  // toast2状态
  toast2State:0,
  // buytoast的状态
  buytoastState:null,
  // buytoast的显示
  buytoastShow:false,
  //space判定
  spaceState:0,
  // 默认的分享值
  sid:0
}
