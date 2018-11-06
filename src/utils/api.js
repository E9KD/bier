

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

export default  {
    api,
    GetWithData
}
