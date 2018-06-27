// pages/tally/tally.js
Page({

  /**
   * 组件的初始数据
   */
  data: {
      date:"",
      index:0,
      goodsArray: ['饲料A', '饲料B', '饲料C', '饲料D'],
      objectArray: [
          {
              id: 0,
              name: '美国'
          },
          {
              id: 1,
              name: '中国'
          },
          {
              id: 2,
              name: '巴西'
          },
          {
              id: 3,
              name: '日本'
          }
      ],
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
})
