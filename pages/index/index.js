//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {
            logo: '',
            name: '李炯伟',
            pStation: '公安局龙岗区分局',
            office: '龙岗问之屋有限公司',
            role: '游客',
        },
        Zero: ['0.2', '0.4', '0.6', '0.8'],
        btnZero: ['150%', '250%', '350%', '450%']

    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        let prom = new Promise((resolve, reject) => {
            wx.getUserInfo({
                success: function(res) {
                    // success
                    resolve(res);
                },
                fail: function(err) {
                    // fail
                    reject(err);
                },
                complete: function() {
                    // complete
                }
            })
        })
        prom.then((res) => {
            // wx.setStorageSync('userInfo', res);
            this.setData({
                'userInfo.name': res.userInfo.nickName,
                'userInfo.logo': res.userInfo.avatarUrl,

            })
        }).catch((err) => {
            wx.showModal({
                title: '错误提示',
                content: err,
                showCancel: false
            });
        })

    },
    onShow: function() {
        this.setData({ 'Zero': ['1', '1', '1', '1'], 'btnZero': ['0%', '0%', '0%', '0%'] })
    }
})