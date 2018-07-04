// pages/goods.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue:'',
        goodsData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.loadData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // this.loadData();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    //请求货物接口
    loadData() {
        wx.request({
            url: app.globalData.baseUrl + 'getgoods',
            method: 'GET',
            success: (res) => {
                this.setData({
                    goodsData: res.data
                })

            },
            fail: function(e) {
                console.log(e.errMsg)
            },
            complete: function() {
                wx.stopPullDownRefresh();
                if (wx.hideLoading) {
                    wx.hideLoading();
                }
            }
        });
    },

    // 提交表单
    formSubmit(e){
        // console.log(e.detail.value);
        var _this = this;
        // console.log(this)
        wx.request({
            url: app.globalData.baseUrl + 'addgoods',
            method: 'POST',
            data: e.detail.value,
            success: (res) => {
                let oldData = _this.data.goodsData;
                oldData.unshift(res.data);
                _this.setData({
                    goodsData: oldData,
                    inputValue:''
                });
                wx.showModal({
                    title: '添加成功！',
                    duration: 3000,
                    showCancel: false
                });

            },
            fail: function (e) {
                wx.showModal({
                    title: '发生错误！',
                    content: e.errMsg,
                    showCancel: false
                })
            },
            complete: function () {
                wx.stopPullDownRefresh();
                if (wx.hideLoading) {
                    wx.hideLoading();
                }
            }
        });
    }
})