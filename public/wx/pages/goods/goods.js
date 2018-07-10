// pages/goods.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue:'',
        goodsData: [],
        quantity:1,//数量
        unit_price:0,//单价
        arr:null,
        checkedData:[]//选中的数据
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
                wx.showToast({
                    title: '添加成功！',
                    duration: 3000,
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
    },

    // 复选框
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        app.globalData.checkedData=e.detail.value
        console.log(app.globalData.checkedData)
    },

    // 获取数量/单价
    bindKeyInput: function (e) {
        // console.log(e)
        // const app = getApp();思路 app存
        let obj={
            "goods_id": e.currentTarget.dataset.id,
            "quantity":1,
            "unit_price":0
        };
        // arr[0] = e.currentTarget.dataset.id
        if (e.currentTarget.dataset.name =='unit_price'){
            obj.unit_price = e.detail.value
            this.setData({
                arr: obj
            })
            this.setData({
                unit_price:e.detail.value
            })
        } else if (e.currentTarget.dataset.name == 'quantity'){
            obj.quantity = e.detail.value
            this.setData({
                arr: obj
            })
            this.setData({
                quantity: e.detail.value
            })
        }
        
        // var oldData = this.data.checkedData
        // oldData.push(arr)
        // this.setData({
        //     checkedData:oldData
        // })
    },
})