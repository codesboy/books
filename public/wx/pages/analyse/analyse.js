// pages/analyse/analyse.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 初始数据
     */
    data: {
        data: null, //所有数据
        last_debts: 0, //总欠款金额
        searchData: null, //查询出来的数据
        searchLastDebts:null,
        form_value:""
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
    // 欠款金额数据运算处理
    dataOperation: (data) => {
        let arr = [];
        for (let i in data) {
            let c = 0;
            for (let j in data[i].debts) {
                let a = parseFloat(data[i].debts[j].debts_money);
                let b = parseFloat(data[i].debts[j].payback_money);
                let r = a - b;
                c += r;
                // console.log(c)
            }
            // arr.push(_this.toFixe(c,2));
            arr.push(c.toFixed(2)); //注意浮点数计算精度问题
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

    },

    // 查询、
    formSubmit: function(e) {
        let searchKey = e.detail.value;
        let data = this.data.data;
        if (data) {
            var rs = this.search(data, searchKey.search_key);
            if(rs){
                this.setData({
                    searchData: rs,
                    searchLastDebts: this.dataOperation2(rs.debts),
                    form_value:""
                })
            }else{
                wx.showToast({
                    title: '未查询到该客户！',
                    icon:'none'
                });
                this.setData({
                    searchData:null
                })
            }
            
        }
    },
    // 查询json数据进行欠款金额运算
    dataOperation2: (data) => {
        let c = 0;
        for (let i in data) {
            let a = parseFloat(data[i].debts_money);
            let b = parseFloat(data[i].payback_money);
            let r = a - b;
            c += r;
            // console.log(c)
        }
        // arr.push(_this.toFixe(c,2));
        return c.toFixed(2); //注意浮点数计算精度问题

    },

    // 从json中查询数据函数
    search: function(arr, v) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]['name'] == v || arr[i]['phone'] == v) {
                return arr[i];
            }
        }
    },

    // 点击拨打电话
    call:function(e){
        let phone = e.currentTarget.dataset.phone;
        if(phone){
            wx.makePhoneCall({
                phoneNumber: phone
            })
        }
        
    }


})