// pages/payback.js
//获取应用实例
const app = getApp();
Page({
    

    /**
     * 初始数据
     */
    data: {
        date: "",
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    // 提交表单
    formSubmit: function (e) {
        // console.log(e.detail.value);
        wx.request({
            url: app.globalData.baseUrl + 'payback',
            method: 'POST',
            data: e.detail.value,
            success: (res) => {
                console.log(res.data)
                if (res.data.error_code) {
                    wx.showModal({
                        title: '信息填写有误，请检查！',
                        content: JSON.stringify(res.data.msg),
                        showCancel: false
                    });
                } else {
                    wx.showToast({
                        title: '保存成功！',
                        duration: 2500
                    })
                }
            },
            fail: function (e) {
                wx.showModal({
                    title: '发生错误',
                    content: JSON.stringify(e.errMsg),
                    showCancel: false
                })
            }
        })
    }
    //   encodeURI($key)
    // 2.如果出现同名 直接新增debts
    // 数据回滚，事务
})