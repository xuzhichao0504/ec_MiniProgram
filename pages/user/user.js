// pages/user/user.js
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log("获取用户信息成功!")
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: "数码城",
      desc: "我做的一个小程序"
    }
  },
  onShow() {
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  onPullDownRefresh: function () {
    var that = this
    setTimeout(function () {
      wx.stopPullDownRefresh();
      console.log("stoppull")
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //更新数据
        console.log("获取用户信息成功!")
        that.setData({
          userInfo: userInfo
        })
      })
    }, 2000)
  },
  showUserTip: function () {
    wx.showModal({
      content: "用户信息与微信绑定,无需编辑!",
      showCancel: false,
      confirmText: "知道了"
    })
  },

  navigateToAddr: function () {
    wx.navigateTo({
      url: '../addr/addr'
    })
  },
  navigateToOrder: function () {

    wx.navigateTo({
      url: './order/order?typeId=0'
    })
  },
  navigateToOrder_pay: function () {

    wx.navigateTo({
      url: './order/order?typeId=1'
    })
  },
  navigateToOrder_get: function () {

    wx.navigateTo({
      url: './order/order?typeId=2'
    })
  }
})