// pages/analyse/analyse.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 初始数据
     */
    data: {
        data: "",
        last_debts: 0
        // debtsData:""
    },
    onShow: function() {
        this.loadData();
    },

    // 请求数据
    loadData() {
        wx.request({
            url: app.globalData.baseUrl + 'getalldebts',
            method: 'GET',
            success: (res) => {
                this.setData({
                    data: res.data,
                    last_debts: this.dataOperation(res.data)
                });
                // console.log(this.dataOperation(res.data))
                // this.dataOp600eration(res.data)

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
    toFixe:function (num, s) {
        var times = Math.pow(10, s)
    var des = num * times + 0.5
    des = parseInt(des, 10) / times
    return des + ''
    },
    // 数据运算处理
    dataOperation: (data) => {
        var _this = this;
        let arr = [];
        for (let i in data) {
            let c = 0;
            for (let j in data[i].debts) {
                let a = parseFloat(data[i].debts[j].debts_money);
                let b = parseFloat(data[i].debts[j].payback_money);
                let r = a-b
                // let r = (a * 10 - b * 10) / 10; //注意浮点数计算精度问题
                // c = (c * 10 + r * 10) / 10; //注意浮点数计算精度问题
                c+=r
                // console.log(c)
            }
            // arr.push(_this.toFixe(c,2));
            arr.push(c.toFixed(2))
        }
        return arr;
    },

    // 跳转详细页面
    readDetail: (e) => {
        let debts_detail = JSON.stringify(e.currentTarget.dataset.debts);
        // console.log(debts_detail)
        wx.setStorage({
            key: 'debts_detail',
            data: debts_detail,
        });

        wx.getStorage({
            key: 'debts_detail',
            success: function() {
                wx.navigateTo({
                    // url: 'detail/detail?debts_detail=' + debts_detail,
                    url: 'detail/detail',
                })
            }
        })

    }


})