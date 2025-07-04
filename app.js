import regeneratorRuntime from "/utils/wxPromise.min.js";
//app.js
App({
  onLaunch: function (options) {
    const user_id = wx.getStorageSync("uid");
    if (user_id && user_id > 0) {
      this.globalData.uid = user_id;
    }
    const { windowWidth } = wx.getSystemInfoSync();
    this.globalData.pixelRatio = 750 / windowWidth;
    
    // 从远程获取配置
    this.loadRemoteConfig();
  },
  
  loadRemoteConfig: function() {
    wx.request({
      url: 'https://www.view-ol.com/url.json',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          if (res.data.register) {
            this.globalData.sign_up_url = res.data.register;
          }
        }
      },
      fail: (err) => {
        console.log('获取远程配置失败:', err);
      }
    });
  },
  
  globalData: {
    honesty_json: "https://www.view-ol.com/cxqy.json",
    sign_up_url: "",
    video_url: `https://www.view-ol.com/zsx/?t=${Date.now()}#/live`,
    userInfo: null,
    http: "https://www.view-ol.com/viewol_web",
    web_http: "https://www.view-ol.com/",
    encryptedData: null,
    openid: null,
    uid: null,
    sessionId: null,
    expoId: 2,
    userJoin: 1,
    firefighting_exhibitors_award: 0,
    firefighting_activity_self: 0,
    regeneratorRuntime,
  },
});
