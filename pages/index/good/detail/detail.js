// pages/index/good/detail/detail.js
const app = getApp()
Page({
  data: {
    id:[],
    good:[],
    hasUserInfo: false,
    nickName: "",
    userInfo: {}
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log("options=",options)
    this.setData({
      id: options.id - 1
    })
    var that = this;
    showView: (options.showView == "true" ? true : false)
    app.getUserInfo(function (userInfo) {
      // console.log(userInfo)
      that.setData({
        userInfo: userInfo,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      })
    })
  },
  onReady: function() {
    // 页面渲染完成
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 获取id之后 传给界面  并根据id去寻找我们的商品详细信息
  onShow: function() {
    var id = this.data.id;
    console.log("onShow --> id:", id);   
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 390000
    })
    var that = this;
    wx.request({
      url: 'https://xuzhichao.cn/good_get',  
      data: {},
      method: 'GET',     
      success: function(res) {
        // success
        console.log(res.data.good_get[id])     
        that.setData({
          good: res.data.good_get[id],      
        })       
      },
      fail: function() {
        // fail
        setTimeout(function() {
          wx.showToast({
            title: "加载失败",
            duration: 1500
          })
        }, 100)
      },
      complete: function() {
        // complete
        wx.hideToast();
      }
    })
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    
    // 页面关闭
  }, 
  // 查看购物车
  lookcart:function(e){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  // 添加购物车
  addToCart: function (e) {
    var id = this.data.id;
    // var tc = this.data.good[id].tc;
    var good = this.data.good
    console.log("onShow --> id:", id);
    console.log(good)
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 390000
    })
    var that = this;
    wx.request({
      url: 'https://xuzhichao.cn/good_addToCart',
      data: {
        num: 1,
        mode: 0,
        checked: false,
        good: this.data.good,
        nickName: this.data.nickName,
        id: this.data.id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data) {
          setTimeout(function () {
            wx.showToast({
              title: "加入购物车成功",
              duration: 1500
            })
          }, 100)
        } 
      },
      fail: function () {
        // fail
        setTimeout(function () {
          wx.showToast({
            title: "加入失败",
            duration: 1500
          })
        }, 100)
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
  },
  // 立即购买
  buyToCart:function(e){
    console.log(e)
    var id = this.data.id;
    // var tc = this.data.good[id].tc;
    var good = this.data.good[id]  
    console.log("onShow --> id:", id); 
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 390000
    })
    wx.request({
      url: 'https://xuzhichao.cn/good_buyToCart',
      data: {
        num: 1,
        mode: 0,
        checked: false,
        good: this.data.good,
        nickName: this.data.nickName,
        id: this.data.id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data) {
          setTimeout(function () {
            wx.showToast({
              title: "购买成功",
              duration: 1500
            })
          }, 100)
        } 
      },
      fail: function () {
        // fail
        setTimeout(function () {
          wx.showToast({
            title: "购买失败",
            duration: 1500
          })
        }, 100)
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })

  },
  changeTc: function (e) {
    var tc = e.detail.value;
    var id = this.data.id
    console.log(id)
    console.log(e)
    console.log("changeTc--> tc:", tc)
    this.setData({
      "good.tc": tc
    })
  }
})