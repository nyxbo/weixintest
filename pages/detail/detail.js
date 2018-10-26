// pages/detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    text: '',
    title: '',
    isShow: false,
    userImg:'',
    userInfo:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userImg: '',
    nowavatarUrl: '',
    maskHidden: false,
    // 测试留言
    msgData:[
      {msg:'11111'},
      {msg:'22222'}
    ],
    inputVal:'',
    showP: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getNetworkType({ // 获取当前网络状态
      success: function(res) {
        console.log('当前网络状态',res)
      },
    })
    wx.onNetworkStatusChange(function (res) { // 监听网络状态改变
      console.log('网络状态改变', res)
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    // wx.getSetting({
    //   success: data => {
    //     var self = this;
    //     console.log('查看已授权', data);
    //     if (data.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: data => {
    //           console.log('获取用户信息', data)
    //           wx.showToast({
    //             title: '分享授权',
    //             icon:'success',
    //             success:()=>{
    //               self.setData({
    //                 userImg: data.userInfo.avatarUrl
    //               })
    //             }
    //           })
              
    //         }
    //       })
    //     } else {
    //       console.log('没有授权')
    //     }
    //   }
    // })

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


  //  获取本地保存的magData
  wx.getStorage({
    key: 'listInfo',
    success: function(res) {
      console.log('getstorage',res);
      // msgData 此时是空的
      let list = self.data.msgData;
      let a = list?list:[];
      let newList = res.data;
      // 将缓存中的数据加入到msgData
      a=newList;
      self.setData({
        msgData:a
      })
    },
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
  },
  shareQuan:function(){  //分享至朋友圈 生成图片二维码
    let that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '图片生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 1000);
    wx.downloadFile({
      url: that.data.userInfo.avatarUrl,
      success: function (res) {
        // console.log('下载图片', res.tempFilePath);
        that.setData({
          nowavatarUrl: res.tempFilePath
        });
      }
    });
  },
  createNewImg:function(){ // 将canvas转换成图片保存到本地，然后将图片路径传给image的src
    let that = this;
    var context = wx.createCanvasContext("mycanvas");
    // 绘制背景底色
    context.setFillStyle("#ffe200");
    context.fillRect(0,0,375,667);
    // 绘制头部图片
    var path = "/images/img1.png";
    context.drawImage(path, 10, 10, 355, 75);
    var path1 = that.data.userInfo.avatarUrl, //用户头像
        path3 = "/images/ma.jpg", //二维码
        path4 = "/images/img3.png",
        path5 = "/images/img4.png";
    var name = that.data.userInfo.nickName;
    // 绘制名字
    context.setFontSize(24);
    context.setFillStyle("#333333");
    context.setTextAlign("center");
    context.fillText(name,185,340);
    context.stroke();
    // 绘制一起看新闻标语
    context.setFillStyle("#333333");
    context.setFontSize(14);
    context.setTextAlign("center");
    context.fillText("邀请你一起看新闻~",185,370);
    context.stroke();
    // 绘制左下角背景
    context.drawImage(path4, 25, 520, 184, 82);
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("已有十二人和我一起，在凤", 35, 540);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("煌新闻客户端关注最新新闻", 35, 560);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("你也一起吧~", 35, 580);
    context.stroke();
    // 绘制二维码
    context.drawImage(path3,248, 490,90,90);
    // 绘制右下角二维码提示
    context.drawImage(path5, 248, 578, 90, 25);
    // 绘制头像
    context.arc(186, 246, 50, 0, 2 * Math.PI); // 画圆
    context.setStrokeStyle("#ffe200");
    context.clip(); // 裁剪上面的圆
    context.drawImage(that.data.nowavatarUrl, 136, 196, 100, 100); //在刚刚裁剪的圆上画图

    context.draw();
    // 将生成好的图片保存到本地，需要延迟一会，绘图期间耗时
     setTimeout(function(){
       wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
          console.log('canvas', res)
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
         },
         fail: function (res) {
           console.log(res);
         }
       });
     },200)
  },
  baocun:function(){
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success:function(res){
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false,
                isShow: false
              })
            }
          }, fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },
  shareBtn: function () {
      this.setData({
        isShow: true
      })
  },
  cancle: function () {
    this.setData({
      isShow: false
    })
  },
  getUserInfo: function (e) {
    console.log('getUserInfo', e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 测试留言部分
  del:function(e){
    console.log('del====',e.target.dataset.index);
    let that = this;
    let num = e.target.dataset.index;
    let list = that.data.msgData;
    wx.showModal({
      title: '提示',
      content: '确定删除该条留言吗',
      success:function(res){
        console.log(res);
        if(res.confirm){
          list.splice(num,1);
          that.setData({
            msgData: list
          });
          wx.showToast({
            titile:'删除成功'
          })
        }
      }
    })
  },
  changeinputVal:function(e){
    console.log(e.detail.value);
    this.setData({
      inputVal: e.detail.value
    })
  },
  add:function(e){
    if(this.data.inputVal == ''){
      wx.showToast({
        title: '请填写您的留言',
      })
      return false;
    }
    let list = this.data.msgData;
    let newlist = list ? list : [];
    newlist.push({
      msg: this.data.inputVal
    });
    wx.setStorage({
      key: 'listInfo',
      data: newlist,
    });
    this.setData({
      msgData: newlist,
      inputVal: '',
      showP: false
    })
  },
  pingA:function(){
    this.setData({
      showP: true
    })
  }
})