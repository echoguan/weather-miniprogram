const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}


Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowTemp: "14°",
    nowWeather: "多云",
    nowWeatherBackground: "",
    hourlyWeather: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNow();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNow( () => {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 获取当前的天气情况并刷新页面
   */
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success: res => {
        let result = res.data.result
        this.setNow(result)
        this.setHourlyWeather(result)        
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setNow(result) {
    let temp = result.now.temp;
    let weather = result.now.weather;

    this.setData({
      nowTemp: temp + "°",
      nowWeather: weatherMap[weather],
      nowWeatherBackground: `/images/${weather}-bg.png`
    })

    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather],
    })
  },

  setHourlyWeather(result) {
    let forecast = result.forecast;
    let hourlyWeather = [];
    let nowHour = new Date().getHours();
    for (let i = 0; i < 8; i++) {
      hourlyWeather.push({
        time: (nowHour + i * 3) % 24 + "时",
        iconPath: "/images/" + forecast[i].weather + "-icon.png",
        temp: forecast[i].temp + "°"
      })
    }
    hourlyWeather[0].time = "现在";
    this.setData({
      hourlyWeather
    })
  }
})