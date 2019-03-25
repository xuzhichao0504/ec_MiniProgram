Page({
  data: {
    typelist:[], 
    curIndex: 0,
    isScroll: false,
    toView: 'bijiben'
  },
  onReady(){
    var that = this;
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

  navigateToGood:function(e){
    var id = e.currentTarget.dataset.id;
    // console.log(e)
    // var typelist = this.data.typelist
    // console.log(typelist)
    console.log("navigateToGood--> ID:", id)
    wx.navigateTo({
      url: '/pages/index/good/detail/detail?id=' + id,
    })

  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)

  }

})