// pages/analyse/analyse.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 初始数据
   */
  data: {
    data:""
  },
    onShow:function(){
        this.loadData();
    },

    loadData() {
        wx.request({
            url: app.globalData.baseUrl + 'getalldebts',
            method: 'GET',
            success: (res) => {
                this.setData({
                    data: res.data
                })

            },
            fail: function (e) {
                console.log(e.errMsg)
            },
            complete: function () {
                wx.stopPullDownRefresh();
                if (wx.hideLoading) {
                    wx.hideLoading();
                }
            }
        });
    },
})
