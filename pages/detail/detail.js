// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    text: '',
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('navigator参数',options)
    var data=[]
    var self = this
   wx.request({
     url: 'http://api.3g.ifeng.com/ipadtestdoc?aid=' + options.aid,
     success:function(res){
       wx.setNavigationBarTitle({
         title: res.data.body.title
       })
      console.log('detail',res)
      var newtext = res.data.body.text.replace(/\<img /g,'<img width="100%" ')
      self.setData({
        detail: res.data.body,
        text: newtext ,
        title: res.data.body.title
      })
     }
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: '/pages/detail',
      imageUrl: 'https://p1.ifengimg.com/29b92e35b2b20708/2017/51/ifengLogo300x300.jpg'
    }
  }
})