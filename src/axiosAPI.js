import axios from "axios";
import Vue from "vue";

/**
 *
 * 接口封装
 *
 *
 */
axios.defaults.baseURL = "http://www.dwhlzchb.com:8080/bbt/";
// axios.defaults.baseURL = "http://localhost:8888"; //接口路径
axios.defaults.withCredentials = true; //设置发起请求的‘凭据模式’为‘include’，
axios.interceptors.request.use(config => {
    // Vue.$store.commit("showLoading")
    return config;
});
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
var getData;
export default getData = {
    // 数据接口==============================================================================
    // 委托大厅（大家保险）
    hall(params) {
        return axios.get("/entrust/daselect", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //查询意向人
    intention(params) {
        return axios.get("/entrust/daparticulars", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //确认意向人
    confirm(agg) {
        return axios.post("/entrust/sendorders", agg).then(res => {
            return Promise.resolve(res);
        });
    },
    //查询保险公司
    Insurance(data) {
        return axios.get("/insurance/select").then(res => {
            return Promise.resolve(res);
        });
    },
    //将发布委托数据提交
    release(postData) {
        return axios.post("/entrust/add", JSON.stringify(postData), { 
            headers:  {

                       'Content-Type':   'application/json'

                   },

        }).then(res => {
            return Promise.resolve(res);
        });
    },
    //查看历史委托（大家保险）
    dhistory(params) {
        return axios.get("/entrust/getdahistory", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //查看还单记录（大家保险）
    still(params) {
        return axios.get("/entrust/getorderentrust", params).then(res => {
            return Promise.resolve(res)
        });
    },
    //手机验证码
    yanzhengma(params) {
        return axios.get("/user/note", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //测试手机号码和验证码是否正确
    login(params) {
        return axios.get("/user/login", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //查询自己的客户
    customer(params) {
        return axios.get("/client/selectquery", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //查询历史记录（其他保险）
    record(params) {
        return axios.get("/entrust/order", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //添加客户
    addcustomer(postData) {
        return axios.post("/client/add", JSON.stringify(postData), { 
            headers:  {

                       'Content-Type':   'application/json'

                   },

        }).then(res => {
            return Promise.resolve(res);
        })
    },
    //注册
    register(postuser) {
        return axios.post("/user/postuser", JSON.stringify(postuser), { 
            headers:  {

                       'Content-Type':   'application/json'

                   },

        }).then(res => {
            return Promise.resolve(res);
        })
    },
    //个人资料
    personal(params) {
        return axios.get("/user/getuser", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //查询好友
    friends(params) {
        return axios.get("/user/getfriend", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //查询客户的详细信息
    xinxi(params) {
        return axios.get("/client/particulars", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //查看委托大厅未接单委托（其他保险）
    other(params) {
        return axios.get("/entrust/getentrust", params).then(res => {
            return Promise.resolve(res);
        });
    },
    //提交有意向委托
    yixiang(params) {
        return axios.get("/entrust/have", params).then(res => {
            return Promise.resolve(res);
        })
    },
    //查询用户有意向的订单信息
    orderMessage(params) {
        return axios.get("/entrust/userintention", params).then(res => {
            return Promise.resolve(res);
        })
    },
    //用户取消自己当前有意向的委托的方法
    cancel(params) {
        return axios.get("/entrust/offintention", params).then(res => {
            return Promise.resolve(res);
        })
    },
    //查看进行中的委托
    conduct(params) {
        return axios.get("/entrust/dagetentrust", params).then(res => {
            return Promise.resolve(res);
        })
    },
    // 用户查询他当前正在处理的委托(其他保险)
    progress(params) {
        return axios.get("/entrust/queryentrust", params).then(res => {
            return Promise.resolve(res);
        })
    },
    //其他保险提交完成委托申请
    apply(params) {
        return axios.get("/entrust/accomplish", params).then(res => {
            return Promise.resolve(res);
        })
    },
    //大家保险确认订单完成（未还单状态）
    complete(params) {
        return axios.get("/entrust/daputentrust", params).then(res => {
            return Promise.resolve(res);
        })
    },
    //用户还单
    returnOrder(returnorder) {
        return axios.post("/entrust/useralso", JSON.stringify(returnorder), { 
            headers:  {       'Content-Type':   'application/json'   },

        }).then(res => {
            return Promise.resolve(res);
        })
    },
    //用户查询正在处理委托的还单记录（大家保险）
    delivery(params) {
        return axios.get("/entrust/selectdeliveryorder", params).then(res => {
            return Promise.resolve(res);
        })
    },
    //大家保险用户点击确认接收其他保险还单和驳回其他保险的还单
    operation(params) {
        return axios.get("/entrust/daputorder", params).then(res => {
            return Promise.resolve(res);
        })
    },
    //其他保险的用户 查询当前订单 还单信息的方法
    orderXinxi(params) {
        return axios.get("/entrust/getdeliveryorder", params).then(res => {
            return Promise.resolve(res);
        })
    },
    //大家保险委托人 确定委托完成(全部完成，接委托的用户已经还完单)
    daconfirmentrust(params) {
        return axios.get("/entrust/daconfirmentrust", params).then(res => {
            return Promise.resolve(res)
        })
    },
    //其他保险 历史委托 查看详情
    getorder(params) {
        return axios.get("/entrust/getorder", params).then(res => {
            return Promise.resolve(res)
        })
    },
    //退出登录
    tuichu() {
        return axios.get("/user/exit").then(res => {
            return Promise.resolve(res)
        })
    },
    //修改客户信息
    modifyCustomer(modifyData) {
        return axios.post("/client/clientredact", JSON.stringify(modifyData), { 
            headers:  {

                       'Content-Type':   'application/json'

                   },

        }).then(res => {
            return Promise.resolve(res);
        })

    },
    //删除客户
    deleteCustomer(params) {
        return axios.get("/client/delectclient", params).then(res => {
            return Promise.resolve(res)
        })
    },
    //修改个人信息
    modifyMyself(myselfData) {
        // return axios.get("/user/userredact", myselfData).then(res => {
        //     return Promise.resolve(res)
        // })
        return axios.post("/user/userredact", JSON.stringify(myselfData), { 
            headers:  {

                       'Content-Type':   'application/json'

                   },

        }).then(res => {
            return Promise.resolve(res);
        })
    },
    //用户撤销委托
    revoke(params) {
        return axios.get("/entrust/putrevocation", params).then(res => {
            return Promise.resolve(res)
        })
    },
    //用户查询消息
    news(params) {
        return axios.get("/user/selectnews", params).then(res => {
            return Promise.resolve(res)
        })
    },
    //用户消息已读和删除方法
    read(params) {
        return axios.get("/user/delectnews", params).then(res => {
            return Promise.resolve(res)
        })
    }
    //
    //   // 退出登录
    //   logout() {
    //     return axios.post("/user/logout").then(res => {
    //       return Promise.resolve(res);
    //     });
    //   },


    //   // 获取用户基础信息
    //   getUserInfo() {
    //     return axios.get("/user/info").then(res => {
    //       return Promise.resolve(res.data);
    //     });
    //   },

};
/*
    将所有接口对象注册到Vue原型 
    此语句放入main.js
    import getData from './axiosAPI'
    // window.console.log(getData)
    Vue.prototype.getData = getData;
*/
/*
created(){
    // 
    this.getData.getIndex1().then(res=>{ window.console.log(res)});//首页数据1
    this.getData.getIndex2().then(res=>{ window.console.log(res)});//首页数据2
    this.getData.postCategories().then(res=>{window.console.log(res)})//所有分类
    this.getData.getCate().then(res=>{window.console.log(res)})//单分类数据
    this.getData.getBanners().then(res=>{window.console.log(res)})//首页轮播
    this.getData.getLive(1).then(res=>{window.console.log(res)})//直播详情
    this.getData.getUserInfo().then(res=>{window.console.log(res)})//用户资料
    this.getData.getUserAttention().then(res=>{window.console.log(res)})//用户关注列表
    this.getData.friendLinks().then(res=>{ window.console.log(res)});//友情链接
    this.getData.getConfig().then(res=>{ window.console.log(res)});//网站配置
    this.getData.getLiveOpen().then(res=>{ window.console.log(res)});//开播1
    this.getData.getLiveStop().then(res=>{ window.console.log(res)});//关播
    
    // this.getData.postCode("15707499869","123456")().then(res=>{window.console.log(res)})
    // this.getData.postAttention("1")().then(res=>{window.console.log(res)})

  }
}
*/