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
        btnZero: ['150%', '250%', '350%', '450%'],
        users: [{
            figurImg: '../../../images/user1.png',
            userName: '田辉光',
            userTel: '13530921231',
            tags: [{
                wx: '1',
                tel: '',
                message: '1'
            }]
        }, {
            figurImg: '../../../images/user2.png',
            userName: '王俊',
            userTel: '10930921231',
            tags: [{
                wx: '',
                tel: '1',
                message: '1'
            }]
        }, {
            figurImg: '../../../images/user3.png',
            userName: '李晨星',
            userTel: '1873230921231',
            tags: [{
                wx: '1',
                tel: '1',
                message: '1'
            }]
        }, {
            figurImg: '../../../images/user4.png',
            userName: '马越男',
            userTel: '1373230921231',
            tags: [{
                wx: '',
                tel: '1',
                message: '1'
            }]
        }, {
            figurImg: '../../../images/user5.png',
            userName: '夏乐柏',
            userTel: '10930921231',
            tags: [{
                wx: '1',
                tel: '1',
                message: '1'
            }]
        }],
        menuItems: [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'

        ]

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