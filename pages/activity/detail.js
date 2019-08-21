const WxParse = require('../../wxParse/wxParse.js');
const { globalData, globalData: { http, regeneratorRuntime } } = getApp()

Page({
    data: {},
    onLoad: function(option) {
        const { id } = option
        this.setData({ id })
        this.getActivityInformation(id)
    },

    getActivityInformation: async function(id) {
        const { data: { status, message, result } } = await wx.pro.request({
            url: `${http}/schedule/getSchedule`,
            method: 'GET',
            data: { id, userId: globalData.uid }
        })

        if (status === '0000') {
            this.setData({ info: result, applyStatus: +result.applyStatus })
            WxParse.wxParse('article', 'html', result.contentView, this, 5);
        }
    },
    applyJoin: async function() {
        const { id } = this.data
        const { data: { status, message } } = await wx.pro.request({
            url: `${http}/schedule/applyJoin`,
            method: 'POST',
            data: { scheduleId: id, userId: globalData.uid, needReminder: false },
            header: { 'content-type': 'application/x-www-form-urlencoded' }
        })

        wx.showToast({
            title: message,
            icon: status === '0000' ? 'success' : 'none',
            duration: 3000
        });

        if (status === '0000') {
            this.setData({ applyStatus: 2 })
        }
    },
    onShareAppMessage: function(res) {
        return {
            title: this.data.info.title,
            path: `pages/activity/detail?id=${this.data.id}`,
            success: (shareTickets) => {
                console.info(shareTickets + '成功');
            },
            fail: function(res) {
                console.log(res + '失败');
                // 转发失败
            }
        }
    }
})