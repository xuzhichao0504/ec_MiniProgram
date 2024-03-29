// pages/index/good/good.js
Page({
  data: {
    typelist: [
      {
        id: 0,
        name: "全部"
      },
      {
        id: 1,
        name: "笔记本"
      },
      {
        id: 2,
        name: "台式机"
      },
      {
        id: 3,
        name: "电脑外设"
      },
      {
        id: 4,
        name: "手机配件"
      },
      {
        id: 5,
        name: "智能手机"
      },
      {
        id: 6,
        name: "pc配件"
      },
      {
        id: 7,
        name: "数码相机"
      },
      {
        id:8,
        name: "智能穿戴"
      },
    ],
    // goodlist: [
    //   {
    //     id: 1,
    //     title: "雷柏v500 RGB机械键盘",
    //     pic: "http://p9sgy632z.bkt.clouddn.com/Technology.jpg",
    //     price: 169,
    //   },
    //   {
    //     id: 2,
    //     title: "雷柏v500 RGB机械键盘",
    //     pic: "http://p9sgy632z.bkt.clouddn.com/Technology.jpg",
    //     price: 169,
    //   },
    //   {
    //     id: 3,
    //     title: "雷柏v500 RGB机械键盘",
    //     pic: "http://p9sgy632z.bkt.clouddn.com/Technology.jpg",
    //     price: 169,
    //   },
    //   {
    //     id: 4,
    //     title: "雷柏v500 RGB机械键盘",
    //     pic: "http://p9sgy632z.bkt.clouddn.com/Technology.jpg",
    //     price: 169,
    //   },
    //   {
    //     id: 5,
    //     title: "雷柏v500 RGB机械键盘",
    //     pic: "http://p9sgy632z.bkt.clouddn.com/Technology.jpg",
    //     price: 169,
    //   },
    //   {
    //     id: 6,
    //     title: "雷柏v500 RGB机械键盘",
    //     pic: "http://p9sgy632z.bkt.clouddn.com/Technology.jpg",
    //     price: 169,
    //   }
    // ],
    orderBy: "id",
    typeId: 1
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options) {
      if (options.typeId) {
        console.log(options)
        this.setData({
          typeId: options.typeId
        })
      }
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var id=this.data.typeId
    console.log("onShow --> typeId:", id);
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 390000
    })
    var that = this;
    wx.request({
      url: 'https://xuzhichao.cn/good_getlist/' + id,
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
        that.setData({
        goodlist: res.data
        })
      },
      fail: function () {
        // fail
        setTimeout(function () {
          wx.showToast({
            title: "加载失败",
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
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  navigateToGood: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log("navigateToGood --> id:", id);
    wx.navigateTo({
      url: './detail/detail?id=' + id
    })
  },
  searchGoodByTypeId: function (e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      typeId: id
    })
    console.log("searchGoodByTypeId --> id:", id);
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 390000
    })
    var that = this;
    wx.request({
      url: 'https://xuzhichao.cn/good_getlist/'+id ,
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
       
        that.setData({
          goodlist: res.data,
          

        })
      },
      fail: function () {
        // fail
        setTimeout(function () {
          wx.showToast({
            title: "加载失败",
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
  searchGood: function (e) {
    var id = this.data.typeId;
    var keyword = e.detail.value.keyword;
    console.log("SearchGood--> keyword:" + keyword);
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 390000
    })
    var that = this;
    wx.request({
      url: 'https://xuzhichao.cn/good_getlist/0/?typeId=' + id + '&keyword=' + keyword,
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
        that.setData({
          goodlist: res.data
        })
      },
      fail: function () {
        // fail
        setTimeout(function () {
          wx.showToast({
            title: "加载失败",
            duration: 1500
          })
        }, 100)
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
  }
})