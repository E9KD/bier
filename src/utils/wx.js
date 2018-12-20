export function GetUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      lang: "zh_CN",
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}
export function Login() {
  console.log(`login进来了`);
  return new Promise(resolve => {
    wx.login({
      success: res => {
        resolve(res)
      }
    })
  })
}

