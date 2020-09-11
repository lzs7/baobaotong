<template>
  <div class="page">
    <!-- 导航栏 -->
    <div class="Navigation">
      <div class="ri" @click="tuichu">
        <div class="Return-img" >
          <img src="../assets/img/gb.png" alt />
        </div>
        <div class="tui">退出登录</div>
        
      </div>
      <div class="img-right">
        <img src="../assets/img/elipsis1.png" alt />
      </div>
    </div>
    <!-- 头像及名字展示 -->
    <div class="information">
      <!-- 头像 -->
      <div class="dd">
        <div class="touxiang">
          <img src="../assets/img/tou.png" alt />
        </div>
        <div class="vx-name">
          {{userdata.userName}}
          <div class="dlr">
            <img src="../assets/img/dailiren2.png" alt />
          </div>
        </div>
        <!-- 金牌代理              需要用       -->
        <!-- <div class="Golden">
          <div><img src="../assets/img/jinpai.png" alt=""></div>
          <div>金牌代理</div>
        </div>-->

        <!-- <div class="Golden golden">
          <div><img src="../assets/jinpai1.png" alt=""></div>
          <div>金牌代理</div>
        </div>-->
        <div class="Real-name">{{userdata.testState==0?'审核中':"已实名"}}</div>
        <!-- <div class="dlr">
          <img src="../assets/dailiren.png" alt="">
        </div>-->
      </div>

      <!-- 个人资料 -->
      <router-link to="/Information">
        <div class="personal_data">
          <span>个人资料</span>
          <div>
            <img src="../assets/img/jinru.png" alt />
          </div>
          <div>
            <img src="../assets/img/jinru.png" alt />
          </div>
        </div>
      </router-link>
      <!-- 认证代理人 -->

      <!-- <div class="personal_data authentication">
				<span>认证代理</span>
				<div><img src="../assets/img/jingru2.png" alt=""></div>
				<div><img src="../assets/img/jingru2.png" alt=""></div>
      </div>-->
    </div>
    <!-- 列表 -->
    <div class="index-list">
      <div class="list" @click="haoche">
        <div class="icon">
          <van-icon name="home-o" size="1rem" />
        </div>
        <span>豪车汇</span>
      </div>

      <router-link to="/Customer">
        <div class="list">
          <div class="icon">
            <van-icon name="manager-o" />
          </div>
          <div>客户</div>
        </div>
      </router-link>
      <router-link to="/Dayend">
        <div class="list">
          <div class="icon">
            <van-icon name="gold-coin-o" />
          </div>
          <div>日结</div>
        </div>
      </router-link>
      <div>
        <!-- <div class="icon"><img src="../assets/haoyou.png" alt=""></div> -->
        <van-collapse v-model="activeNames">
          <van-collapse-item title="我的好友" name="1" icon="friends-o" :value="count+'个好友'">
            <div v-show="count==0">没有好友</div>
            <div class="xinxi" v-show="count>0" v-for="(item,index) in friend" :key="index">
              <div>{{item.friendName}}</div>
              <div>{{item.friendCompanyName}}</div>
              <div>{{item.friendPhone}}</div>
            </div>
          </van-collapse-item>
        </van-collapse>
        <div style="margin-top:0.4rem">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="消息" name="2" icon="volume-o" :value="number+'条消息'">
              <div v-show="number==0">没有消息</div>

              <div style="width:100%" v-show="number>0">
                <div class="xx_title">
                  <div>车牌号码</div>
                  <div>消息内容</div>
                  <div>操作</div>
                </div>
                <div class="xx_neirong" v-for="(item,index) in list" :key="index">
                  <div style="font-size:0.8rem">{{item.newsLicenseNumber}}</div>
                  <div style="font-size:0.8rem">{{item.newsMessage}}</div>
                  <div style="display:flex;">
                    <button class="du" @click="weidu(item)" v-show="item.newsState==0">未读</button>
                    <button class="yi" v-show="item.newsState==1">已读</button>
                    <button @click="delet(item)" class="delet">删除</button>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      activeNames: ["0"],
      userId: "",
      userdata: [],
      count: "",
      friend: [],
      number: "",
      list: []
    };
  },

  methods: {
    //退出
    tuichu() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认退出？"
        })
        .then(() => {
          this.getData.tuichu().then(() => {
            this.$dialog
              .alert({
                title: "提示",
                message: "退出成功"
              })
              .then(() => {
                // on close
                this.$router.push("/");
              });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //点击豪车汇
    haoche() {
      var cookie1 = this.common.getCookie();
      var baoId = cookie1.replace(/\"/g, "").split("#")[1];
      //判断当状态 进入相应的页面
      this.getData
        .orderMessage({
          params: {
            //点击进去委托大厅
            userId: this.userId
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$router.push({ path: "/weituo_Details" });
          }
        });
      // 正在处理状态为1
      this.getData
        .progress({
          params: {
            userId: this.userId
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$router.push({ path: "/huandan" });
          }
        });
      // 判断不同角色进入不同页面
      if (baoId != 2) {
        this.$router.push({ path: "/Commission_T" });
      } else {
        this.$router.push({ path: "/Commission_Hall" });
      }
    },
    weidu(id) {
      //点击未读变成已读
      let newsId = id.newsId;
      let userId = this.userId;

      this.getData
        .read({
          params: {
            newsId: newsId,
            userId: userId,
            index: 1
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    delet(id) {//删除消息
      let newsId = id.newsId;
      let userId = this.userId;
      this.getData
        .read({
          params: {
            newsId: newsId,
            userId: userId,
            index: 2
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$dialog
              .alert({
                title: "提示",
                message: "删除成功"
              })
              .then(() => {
                this.reload();
              });
          }
        })
        .catch(err => {});
    }
    // onClickLeft() {
    // 	history.back();
    // },
  },
  mounted() {
    var cookie1 = this.common.getCookie();
    this.userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .personal({
        params: {
          //查询个人资料
          userId: this.userId
        }
      })
      .then(res => {
        this.userdata = res.data.data;

      })
      .catch(err => {
        console.log(err);
      });
    this.getData
      .friends({
        params: {
          //查询好友
          userId: this.userId
        }
      })
      .then(res => {
        this.count = res.data.count;
        this.friend = res.data.data;
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.code == 0) {
          this.$router.push({ path: "/" });
        }
      });
  },
  created() {
    //查询消息
    var cookie1 = this.common.getCookie();
    let userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .news({
        params: {
          userId: userId
        }
      })
      .then(res => {
        this.list = res.data.data;
        this.number = res.data.count;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped="scoped">
* {
  margin: 0;
  padding: 0;
}
img {
  width: 100%;
  height: 100%;
}
a {
  color: #000000;
}
.page {
  background-color: #f9f3f3;
  min-height: 100vh;
}
.Navigation {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  line-height: 2rem;
  background-image: linear-gradient(-90deg, #41d8dd 0%, #5583ee 100%);
}
.dd {
  position: absolute;
  width: 15rem;
  height: 7rem;
}
.me {
  font-size: 1rem;
  margin-left: 0.3rem;
  color: #ffffff;
}
.tui {
  font-size: 1rem;
  margin-left: 0.3rem;
  color: #ffffff;
}

.Return-img {
  width: 1rem;
  height: 1rem;
  line-height: 2.3rem;
  margin-left: 0.3rem;
}

.information {
  height: 8rem;
  /* margin-top: 0.5rem; */

  background-image: linear-gradient(-90deg, #41d8dd 0%, #5583ee 100%);
  position: relative;
}
.touxiang {
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 8%;
  left: 4%;
}
.touxiang img {
  border-radius: 6rem;
}
.vx-name {
  position: absolute;
  top: 16%;
  left: 33%;
  font-size: 1.2rem;
  color: #ffffff;
}
.Real-name {
  position: absolute;
  top: 52%;
  left: 33%;
  color: #ffffff;
  border-radius: 1.25rem;
  border: 0.0625rem solid #ffffff;
  font-size: 0.625rem;
  text-align: center;
  width: 4rem;
}
.personal_data {
  width: 5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  color: #ffffff;
  border-top-left-radius: 1.25rem;
  border-bottom-left-radius: 1.25rem;
  border: 0.0625rem solid #ffffff;
  border-right: none;
  text-align: center;
  position: fixed;
  right: 0rem;
  top: 4.625rem;
  display: flex;
}
.personal_data span {
  font-size: 0.75rem;
  margin-left: 0.5rem;
}
.personal_data div {
  width: 0.625rem;
  height: 0.625rem;
}
.authentication {
  position: fixed;
  right: 0rem;
  top: 7rem;
  border: 0.0625rem solid #ffd700;
  border-right: 0;
}
.authentication span {
  color: #ffd700;
}
.Golden {
  position: absolute;
  top: 54%;
  left: 62%;
  color: #ffffff;
  display: flex;
  font-size: 0.625rem;
  text-align: center;
  width: 6.25rem;
  height: 1rem;
  line-height: 1rem;
}
.Golden div:first-child {
  width: 1rem;
  height: 1rem;
}
.Golden div:last-child {
  color: #aaaaaa;
}
.golden div:last-child {
  color: #ffd700;
}
.go {
  position: absolute;
  bottom: 8%;
  right: 10%;
  display: flex;
}
.go div {
  width: 1.5rem;
  height: 1.5rem;
}
.index-list {
  margin-top: 1rem;
}
.list {
  height: 2.5rem;
  display: flex;
  line-height: 2.5rem;
  margin-bottom: 0.4rem;
  background-color: #ffffff;
  font-size: 0.9rem;
}
.icon {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.3rem;
  margin-left: 1rem;
}
.list span {
  font-size: 0.9rem;
}
.xinxi {
  height: 2rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  line-height: 2rem;
  margin-bottom: 0.3rem;
}
.xinxi div {
  font-size: 0.9rem;
  width: 8rem;
}
.img-right {
  margin-right: 1%;
  height: 1.5rem;
  width: 1.5rem;
  line-height: 2rem;
}
.touxiang {
  border-radius: 3.125rem;
  position: absolute;
  top: 12%;
  left: 2%;
}
.dlr {
  width: 3.125rem;
  height: 3.125rem;
  position: absolute;
  bottom: 0;
  left: 90%;
}
.ri {
  display: flex;
}
.xx_title {
  display: flex;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  border-bottom: 0.001rem solid #ebedf0;
}
.xx_title div {
  width: 35%;
  text-align: center;
}
.xx_neirong {
  display: flex;
  height: 1.5rem;
  width: 100%;
  line-height: 1.5rem;
  margin-top: 0.5rem;
}
.xx_neirong div {
  width: 35%;
  text-align: center;
}
.xx_neirong div:last-child {
  width: 35%;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
}
.xx_neirong button {
  margin-left: 10%;
  width: 35%;
  height: 1.5rem;
  line-height: 1.5rem;
  background-color: #ff3333;
  color: #ffffff;
  border: none;
}
.xx_neirong .du {
  background-color: #00dd00;
  color: #ffffff;
  border: none;
  font-size: 0.8rem;
}
.xx_neirong .yi {
  background-color: #ffffff;
  color: #dcdcdc;
  border: 0.01rem solid #dcdcdc;
  margin-left: 10%;
  font-size: 0.8rem;
}
.xx_neirong .delet{
    background-color: #ff3333;
  color: #ffffff;
  border: none;
  font-size: 0.8rem;
}
</style>

