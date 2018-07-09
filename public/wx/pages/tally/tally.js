// pages/tally/tally.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 组件的初始数据
     */
    data: {
        date:'',
        form_value: '',
        index: 0,
        goodsData: null,
        tempFilePaths:''
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
    // 提交表单
    formSubmit:function(e){
        // console.log(e.detail.value);
        var _this = this;
        wx.request({
            url: app.globalData.baseUrl + 'adddebts',
            method: 'POST',
            data: e.detail.value,
            success: (res) => {
                // console.log(res.data)
                if(res.data.cid){
                    wx.showToast({
                        title: '保存成功！',
                        duration: 2500
                    });
                    // 清空表单
                    _this.setData({
                        form_value:""
                    })                 
                }else{
                    wx.showModal({
                        title: '信息填写有误，请检查！',
                        content: JSON.stringify(res.data.msg),
                        showCancel: false
                    });
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
    },
    // 图片上传
    upload:function(){
        let _this = this;
        wx.chooseImage({
            count:1,
            sizeType: ['compressed'],
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                console.log(tempFilePaths)
                _this.setData({
                    tempFilePaths: tempFilePaths
                });
                // wx.uploadFile({
                //     url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                //     filePath: tempFilePaths[0],
                //     name: 'file',
                //     formData: {
                //         'user': 'test'
                //     },
                //     success: function (res) {
                //         var data = res.data
                //         console.log(data)
                //         //do something
                //     }
                // })
            },
            fail:function(e){
                wx.showModal({
                    title: 'error',
                    content: e.msg,
                })
            }
        })
    },
    
})
