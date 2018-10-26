//app.js
App({
  onLaunch: function (e) {
    console.log('场景值', e.scene)
    console.log('打开小程序路径', e.path)
    console.log('打开小程序的query', e.query)
    wx.getSystemInfo({
      success: function(res) {console.log('获取小程序基础库版本号',res)},
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
    //   success: function(){
    //     console.log('success!')
    //   },
    //   fail:function(){
    //     console.log('fail!')
    //   }
    // })
    // wx.openSetting({
    //   success:data=>{
    //     console.log('openSetting',data)
        
    //   }
    // })
    wx.authorize({
      scope: 'writePhotosAlbum',//授权保存相册
      success:data=>{
        console.log('授权保存相册成功',data)
      },
      fail:error=>{
        console.log('授权保存相册失败',error)
      }
    })
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx90db089e47cca681&secret=ed72f83f930a8baf2398424fe7d67c16&js_code='+res.code+'&grant_type=authorization_code',
            // data: {
            //   code: res.code
            // }
            success:data => {
              console.log(data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('用户信息',res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})