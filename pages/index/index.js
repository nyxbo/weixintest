//index.js
//获取应用实例
const app = getApp()
console.log('getAPP',app)

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userImg:'',
    nowavatarUrl:'',
    maskHidden: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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


    wx.getSetting({
      success: data => {
        var self = this;
        console.log('查看已授权', data);
        if (data.authSetting['scope.userInfo']) {
          // wx.getUserInfo({
          //   success: data => {
          //     console.log('获取用户信息', data)
          //     wx.showToast({
          //       title: '分享授权',
          //       icon:'success',
          //       success:()=>{
          //         self.setData({
          //           userImg: data.userInfo.avatarUrl
          //         })
          //       }
          //     })

          //   }
          // }

        } else {
          console.log('没有授权')
        }
      }
    })


    // const ctx = wx.createCanvasContext('myCanvas')
    // ctx.setFillStyle('pink')
    // ctx.fillRect(0, 0, 0, 0)
    // // ctx.draw()
    // const WIDTH = 750;
    // const HEIGHT = 1334;
    // //  绘制图片模板的 底图
    // ctx.drawImage(this.userImg, 0, 0, WIDTH, HEIGHT);
    // //  绘制图片模板的 banner图
    // ctx.drawImage('../../images/xwdq.png', 40, 40, 670, 580);
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
    return {
      title: '1234',
      path: '/pages/index/index?id=123'
    }
    wx.getShareInfo(OBJECT)
  },
  getUserInfo: function(e) {
    console.log('getUserInfo',e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickMe:function(){
    let that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '海报生成中...',
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
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function(){
    var that = this;
    var context = wx.createCanvasContext('mycanvas');   //wx.createCanvasContext()创建canvas组件绘图上下文
    context.setFillStyle("#ffe200")
    context.fillRect(0, 0, 375, 667)
    var path = "/images/img1.png";
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    context.drawImage(path, 0, 0, 375, 183);
    var path1 = that.data.userInfo.avatarUrl; //用户头像
    console.log("path1",path1);
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    // var path2 = "/images/img1.png";
    var path3 = "/images/img2.png";
    var path4 = "/images/img3.png";
    var path5 = "/images/img4.png";
    // context.drawImage(path2, 126, 186, 120, 120);
    var name = that.data.userInfo.nickName;
    //绘制名字
    context.setFontSize(24);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(name, 185, 340);
    context.stroke();
    //绘制一起吃面标语
    context.setFontSize(14);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText("邀请你一起去看新闻", 185, 370);
    context.stroke();
    //绘制左下角文字背景图
    context.drawImage(path4, 25, 520, 184, 82);
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("进入小程序输入朋友的邀请", 35, 540);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("码，朋友和你各自获得通用", 35, 560);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("优惠券1张哦~", 35, 580);
    context.stroke();
    //绘制右下角扫码提示语
    context.drawImage(path5, 248, 578, 90, 25);
    //绘制头像
    context.arc(186, 246, 50, 0, 2*Math.PI) //画出圆
    context.strokeStyle = "#ffe200";
    context.clip(); //裁剪上面的圆形
    context.drawImage(that.data.nowavatarUrl, 136, 196, 100, 100); // 在刚刚裁剪的园上画图
    context.draw();
    // 将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          console.log('canvas',res)
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
    }, 200);
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
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
                maskHidden: false
              })
            }
          }, fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },
  // bindFormSubmit: function (e) {
  //   console.log('textarea',e.detail.value.textarea)
  // },
  bindKeyInput:function(e){
    console.log('input', e.detail.value)
  }
})
