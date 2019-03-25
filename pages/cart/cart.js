// pages/cart/cart.js
const app = getApp()
Page({ 
  data: {
    cartlist: [],
    nickName:"",
    totalPrice: 0,
    totalCount: 0,
    isAll: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      that.setData({
        userInfo: userInfo,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      })
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {
    // 页面渲染完成
   

   
  },
  getreload:function(){
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 300000
    })
    var that = this;
    wx.request({
      url: 'https://xuzhichao.cn/good_LookCart',
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log("cartlist=", res.data)
        console.log(that.data.nickName)
        var cartlist = [];
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i].nickName)
          if (res.data[i].nickName == that.data.nickName) {
            cartlist.push(res.data[i])
          }
        }
        console.log(cartlist)
        that.setData({
          cartlist: cartlist
        })
        that.checkIsAll()
      },
      fail: function () {
        setTimeout(function () {
          wx.showToast({
            title: "加载失败"
          })
        }, 100)
      },
      complete: function () {
        wx.hideToast()
      }
    })
  },

  onShow: function () {
    // 页面显示
    console.log('onShow');
    this.getreload();
    const self = this;
    wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
   
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh: function (e) {
    this.updateData();
    setTimeout(function () {
      console.log("stopPull")
      wx.stopPullDownRefresh();
    }, 2000)
  },
  updateData: function () {
    
  },
  changeMode: function (e) {
    var id = e.target.dataset.id;
    var cartlist = this.data.cartlist;
    console.log(id)
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        cartlist[i].mode = cartlist[i].mode == 0 ? 1 : 0;
        break;
      }
    }
    console.log("over", cartlist);
    this.setData({
      cartlist: cartlist
    })
  }
  ,
  checkItem: function (e) {
    var id = e.target.dataset.id;
    var checked = e.detail.value;
    console.log(id)
    var cartlist = this.data.cartlist;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        cartlist[i].checked = checked;
        console.log(cartlist[i])
        break;
      }
    }
    this.setData({
      cartlist: cartlist
    })
    this.calcateTotal()
    this.checkIsAll()
  },
  checkAll: function (e) {
    var checked = e.detail.value;
    var cartlist = this.data.cartlist;
    for (var i = 0; i < cartlist.length; i++) {
      cartlist[i].checked = checked;
    }
    this.setData({
      cartlist: cartlist
    })
    this.calcateTotal()
  },
  calcateTotal: function () {
    var cartlist = this.data.cartlist;
    var totalPrice = 0;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].checked) {
        totalPrice += cartlist[i].good.tcprices[cartlist[i].good.tc] * cartlist[i].num;
      }
    }
    console.log(totalPrice)
    this.setData({
      totalPrice: totalPrice
    })
  },
  checkIsAll: function () {
    var cartlist = this.data.cartlist;
    var isAll = cartlist.length!=0?true:false;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].checked == false) {
        isAll = false;
        break;
      }
    }
    this.setData({
      isAll: isAll
    })
  },
  updateNum: function (id, num) {
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 300000
    })
    var that = this;
    wx.request({
      url: 'https://xuzhichao.cn/good_changeNum',
      data: {
        _id:id,
        num:num,
        nickName:this.data.nickName
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        if (res.data) {
          setTimeout(function () {
            wx.showToast({
              title: "成功",
              duration: 1500
            })
          }, 100)
        }
      },
      fail: function () {
        setTimeout(function () {
          wx.showToast({
            title: "操作失败"
          })
        }, 100)
      },
      complete: function () {
        wx.hideToast()
      }
    })
    this.calcateTotal()
  },
  updateTc: function (id, tc) {
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 300000
    })
    var that = this;
    wx.request({
      url: 'https://xuzhichao.cn/Wxmini/cart_changeTc.do?id=' + id + '&tc=' + tc,
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        if (res.data.flag) {
          setTimeout(function () {
            wx.showToast({
              title: "成功",
              duration: 1500
            })
          }, 100)
        }
      },
      fail: function () {
        setTimeout(function () {
          wx.showToast({
            title: "操作失败"
          })
        }, 100)
      },
      complete: function () {
        wx.hideToast()
      }
    })
    this.calcateTotal()
  },
  changeTc: function (e) {
    var id = e.target.dataset.id;
    var cartlist = this.data.cartlist;
    var tc = e.detail.value;
    console.log(id)
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        cartlist[i].good.tc = tc;
        this.updateTc(id, tc);
        break;
      }
    }
    console.log("over", cartlist);
    this.setData({
      cartlist: cartlist
    })
  },
  addNum: function (e) {
    var id = e.target.dataset.id;
    var cartlist = this.data.cartlist;
    var tc = e.detail.value;
    console.log(id)
    
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        // console.log(cartlist[i].good.store)可以设置库存good.store
        if (cartlist[i].num < 100) {
          cartlist[i].num = cartlist[i].num + 1;
          this.updateNum(id, cartlist[i].num);
        } else {
          wx.showToast({
            title: "不能再加了"
          })
        }
        cartlist[i].num - 1;
        break;
      }
    }
    console.log("over", cartlist);
    this.setData({
      cartlist: cartlist
    })
  },
  delNum: function (e) {
    var id = e.target.dataset.id;
    var cartlist = this.data.cartlist;
    var tc = e.detail.value;
    console.log(id)
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == id) {
        if (cartlist[i].num > 1) {
          cartlist[i].num = cartlist[i].num - 1;
          this.updateNum(id, cartlist[i].num);
        } else {
          wx.showToast({
            title: "不能再减了"
          })
        }
        cartlist[i].num - 1;
        break;
      }
    }
    console.log("over", cartlist);
    this.setData({
      cartlist: cartlist
    })
  },
  delItem: function (e) {
    var that = this;
    wx.showModal({
      title: "警告",
      content: "是否从购物车中移除此宝贝?",
      success: function (res) {
        if (res.confirm) {
          var id = e.target.dataset.id;
          var cartlist = that.data.cartlist;
          var tc = e.detail.value;
          console.log(id)
          for (var i = 0; i < cartlist.length; i++) {
            if (cartlist[i].id == id) {
              that.delCart(id);
              cartlist.splice(i, 1);
              break;
            }
          }
          console.log("over", cartlist);
          that.setData({
            cartlist: cartlist
          })
        }
      }
    })
  },
  submitCart: function (e) {
    var that = this;
    var cartlist = that.data.cartlist;
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].checked) {
        that.updateCheck(cartlist[i].id);
      }
    }
    var that = this;
    setTimeout(function () {
      if (that.isAllOk) {
        wx.showToast({
          title: "Loading...",
          icon: "loading",
          duration: 300000
        })
        wx.request({
          url: 'http://localhost:8080/Wxmini/cart_submit.do',
          // data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            console.log(res.data)
            if (res.data.flag) {
              setTimeout(function () {
                wx.showToast({
                  title: "结算成功",
                  duration: 1500
                })
                setTimeout(function () {
                  that.updateData();
                  that.calcateTotal()
                }, 1500)
              }, 100)
            }
          },
          fail: function () {
            setTimeout(function () {
              wx.showToast({
                title: "操作失败"
              })
            }, 100)
          },
          complete: function () {
            wx.hideToast()
          }
        })
      }
    }, 300)

  },
  isAllOk: true,
  updateCheck: function (id) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/Wxmini/cart_check.do?id=' + id,
      // data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.flag) {

        } else {
          that.isAllOk = false;
        }
      },
      fail: function () {
        that.isAllOk = false;
      },
      complete: function () {
        wx.hideToast()
      }
    })
  },
  delCart: function (id) {
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 300000
    })
    var that = this;
    console.log(id)
    wx.request({
      url: 'https://xuzhichao.cn/good_DelCart' ,
      data: {
        _id: id,
        nickName: this.data.nickName,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        if (res.data.flag) {
          setTimeout(function () {
            wx.showToast({
              title: "成功",
              duration: 1500
            })
            that.calcateTotal()
          }, 100)
        }
      },
      fail: function () {
        setTimeout(function () {
          wx.showToast({
            title: "删除成功"
          })
        }, 100)
      },
      complete: function () {
        wx.hideToast()
      }
    })
  },
  navigateToShopView :function(e){
    var typeId=e.currentTarget.dataset.id;
    console.log("NavigateToShopView--> typeId:",typeId)
    wx.navigateTo({
      url: '../index/good/good?typeId='+typeId
    })
  },
  navigateToGoodView :function(e){
    var id=e.currentTarget.dataset.id;
    console.log("NavigateToGoodView--> id:",id)
    wx.navigateTo({
      url: '../index/good/detail/detail?id='+id
    })
  }
})