<template>
  <!-- 还单页面 -->
  <div class="page">
    <!-- 导航 -->
    <van-nav-bar left-text="还单" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- 标题 -->
    <div style="height:2.4rem;"></div>
    <div class="xq_title">
      <div>{{list.licensePlateNumber}}</div>
      <div>{{list.entrustBusiness==1?"投保商业车损险":"不投商业车损险"}}</div>
      <div>{{list.userPhone}}</div>
    </div>
    <div class="xq">
      <div v-show="list.entrustState==1||list.entrustState==2">
        <div class="xq_list">
          <div>保费金额</div>
          <div>应还金额</div>
          <div>委托状态</div>
          <div>等待时长</div>
          <div>操作</div>
        </div>
        <div class="xq_display">
          <div>¥{{list.entrustMoney}}</div>
          <div>¥{{list.entrustReturnMoney}}</div>
          <div>{{list.entrustState==1?"进行中":list.entrustState==2?"待确认完成":"已完成"}}</div>
          <div>3分钟</div>
          <div class="btnn" @click="queren(list.entrustId)" v-show="list.entrustState==1">确认完成</div>
          <div class="btnn" v-show="list.entrustState==2">待确认</div>
        </div>
      </div>
      <div v-show="list.entrustState==3">
        <div class="xq_list">
          <div>保费金额</div>
          <div>应还金额</div>
          <div>委托状态</div>
          <div>已还金额</div>
          <div>操作</div>
        </div>
        <div class="xq_display">
          <div>¥{{list.entrustMoney}}</div>
          <div>¥{{list.entrustReturnMoney}}</div>
          <div>{{list.entrustState==1?"进行中":list.entrustState==2?"待确认完成":"已完成"}}</div>
          <div>¥{{total}}</div>
          <div class="btnn" @click="haundan()">申请还单</div>
        </div>
      </div>
    </div>
    <div class="record">
      <div>还单记录</div>
    </div>
    <div class="xq">
      <div class="xq_list hd">
        <div>还单车牌</div>
        <div>还单金额</div>
        <div>还单进度</div>
      </div>
      <div class="xq_display hd" v-for="(item,index) in huan" :key="index">
        <div>{{item.deliveryOrderNumber}}</div>
        <div>¥{{item.deliveryOrderMoney}}</div>
        <div>{{item.deliveryOrderState==0?"待处理":item.deliveryOrderState==1?"已完成":"已驳回"}}</div>
      </div>
    </div>
    <!-- 弹框 -->

    <van-action-sheet v-model="show" title="还单">
      <div class="tc">
        <van-form @submit="onSubmit">
          <van-field
            v-model="deliveryOrderNumber"
            name="deliveryOrderNumber"
            label="车牌号码"
            placeholder="车牌号码"
            :rules="[{ required: true, message: '请填写车牌号码' },
							{pattern:  /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/, message: '车牌号格式错误！'}
					]"
          />
          <van-field
            v-model="deliveryOrderMoney"
            name="deliveryOrderMoney"
            label="还单金额"
            placeholder="还单金额(元)"
            :rules="[{ required: true, message: '请填写还单金额' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      show: false,
      value: "",
      deliveryOrderNumber: "",
      deliveryOrderMoney: "",
      userId: "",
      list: [],
      huan: [],
      entrustId: "",
      total: "" //总和
    };
  },

  methods: {
    haundan() {
      this.show = true;
    },
    queren(entrustId) {
      this.getData
        .apply({
          params: {
            newUserId: this.userId,
            entrustId: entrustId,
            userId: this.list.userId,
            entrustReturnMoney: this.list.entrustReturnMoney
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$toast({
              message: "确认成功",
              icon: "checked"
            });
            this.reload();
          } else if (res.data.code == 0) {
            this.$router.push({ path: "/" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit(values) {
      //点击s将还单数据提交方法
      let returnorder = values;
      this.$set(returnorder, "newUserId", this.userId);
      values.deliveryOrderMoney = parseInt(values.deliveryOrderMoney);
      this.getData
        .returnOrder(returnorder)
        .then(res => {
          //将表单数据提交
          if (res.data.code == 200) {
            this.$toast({
              message: "提交成功,等待审核",
              icon: "checked"
            });
            this.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.push({ path: "/index" });
    }
  },
  mounted() {
    //查询订单信息
    let cookie1 = this.common.getCookie();
    this.userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .progress({
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        if (res.data.code == 400) {
          this.$router.push({ path: "/index" });
        }
        this.entrustId = res.data.data.entrustId;
        this.list = res.data.data;
        this.getData
          .orderXinxi({
            params: {
              //查询还单信息
              newUserId: this.userId,
              newEntrustId: this.entrustId
            }
          })
          .then(res => {
            this.huan = res.data.data;
            if (res.data.count > 0) {
              let total = 0;
              this.huan.map(item => {
                total += item.deliveryOrderMoney;
              });
              this.total = total;
            } else {
              this.total = 0;
            }
          });
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
.btnn {
  border: 0.02rem solid #0f70e0;
  height: 1.5rem;
  line-height: 1.5rem;
  margin-top: 0.45rem;
  background-color: #0f70e0;
  color: #ffffff !important;
}
.xq_title {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  display: flex;
  padding-top: 0.3125rem;
  background-color: #0f70e0;
  margin-top: 0.3125rem;
}
.xq_title div {
  font-weight: 500;
  font-size: 0.875rem;
  width: 7.125rem;
  text-align: center;
  color: #fff;
  margin-left: 0.16rem;
}
.xq {
  width: 96%;
  margin: 0 auto;
}
.xq_list {
  width: 100%;
  line-height: 2.125rem;
  display: flex;
  background-color: #cccccc;
  margin-top: 0.625rem;
}
.xq_list div {
  font-size: 0.875rem;
  width: 5rem;
  text-align: center;
}
.xq_display {
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  display: flex;
  background-color: #ffffff;
  margin-top: 0.3rem;
}
.xq_display div {
  font-size: 0.75rem;
  width: 5rem;
  color: #999999;
  text-align: center;
}

.record {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  display: flex;
  padding-top: 0.3125rem;
  background-color: #0f70e0;
  margin-top: 0.3125rem;
}
.record div {
  font-weight: 500;
  font-size: 0.875rem;
  width: 7.125rem;
  text-align: center;
  color: #fff;
  margin-left: 0.16rem;
  width: 50%;
  margin: 0 auto;
}
.hd div {
  width: 8.25rem;
}

.tc {
  margin-top: 1rem;
}
.r_Order {
  width: 4.25rem;
  margin: 0 auto;
  text-align: justify;
  margin-top: 0.625rem;
  font-size: 1.125rem;
}
</style>
