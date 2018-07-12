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

    // 提交添加表单
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
                    checkedData:oldData,
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
            }
        });
    },

    // 复选框
    checkboxChange: function (e) {
        let index = e.currentTarget.dataset.index;
        // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        // console.log(e)
        let checked = `checkedData[${index}].checked`
        if (e.detail.value.length>0){//选中状态
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
        let checked = `checkedData[${index}].checked`;
        let quantity = `checkedData[${index}].quantity`;
        let unit_price = `checkedData[${index}].unit_price`
        // this.setData({
        //     [quantity]: 0,
        //     [unit_price]:0
        // })
        
        if (e.currentTarget.dataset.name =='quantity'){
            // console.log(index)
            // let key = `checkedData[${index}].quantity`
            this.setData({
                [quantity]:e.detail.value,
            })
        } else if (e.currentTarget.dataset.name == 'unit_price'){
            // let key = `checkedData[${index}].unit_price`
            this.setData({
                [unit_price]: e.detail.value
            })
        }
        
        
        if (e.detail.value == '') {
            this.setData({
                [checked]: false
            })
        }else{
            this.setData({
                [checked]: true
            })
        }
        
    },

    // 确认货物选择
    confirmSelect(){
        let checkedData = this.data.checkedData;
        // console.log(this.data.checkedData)
        let arr=[];
        
        let totalMoney =0;//拿货的总金额
        for(let i in checkedData){
            if (checkedData[i].checked && checkedData[i].quantity && checkedData[i].unit_price){//验证是否选中和是否完整填写单价数量
                // arr.push(arr2.push(checkedData[i].))
                let itemMoney = parseInt(checkedData[i].quantity) * parseFloat(checkedData[i].unit_price);//计算本项金额
                let obj = {};
                obj.goods_id = checkedData[i].id;
                obj.quantity = checkedData[i].quantity;
                obj.unit_price = checkedData[i].unit_price;
                obj.debts_money = itemMoney;
                obj.unit_price = checkedData[i].unit_price;
                totalMoney += itemMoney
                arr.push(obj)
            }else{
                // console.log('no')
            }
        }
        
        // console.log(totalMoney.toFixed(2),arr)

        let pages = getCurrentPages();
        let prePage = pages[pages.length-2];//上一页面
        prePage.setData({//把本页的数据传递到上一页面
            checkedDebtsData:arr,
            "formData.debts_money": totalMoney.toFixed(2)
        });
        wx.navigateBack({
            delta: 1
        })
        // console.log(pages.length)
        // console.log(prePage)
    }
})