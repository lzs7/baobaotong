<template>
  <div class="page">
    <!-- 导航 -->
    <van-nav-bar left-text="详情" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- 内容列表 -->
    <div style="height:2.4rem;"></div>
    <!-- 标题 -->
    <div class="d_title">
      <div>{{licensePlateNumber}}</div>
      <div>¥{{entrustmoney}}</div>
      <div>{{entruststartTime.substring(0,10)}}</div>
    </div>
    <!-- 当code等于400显示空 -->
    <van-empty description="暂无意向人" v-show="code==400" />
    <div v-show="code===200">
      <div class="tips">请确认代理人</div>
      <!-- 数据展示 -->
      <div class="data_display">
        <div v-for="(item,index) in list" :key="index" class="data_list">
          <label class="bui-radios-label bui-radios-anim">
            <input ref="a" type="radio" name="sex" v-model="data" :value="item" />
            <i class="bui-radios"></i>
          </label>
          <div>{{item.userName}}</div>
          <div>{{item.userPhone}}</div>
          <div>{{item.insuranceCompanyName}}</div>
        </div>
        <div class="btn">
          <van-button type="info" @click="tijiao()">确认</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      data: "",
      entrustmoney: "", //接收传过来的保费
      entruststartTime: "", //接收传过来的时间
      entruststate: "", //当前订单状态
      code: "",
      entrustId: "", //订单id
      userId: "",
      licensePlateNumber: ""
    };
  },
  methods: {
    tijiao(val) {
      if (this.data === "") {
        this.$dialog
          .alert({
            title: "提示",
            message: "您未选择意向人"
          })
          .then(() => {});
      } else {
        // let agg={ //将需要传到后台的值
        // 		entrustId : this.data.entrustId,//委托id
        // 		finallyUserId : this.data.userId,//发布委托的人
        // 		friendName : this.data.userName,//接单人的姓名
        // 		friendPhone : this.data.userPhone,//接单人的电话
        // 		InsuranceCompanyName : this.data.insuranceCompanyName//接单人的保险公司名称
        // }
        //确认把单给意向人员
        let parma = new URLSearchParams();
        parma.append("userId", this.userId);
        parma.append("entrustId", this.data.entrustId);
        parma.append("finallyUserId", this.data.userId);
        parma.append("friendName", this.data.userName);
        parma.append("friendPhone", this.data.userPhone);
        parma.append("InsuranceCompanyName", this.data.insuranceCompanyName);
        this.getData
          .confirm(parma)
          .then(res => {
            if (res.data.code == 200) {
              this.$dialog
                .alert({
                  title: "提示",
                  message: "派单成功"
                })
                .then(() => {
                  // on close
                  this.$router.push({ path: "/Commission_Hall" });
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onClickLeft() {
      //返回按钮
      this.$router.push({ path: "/Commission_Hall" });
    }
  },

  mounted() {
    //获取路由参数
    (this.entrustmoney = this.$route.query.entrustmoney),
      (this.entruststartTime = this.$route.query.entruststartTime),
      (this.entruststate = this.$route.query.entruststate),
      (this.entrustId = this.$route.query.entrustId),
      (this.licensePlateNumber = this.$route.query.licensePlateNumber);
    // console.log(this.entrustmoney)
    //axios
    let cookie1 = this.common.getCookie();
    this.userId = cookie1.replace(/\"/g, "").split("#")[0]; //去掉引号
    this.getData
      .intention({
        params: {
          //获取当前页面数据
          entrustId: this.entrustId,
          userId: this.userId
        }
      })
      .then(res => {
        //console.log(res.data)
        this.list = res.data.data;
        this.code = res.data.code;
        // console.log(this.code)
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.code == 0) {
          //判断有没有登陆
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
  width: 7.125rem;
  text-align: center;
  color: #fff;
  margin-left: 0.16rem;
}
.tips {
  width: 100%;
  height: 1.89rem;
  line-height: 1.89rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #00bbff;
}
.data_display {
  width: 95%;
  margin: 0 auto;
}
.data_list {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  display: flex;
  margin-top: 0.1rem;
  background-color: #fff;
}
.data_list div {
  margin-left: 1.9rem;
  font-size: 0.8125rem;
}
.bui-radios-label {
  margin-left: 1rem;
}
label.bui-radios-label input {
  position: absolute;
  opacity: 0;
  visibility: hidden;
}

label.bui-radios-label .bui-radios {
  display: inline-block;
  position: relative;
  width: 13px;
  height: 13px;
  background: #ffffff;
  border: 1px solid #979797;
  border-radius: 50%;
  vertical-align: -2px;
}

label.bui-radios-label input:checked + .bui-radios:after {
  position: absolute;
  content: "";
  width: 7px;
  height: 7px;
  background-color: #fff;
  border-radius: 50%;
  top: 3px;
  left: 3px;
}

label.bui-radios-label input:checked + .bui-radios {
  background: #00bbff;
  border: 1px solid #00bbff;
}

label.bui-radios-label input:disabled + .bui-radios {
  background-color: #e8e8e8;
  border: solid 1px #979797;
}

label.bui-radios-label input:disabled:checked + .bui-radios:after {
  background-color: #c1c1c1;
}

label.bui-radios-label.bui-radios-anim .bui-radios {
  -webkit-transition: background-color ease-out 0.3s;
  transition: background-color ease-out 0.3s;
}
.btn {
  width: 100%;
  margin: 0 auto;
}
.van-button {
  width: 100%;
  margin-top: 0.35rem;
}
.x_title {
  margin-left: 0.4rem;
}
.wu {
  width: 100%;
  position: relative;
  margin: 0 auto;
}
.wu div {
  width: 15.625rem;
  height: 15.625rem;
  position: absolute;
  top: 50%;
  left: 17%;
}
</style>