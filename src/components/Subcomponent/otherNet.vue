<template>
  <!-- 续保客户 -->
  <div class="other">
    <div class="p_customers">
      <div>姓名</div>
      <div>电话</div>
      <div>保单公司</div>
      <div>操作</div>
    </div>
    <van-empty description="没有客户" v-show="count==0" />
    <van-swipe-cell :before-close="beforeClose">
      <div class="customers" v-for="(item,index) in othernet" :key="index">
        <div>{{item.clientName}}</div>
        <div>{{item.clientWay}}</div>
        <div>{{item.insuranceCompanyName}}</div>
        <div>
          <van-button type="primary" size="small" color="#0f70e0" @click="xiangqing(item)">详细信息</van-button>
        </div>
      </div>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  props: {
    name: String
  },
  data() {
    return {
      typeId: "",
      othernet: [],
      count: "",
      clientId: "",
      userId: ""
    };
  },

  methods: {
    xiangqing(id) {
      //跳转传递clientid
      let clientId = id.clientId;
      this.$router.push({
        path: "/Customer_details/",
        query: {
          clientId: clientId
        }
      });
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case "right":
          this.$dialog
            .confirm({
              message: "确定删除吗？"
            })
            .then(() => {
              let clientId = 0;
              this.othernet.forEach((item, index, arr) => {
                clientId = arr[0].clientId;
                console.log(clientId);
              });
              this.clientId = clientId;
              console.log(this.clientId);
              this.getData
                .deleteCustomer({
                  params: {
                    userId: this.userId,
                    ClientId: this.clientId
                  }
                })
                .then(res => {
                  this.$dialog
                    .alert({
                      message: "删除成功"
                    })
                    .then(() => {
                      this.reload();
                    });
                })
                .catch(err => {});
              instance.close();
            });
          break;
      }
    }
  },
  mounted() {
    this.typeId = this.$parent.name; //获取父组件标签的值 转换为typeId
    let cookie1 = this.common.getCookie();
    this.userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .customer({
        params: {
          //查询客户
          userId: this.userId,
          typeId: this.typeId
        }
      })
      .then(res => {
        this.count = res.data.count;
        this.othernet = res.data.data;
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
.p_customers {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  display: flex;
  padding-top: 0.3125rem;
  background-color: #0f70e0;
  margin-top: 0.3125rem;
}
.p_customers div {
  font-weight: 500;
  font-size: 0.8125rem;
  width:25%;
  text-align: center;
  color: #fff;
  margin-left: 0.16rem;
}
.customers {
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  display: flex;
  background-color: #ffffff;
  margin-top: 0.3rem;
}
.customers div {
  font-size: 0.75rem;
  width: 25%;
  color: #999999;
  text-align: center;
}
.other {
  width: 96%;
  margin: 0 auto;
}
.van-button__content {
  width: 100% !important;
  color: #fff !important;
}
</style>