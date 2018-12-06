function Get(url, data = {}) {
  return new Promise(resolve => {
    wx.request({
      url: url,
      data: data,
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}

function Post(url, data) {
  return new Promise(resolve => {
    wx.request({
      url: url,
      data: data,
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}

function Order(url, data) {
  return new Promise(resolve => {
    wx.request({
      url: url,
      data: data,
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res.data);
        }
      }
    })
  })
}

function GetWithOutData(url, data) {
  return new Promise(resolve => {
    wx.request({
      url: url,
      data: data,
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        resolve(res)
      }
    })
  })
}


export default {
  Get,
  Post,
  Order,
  GetWithOutData
}