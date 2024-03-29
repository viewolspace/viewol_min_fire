import regeneratorRuntime from '/utils/wxPromise.min.js'
//app.js
App({
    onLaunch: function (options) {
        const user_id = wx.getStorageSync('uid')
        if (user_id && user_id > 0) {
            this.globalData.uid = user_id
        }
    },
    globalData: {
        sign_up_url: 'https://service.ciec.com.cn/ciec_sw/modules/register/preRegm/91819/wechat/zh/n',
        video_url: 'https://home.aiyaopai.com/xiaofangzhanlanhui/index.html',
        userInfo: null,
        http: 'https://www.view-ol.com/viewol_web',
        web_http: 'https://www.view-ol.com/',
        encryptedData: null,
        openid: null,
        uid: null,
        sessionId: null,
        expoId: 2,
        userJoin: 1,
        firefighting_exhibitors_award: 0,
        firefighting_activity_self: 0,
        regeneratorRuntime
    }
})