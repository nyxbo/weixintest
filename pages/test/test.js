// pages/test/test.js
var app = getApp();
var url = 'http://api.iclient.ifeng.com/ClientNews?id=SYLB10,SYDT10&gv=5.4.0&os=ios&uid=1480642792854_azvcjq4840'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:{
      a: '数据1',
      arr: ['a','b','c'],
      
    },
    name: 'banana',
    staffA: { firstName: 'Hulk', lastName: 'Hu' },
    staffB: { firstName: 'Shang', lastName: 'You' },
    staffC: { firstName: 'Gideon', lastName: 'Lin' },
    count: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('======生命周期函数onLoad监听页面加载======')
    var self = this;
    app.$http.get(url).then(function (res) {
      var a = self.detailData(res.data)
      console.log("bobobo",a)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('======生命周期函数onReady监听页面初次渲染完成======')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('======生命周期函数onShow监听页面显示======')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('======生命周期函数onHide监听页面隐藏======')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('======生命周期函数onUnload监听页面卸载======')
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
  onShareAppMessage: function (options) {
    console.log(options)//  options from转发来源：button页面内按钮转发、menu右上角转发菜单；target如果from是button，则为转发此次事件的button
    return{
      title:'齐波的测试页',
      path:'/pages/test',
      imageUrl:'http://p2.ifengimg.com/d27607d14a52d158/2018/27/content.png'
    }
  },

  // 绑定事件
  add: function (e) {
    this.setData({
      count: this.data.count + 1
    })
  },
  imgFn:function(){
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        _this.setData({
          imageArr: tempFilePaths
        })        
      }
    })
  }
  
})