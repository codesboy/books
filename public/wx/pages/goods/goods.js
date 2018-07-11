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
        checkedData:null,//选中的数据
        totalMoney:0
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
                    goodsData: res.data,
                    checkedData:res.data
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
        let _this = this;
        let goods_name = e.detail.value.goods_name;
        if(goods_name==''){
            wx.showModal({
                title: '',
                content: '货物名称不能为空！',
                showCancel:false
            });
            return false;
        }
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
        let index = e.currentTarget.dataset.index;
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        console.log(e)
        let checked = `checkedData[${index}].checked`
        if (e.detail.value.length>0){
            this.setData({
                [checked]: true
            })
        }else{
            this.setData({
                [checked]: false
            })
        }
        // app.globalData.checkedData=e.detail.value
        // console.log(app.globalData.checkedData)
    },

    // 获取数量/单价
    bindKeyInput: function (e) {
        let index = parseInt(e.currentTarget.dataset.index);
        let checked = `checkedData[${index}].checked`
        this.setData({
            [checked]:true
        })
        if(e.detail.value==''){
            this.setData({
                [checked]: false
            })
        }
        if (e.currentTarget.dataset.name =='quantity'){
            // console.log(index)
            let key = `checkedData[${index}].quantity`
            this.setData({
                [key]:e.detail.value,

            })
        } else if (e.currentTarget.dataset.name == 'unit_price'){
            let key = `checkedData[${index}].unit_price`
            this.setData({
                [key]: e.detail.value
            })
        }
        
        
    },
})