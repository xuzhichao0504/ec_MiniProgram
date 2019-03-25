//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
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


    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getLocation({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.locationInfo = res.locationInfo

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

    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://xuzhichao.cn/onlogin',
            data: {
              code: res.code
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },

            success: function (res) {
              console.log(res.data);
            }

          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      }
    })

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })

          if (cb.code) {
            //发起网络请求
            wx.request({
              url: 'https://xuzhichao.cn/onLogin',
              data: {
                code: cb.code
              }
            })
          } else {
            console.log('登录失败！' + cb.errMsg)
          }

        }
      })
    }
  },
  //get locationInfo
  

  globalData: {
    userInfo: null,
    locationInfo: null
  },

})