// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { name: '娱乐', push: 'yl', url: 'https://api.iclient.ifeng.com/ClientNews?id=YL53,FOCUSYL53&gv=5.7.4&av=0&proid=ifengnews&os=ios_11.1&vt=5&screen=1125x2001&proid=ifengkuzhan&isnoad=1&uid=' },
      { name: '军事', push: 'js', url: 'https://api.iclient.ifeng.com/ClientNews?id=JS83,FOCUSJS83&gv=5.7.5&av=0&os=ios_11.1.1&vt=5&screen=750x1334&proid=ifengkuzhan&isnoad=1&uid=' },
      { name: '健康', push: 'jk', url: 'http://api.iclient.ifeng.com/ClientNews?id=JK36&gv=5.7.4&av=0&os=ios_11.1&vt=5&screen=1125x2001&proid=ifengkuzhan&isnoad=1&uid=' },
      { name: '财经', push: 'cj', url: 'http://api.iclient.ifeng.com/ClientNews?id=CJ33,FOCUSCJ33,HNCJ33&gv=5.7.4&av=0&os=ios_11.0&vt=5&screen=1242x2208&proid=ifengkuzhan&isnoad=1&uid=' },
      { name: '体育', push: 'ty', url: 'http://api.iclient.ifeng.com/ClientNews?id=TY43,FOCUSTY43,TYTOPIC&gv=5.7.4&av=0&os=ios_11.1&vt=5&screen=1125x2001&proid=ifengkuzhan&isnoad=1&uid=' },
      { name: '科技', push: 'kj', url: 'http://api.iclient.ifeng.com/ClientNews?id=KJ123,FOCUSKJ123&os=ios_11.1&vt=5&screen=1125x2001&proid=ifengkuzhan&isnoad=1&uid=' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  }
})