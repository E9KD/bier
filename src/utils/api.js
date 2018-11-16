

 const api = function (url, resolve) {

  wx.request({
    url: url,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
        resolve(res)
    }
  })
}

const GetWithData=function(url,data,resolve){
    wx.request({
        url: url,
        method:"GET",
        data:data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            resolve(res)
        }
    })

}

const Post=function(url,data,resolve){
    wx.request({
        url: url,
        method:"POST",
        data:data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            resolve(res)
        }
    })

}

const order=function(url, data,callback) {
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          callback(res.data);
        }
      }
    })
  }


export default  {
    api,
    GetWithData,
    Post,
    order
}
