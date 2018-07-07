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

    // 数据运算处理
    dataOperation: (data) => {
        let arr = [];
        for (let i in data) {
            let c = 0;
            for (let j in data[i].debts) {
                let a = parseFloat(data[i].debts[j].debts_money);
                let b = parseFloat(data[i].debts[j].payback_money);
                // let r = a-b
                let r = (a * 100 - b * 100) / 100; //注意浮点数计算精度问题
                c = (c * 100 + r * 100) / 100; //注意浮点数计算精度问题
                // console.log(r)
            }
            // arr.push(c.toFixed(2));
            arr.push(c)
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