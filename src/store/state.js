export default {
  // toast
  toastshow: false, //toast显示隐藏切换
  toasttype: 0, //展示toast的类型，默认为0
  toastListevent: [ // 事件的list
    true,
    true,
    '/static/image/success.png',
    'Hello World'
  ],
  toastListload: [ //等待的list
    true,
    false,
    '/static/image/loading.gif',
    'Please Wait...'
  ],
  // 获得用户信息
  userInfo:[],
  userParam:[],
  teacherid: 0,
  httpHead: 'https://wx.biergao.vip/api/',
  httpLogin:'biaob/getOpenid2/code/',
  httpBanner: 'index/getArrimg',
  httpTeacherpage1: 'Fuwu/getfuwu?page=1&pageall=15&openid=enen',
  httpTeacherpage2: 'Fuwu/getfuwu?page=2&pageall=15&openid=enen',
  httpGoods: 'index/getTeachers?is_goods=1',
  httpVideo: 'https://wx.biergao.vip/uploads/b/784344c9f6e7dd9f6322783457cfb071.mp4',
  httpTeacherinfo: 'https://wx.biergao.vip/api/Fuwu/getoneinfo?id=',
  pushCardtype: 0,
  isPushcardshow: false,
  // 课程的所有信息
  lessonListcontent: [],
  // 点击要去的课程的id
  lessoninfoid: 0,
  //  图表的当前参数,age\sex\youhight
  chartAge:null,
  chartSex:null,
  youHight:null,
  // 日历签到天数
  signDate:{},
  // 选择是那个孩子的index
  childrenIndex:null,
  // 雷达图参数
  polarParam:null,
  //  全局分数
  scoreState:null
}
