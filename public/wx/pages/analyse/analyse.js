// pages/analyse/analyse.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 初始数据
     */
    data: {
        data: "",
        last_debts:0
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
        let arr=[];
        for (let i in data) {
        let c = 0;
            for (let j in data[i].debts) {
                let a = data[i].debts[j].debts_money;
                let b = data[i].debts[j].payback_money;
                let r = a - b;
                c += r;
                // console.log(c)
            }
            arr.push(c);
        }
        return arr;
    },

    readDetail:(e)=>{
        console.log()
        let cid = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: 'detail/detail?cid='+cid,
        })
    }


})