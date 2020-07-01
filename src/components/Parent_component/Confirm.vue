<template>
  <div class="page">
    <!-- 确认委托是否完成 -->
    <!-- 导航 -->
    <van-nav-bar left-text="详情" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- 标题 -->
    <div style="height:2.4rem;"></div>
    <div class="d_title">
      <div>{{licensePlateNumber}}</div>
      <div>¥{{entrustmoney}}</div>
      <div>{{entruststartTime.substring(0,10)}}</div>
    </div>
    <div class="tips">请确认委托是否完成</div>
    <!-- 内容 -->
    <div v-if="entruststate==1">
      <div class="c_data">
        <div>{{list.userName}}</div>
        <div>{{list.userPhone}}</div>
        <div>{{list.insuranceCompanyName}}</div>
        <div>进行中</div>
      </div>
      <div class="btn">
        <van-button disabled type="info">确认委托完成</van-button>
      </div>
    </div>
    <div v-else="entruststate==2">
      <div class="c_data">
        <div>{{list.userName}}</div>
        <div>{{list.userPhone}}</div>
        <div>{{list.insuranceCompanyName}}</div>
        <div>请求确认</div>
      </div>
      <div class="btn">
        <van-button type="info" @click="complete(list.entrustId)">确认委托完成</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entrustmoney: "", //接收传过来的保费
      entruststartTime: "", //接收传过来的时间
      entruststate: "",
      licensePlateNumber: "",
      userId: "",
      entrustId: "",
      list: []
    };
  },
  methods: {
    onClickLeft() {
      //返回按钮
      this.$router.push({ path: "/Commission_Hall" });
    },
    complete(entrustId) {
      //确认订单完成 等待对方还单
      this.getData
        .complete({
          params: {
            userId: this.userId,
            entrustId: entrustId
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$dialog
              .alert({
                title: "成功",
                message: "等待对方还单"
              })
              .then(() => {
                this.$router.push({ path: "/Commission_Hall" });
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //获取路由参数
    (this.entrustId = this.$route.query.entrustId),
      (this.entrustmoney = this.$route.query.entrustmoney),
      (this.entruststartTime = this.$route.query.entruststartTime),
      (this.entruststate = this.$route.query.entruststate),
      (this.licensePlateNumber = this.$route.query.licensePlateNumber);
    //获取cookie
    let cookie1 = this.common.getCookie();
    this.userId = cookie1.replace(/\"/g, "").split("#")[0];
    let insuranceCompanyId = cookie1.replace(/\"/g, "").split("#")[1];
    this.getData
      .conduct({
        params: {
          //获取页面数据
          userId: this.userId,
          entrustId: this.entrustId
        }
      })
      .then(res => {
        this.list = res.data.data;
      })
      .catch(err => {
        console.log(err);
        //判断有没有登陆
        if (err.response.data.code == 0) {
          this.$router.push({ path: "/" });
        }
      });
  }
};
</script>

<style scoped>
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
.x_title {
  margin-left: 0.4rem;
}
.d_title {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  display: flex;
  padding-top: 0.3125rem;
  background-color: #0f70e0;
  margin-top: 0.3125rem;
}
.d_title div {
  font-weight: 500;
  font-size: 0.875rem;
  width: 35%;
  text-align: center;
  color: #fff;
  margin-left: 0.16rem;
}
.tips {
  width: 100%;
  height: 1.89rem;
  line-height: 1.89rem;
  text-align: center;
  font-size: 0.875rem;
  color: #0f70e0;
}
.c_data {
  width: 95%;
  margin: 0 auto;
  height: 2.5rem;
  line-height: 2.5rem;
  background-color: #ffffff;
  display: flex;
}
.c_data div {
  width:25%;
  text-align: center;
  font-size: 0.8125rem;
}
.c_data div:last-child {
  color: #ff3333;
}
.btn {
  width: 95%;
  margin: 0 auto;
  margin-top: 0.625rem;
  height: 3.125rem;
}
.van-button {
  width: 100%;
  height: 2.5rem;
}
</style>
