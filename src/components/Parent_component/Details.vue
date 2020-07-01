<template>
  <!-- 待确认还单页面 -->
  <div class="page">
    <!-- 导航栏 -->
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
    <div class="b_list">
      <div class="b_title">
        <div>还单车牌</div>
        <div>还单保费</div>
        <div>委托进度</div>
        <div>操作</div>
      </div>
      <div class="b_data" v-for="(item,index) in huandan" :key="index">
        <div>{{item.deliveryOrderNumber}}</div>
        <div>¥{{item.deliveryOrderMoney}}</div>
        <div class="ss">{{item.deliveryOrderState==0?"待处理":item.deliveryOrderState==1?"已完成":"已驳回"}}</div>
        <div v-show="item.deliveryOrderState==0" class="bttn">
          <van-button
            type="primary"
            size="mini"
            color="#0066ff"
            @click.native="queren(item,index)"
          >确认接单</van-button>
          <van-button type="primary" size="mini" color="#0066ff" @click="bohui(item)">无效驳回</van-button>
        </div>
        <div v-show="item.deliveryOrderState>0" class="bttn"></div>
      </div>
      <!-- *** -->
      <!-- <div class="b_data">
        <div>湘A·98981</div>
        <div>1250</div>
        <div>已完成</div>
        <div>
          <van-button type="primary" size="small" color="#0066ff">确认完成</van-button>
        </div>
      </div>-->
      <!-- **** -->
    </div>
    <div class="bot">
      <div class="titl">
        <div>应还单总额</div>
        <div>已完成还单金额</div>
      </div>
      <div class="dta">
        <div>¥{{entrustReturnMoney}}</div>
        <div>¥{{total}}</div>
      </div>
      <div class="btn1">
        <van-button type="primary" size="large" color="#0066ff" @click="achieve(total)">确认还单达标</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      huandan: [],
      total: 0, //总价
      entrustmoney: "", //接收传过来的保费
      entruststartTime: "", //接收传过来的时间
      licensePlateNumber: "", //车牌
      entrustReturnMoney: "", //应还金额
      entrustId: "",
      userId: "",
      entrustId: ""
    };
  },
  methods: {
    queren(item, index) {
      //点击确认接单按钮
      console.log(item, index);
      //    var list=i//定义一个变量获取i的值
      // var totalPrice = 0;//用于存储总价
      // totalPrice+=(Number)(list.deliveryOrderMoney);
      // this.total +=parseFloat(totalPrice)//返回
      this.$nextTick(() => {
        item.deliveryOrderState = 1; //修改状态为1 表示已通过
        this.getData
          .operation({
            params: {
              userId: this.userId,
              newEntrustId: this.entrustId,
              deliveryOrderState: item.deliveryOrderState,
              deliveryOrderId: item.deliveryOrderId
            }
          })
          .then(res => {
            if (res.data.code == 200) {
              let total = 0;
              this.huandan.map(item => {
                total += item.deliveryOrderMoney;
              });
              this.total = total;
              this.$toast({
                message: "审核成功",
                icon: "checked"
              });
              this.reload();
            } else {
              this.total = 0;
            }
          });
      });
    },
    //点击驳回按钮
    bohui(zhi) {
      this.$nextTick(() => {
        zhi.deliveryOrderState = 2; //修改状态为2 表示已驳回
        this.getData
          .operation({
            params: {
              userId: this.userId,
              newEntrustId: this.entrustId,
              deliveryOrderState: zhi.deliveryOrderState
            }
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$toast({
                message: "驳回成功",
                icon: "checked"
              });
              this.reload();
            } else {
              this.total = 0;
            }
          });
      });
    },
    achieve(a) {
      var zj = a;
      if (a >= this.entrustReturnMoney) {
        let cookie1 = this.common.getCookie();
        let userId = cookie1.replace(/\"/g, "").split("#")[0];
        this.getData
          .daconfirmentrust({
            params: {
              userId: userId,
              newEntrustId: this.entrustId
            }
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$router.push({ path: "/" });
            } else if (res.data.code == 200) {
              this.$dialog
                .alert({
                  title: "提示",
                  message: "交易完成"
                })
                .then(() => {
                  this.$router.push({ path: "/Commission_Hall" });
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$dialog
          .alert({
            message: "还单金额未达标"
          })
          .then(() => {
            // on close
          });
      }
    },
    onClickLeft() {
      this.$router.push({ path: "/Commission_Hall" });
    }
  },
  mounted() {
    //获取路由参数
    (this.entrustId = this.$route.query.entrustId),
      (this.entrustmoney = this.$route.query.entrustmoney),
      (this.entruststartTime = this.$route.query.entruststartTime);
    this.licensePlateNumber = this.$route.query.licensePlateNumber;
    this.entrustReturnMoney = this.$route.query.entrustReturnMoney;
    //查询还单
    let cookie1 = this.common.getCookie();
    this.userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .delivery({
        params: {
          userId: this.userId,
          entrustId: this.entrustId
        }
      })
      .then(res => {
        this.huandan = res.data.data;
        if (res.data.code == 200) {
          let total = 0;
          this.huandan.map(item => {
            if (item.deliveryOrderState == 1) {
              total += item.deliveryOrderMoney;
            }
          });
          this.total = total;
        } else {
          this.total = 0;
        }
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

<style>
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

.detalis {
  font-size: 0.95rem;
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
  width: 33%;
  text-align: center;
  color: #fff;
  margin-left: 0.16rem;
}
.b_title {
  width: 100%;
  line-height: 2.125rem;
  display: flex;
  background-color: #aaaaaa;
  margin-top: 0.625rem;
}
.b_title div {
  font-size: 0.875rem;
  width: 22%;
  text-align: center;
}
.b_title div:last-child {
  width: 31%;
  font-size: 0.875rem;
  text-align: center;
}
.b_list {
  width: 95%;
  margin: 0 auto;
  background-color: #ffffff;
}
.b_data {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  background-color: #ffffff;
  display: flex;
  border-bottom: 0.0625rem solid #e8e8e8;
}
.b_data div {
  width: 27%;
  text-align: center;
  color: #999999;
  font-size: 0.8125rem;
}
.b_data .ss {
  width: 26%;
  text-align: center;
  margin-left: 0.3125rem;
  color: #999999;
  font-size: 0.8125rem;
}
.b_data .bttn {
  width: 43%;
  color: #999999;
  font-size: 0.8125rem;
  text-align: center;
  margin-left: 0.3125rem;
}
.bot {
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
}
.titl {
  width: 100%;
  height: 1.875rem;
  line-height: 1.875rem;
  display: flex;
  margin-top: 0.625rem;
  border-bottom: 0.0625rem solid #e8e8e8;
}
.titl div {
  width: 50%;
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
}
.dta {
  width: 100%;
  height: 1.875rem;
  line-height: 1.875rem;
  display: flex;
  margin-top: 0.625rem;
}
.dta div {
  width: 50%;
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  color: #ff3333;
}
.btn1 {
  width: 100%;
  margin-top: 0.625rem;
}
.van-button__content {
  margin-right: 0.16rem;
  width: 100% !important;
  color: #fff !important;
}
.van-button {
  background-color: rgb(15, 112, 224);
}
</style>
