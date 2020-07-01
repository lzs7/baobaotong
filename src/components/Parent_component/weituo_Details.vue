<template>
  <!-- 其他保险详情 -->
  <div class="page">
    <!-- 导航 -->

    <van-nav-bar left-text="委托详情" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <div style="height:2.4rem;"></div>
    <!-- 标题 -->
    <div class="xq_title">
      <div>{{list.licensePlateNumber}}</div>
      <div>{{list.entrustBusiness==1?"投保商业车损险":"不投商业车损险"}}</div>
      <div>{{list.userPhone}}</div>
    </div>
    <div class="xq">
      <div class="xq_list">
        <div>保费金额</div>
        <div>服务费</div>
        <div>委托状态</div>
        <div>等待时长</div>
        <div>操作</div>
      </div>
      <div class="xq_display">
        <div>¥{{list.entrustMoney}}</div>
        <div>¥{{list.entrustReturnMoney}}</div>
        <div>{{list.entrustState==0?"待确认":""}}</div>
        <div>3分钟</div>
        <!-- <div>
          <van-button
            type="primary"
            size="small"
            color="#0f70e0"
            @click="cancel(list.entrustId)"
          >取消订单</van-button>

        </div>-->
        <div class="btnn" @click="cancel(list.entrustId)">取消订单</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      list: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/index" });
    },
    cancel(id) {
      this.getData
        .cancel({
          params: {
            //取消订单
            userId: this.userId,
            entrustId: id
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$dialog
              .alert({
                message: "取消成功"
              })
              .then(() => {
                // on close
                this.$router.push({ path: "/Commission_T" });
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    let cookie1 = this.common.getCookie();
    this.userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .orderMessage({
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        this.list = res.data.data;
        console.log(this.list);
        if (this.list == null) {
          this.$router.push({ path: "/index" });
        }
      })
      .catch(err => {
        console.log(err);
        if (res.data.code == 0) {
          //判断有没有登陆
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
  width: 9.125rem;
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
  background-color: #aaaaaa;
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
.van-button__content {
  margin-right: 0.16rem;
  width: 100% !important;
  color: #fff !important;
}
.van-button {
  background-color: rgb(15, 112, 224);
}
</style>
