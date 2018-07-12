// pages/analyse/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        debts_detail: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        wx.getStorage({
            key: 'debts_detail',
            success: (res)=> {
                let data=JSON.parse(res.data);
                this.setData({
                    debts_detail: data
                })
            },
            fail:function(){
                wx.showModal({
                    title: '发送异常',
                    content: '未查询到该客户欠款详情',
                })
            }
        })
        
    },

    // 显示完整备注内容
    showAllComment:(e)=>{
        // console.log(e)
        let comment = e.currentTarget.dataset.comment;
        if(comment.length>7){
            wx.showModal({
                title: '',
                content: comment,
                showCancel: false
            })
        }
        
    },
    // 查看照片大图
    previewImg(e){
        let src = e.target.dataset.src;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
        })
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})