// pages/tally/tally.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 组件的初始数据
     */
    data: {
        date: "",
        index: 0,
        goodsData: null
    },

    onShow: function () {
        this.loadData();
    },

    /**
     * 组件的方法列表
     */
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    //选择货物
    goodsPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },

    //请求货物接口
    loadData(){
        wx.request({
            url: app.globalData.baseUrl + 'getgoods',
            method: 'GET',
            success: (res) => {
                this.setData({
                    goodsData:res.data
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
    formSubmit:function(e){
        console.log(e.detail.value);
        wx.request({
            url: app.globalData.baseUrl + 'adddebts',
            method: 'POST',
            data: e.detail.value,
            success: (res) => {
                console.log(res.data)
            },
            fail: function (e) {
                console.log(e.errMsg)
                wx.showToast({
                    title: '发生错误',
                    content:e.errMsg
                    
                })
            }
        })
    }
})
