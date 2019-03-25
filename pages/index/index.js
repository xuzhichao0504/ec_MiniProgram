//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperCurrent: 0,
    hasUserInfo: false,
    nickName: "",
    userInfo: {},
    post: [],
    imgUrls: [],
    typelist: []
  },


  onLoad: function (options) {
    var that = this;
    showView: (options.showView == "true" ? true : false)
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      that.setData({
        userInfo: userInfo,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      })
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo    
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  

  onReady: function () {
    var that = this;
    wx.request({
      url: 'https://xuzhichao.cn/dianshang_imgUrls ',
      data: {},
      method: 'GET',
      success: function (res) {
         console.log(res.data.dianshang_imgUrls);
        that.setData({
          imgUrls: res.data.dianshang_imgUrls
        })
      },
      fail: function () {
        setTimeout(function () {
          wx.showToast({
            title: "加载失败",
            duration: 1500
          })
        }, 100)
      },
      complete: function () {
        wx.hideToast();
      }
    })

    wx.request({
      url: 'https://xuzhichao.cn/dianshang_typelist ',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res.data.dianshang_typelist);
        that.setData({
          typelist: res.data.dianshang_typelist
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },


  swiperchange: function (event) {
    var that = this;
    console.log(event.currentTarget)
    var swiper = event.currentTarget.dataset.swiper.id
    var image = event.currentTarget.dataset.swiper.image
    console.log(image)
    wx.navigateTo({
      url: '/pages/goods-details/goods-details?id=' + swiper + "&image=" + image,
    })
  },
  
  navigateToShop: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("navigateToShop--> ID:", id)
    wx.navigateTo({
      url: './good/good?typeId=' + id
    })
  },

  navigateToGood: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(e)
    var typelist = this.data.typelist
    console.log(typelist)
    console.log("navigateToGood--> ID:", id)
    wx.navigateTo({
      url: './good/detail/detail?id=' + id,
    })
  },

  onShow:function(){
    

  }
})
