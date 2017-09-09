//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {
            logo: '',
            name: '李炯伟',
            pStation: '龙岗区新城派出所',
            role: '所长',
        },
        myOA: {
            waiting: '23',
            processing: '82',
            finished: '13'
        },
        durationLfs: ['0.2s', '0.3s', '0.4s'],
        campanys: [{
                id: 'PO16',
                name: '鼎志实业有限公司',
                artificialP: '许栈胜',
                isImp: true,
                tags: [{
                        name: '5年标兵单位'
                    },
                    {
                        name: '优秀集体'
                    },
                    {
                        name: '宣传标兵'
                    },
                    {
                        name: '消防铁军'
                    }
                ]
            },
            {
                id: 'PO12',
                name: '新驰明一科技开发有限公司',
                artificialP: '郑文斌',
                tags: [{
                        name: '积极'
                    },
                    {
                        name: '消防标兵'
                    }
                ]
            },
            {
                id: 'PO13',
                name: '龙岗区龙城街道公园大地银鹰幼儿园',
                artificialP: '唐鑫忠',
                isImp: true,
                tags: [{
                        name: '末尾集体'
                    },
                    {
                        name: '有不良记录'
                    }
                ]
            },
            {
                id: 'PO14',
                name: '深广瀛集团',
                artificialP: '李文平',
                tags: [{
                        name: '宣传到位'
                    },
                    {
                        name: '5年标兵单位'
                    }
                ]
            },
            {
                id: 'PO15',
                name: '前海未来资产投资管理有限公司',
                artificialP: '张田达',
                tags: [{
                        name: '先进集体'
                    },
                    {
                        name: '社区宣传'
                    }
                ]
            },

        ],
        companyProcessings: [{
                id: 'PO16',
                name: '鼎志实业有限公司',
                artificialP: '许栈胜',
                isImp: true,
                pStatus: 'success',
                tags: [{
                        name: '5年标兵单位'
                    },
                    {
                        name: '优秀集体'
                    },
                    {
                        name: '宣传标兵'
                    },
                    {
                        name: '消防铁军'
                    }
                ]
            },
            {
                id: 'PO12',
                name: '新驰明一科技开发有限公司',
                artificialP: '郑文斌',
                pStatus: 'd',
                tags: [{
                        name: '积极'
                    },
                    {
                        name: '消防标兵'
                    }
                ]
            },
            {
                id: 'PO13',
                name: '龙岗区龙城街道公园大地银鹰幼儿园',
                artificialP: '唐鑫忠',
                isImp: true,
                pStatus: 'fail',
                tags: [{
                        name: '末尾集体'
                    },
                    {
                        name: '有不良记录'
                    }
                ]
            },
            {
                id: 'PO14',
                name: '深广瀛集团',
                artificialP: '李文平',
                pStatus: 'd',
                tags: [{
                        name: '宣传到位'
                    },
                    {
                        name: '5年标兵单位'
                    }
                ]
            },
            {
                id: 'PO15',
                name: '前海未来资产投资管理有限公司',
                artificialP: '张田达',
                pStatus: 'success',
                tags: [{
                        name: '先进集体'
                    },
                    {
                        name: '社区宣传'
                    }
                ]
            },

        ],
        seachingList: [],
        showCList: true

    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    showCompanyProcessing: function() {
        this.setData({ 'showCList': !this.data.showCList })
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
    onLoad: function() {
        //处理文字图标的颜色和文字
        let list = this.data.campanys;
        let cc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'e', 'f'];
        for (let item of list) {
            let fontIcon = item.name.substring(0, 1);
            item.fontIcon = fontIcon;
            item._color = '#' + cc[~~(Math.random() * 14 + 1)] + cc[~~(Math.random() * 14 + 1)] + cc[~~(Math.random() * 14 + 1)] + cc[~~(Math.random() * 14 + 1)] + cc[~~(Math.random() * 14 + 1)] + cc[~~(Math.random() * 14 + 1)];
        }
        this.setData({ 'campanys': list });
        //审批状态
        const statusList = ['success', 'fail', 'waiting'];
        for (let pItem of list) {
            pItem.status = statusList[~~(Math.random() * statusList.length)];
        }
        this.setData({ 'companyProcessings': list });
    },
    onShow: function() {
        this.setData({ 'Zero': ['1', '1', '1', '1'], 'btnZero': ['0%', '0%', '0%', '0%'] });
        this.setData({ 'initLf': '0%' });
        this.setData({ 'initScale': '1' });
        let list = this.data.campanys;
        for (let item of list) {
            item.initScale = 1;
        }
        this.setData({ 'campanys': list });
        this.setData({ 'searching': false });

    },
    search: function() {
        if (!this.data.searching) {
            //请求单位列表
            //
            this.setData({ 'searching': true });
        }
    },
    delCompany: function(e) {
        let that = this;
        let campanys = this.data.campanys;
        for (let index = 0; index < campanys.length; index++) {
            if (e.currentTarget.dataset.citem.id == campanys[index].id) {
                campanys[index].initScale = 1.5;
                that.setData({
                    [`campanys[${index}]`]: campanys[index]
                })
                setTimeout(() => {
                    campanys[index].initScale = '0;display:none;';
                    that.setData({
                        [`campanys[${index}].initScale`]: campanys[index].initScale
                    });
                }, 350);
                break;
            }

        }


    }
})