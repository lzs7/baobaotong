<template>
  <!-- 本网客户子组件 -->
  <div class="other">
    <div class="p_customers">
      <div>姓名</div>
      <div>电话</div>
      <div>保单公司</div>
      <div>操作</div>
    </div>
    <van-empty description="没有客户" v-show="count==0" />
    <div class="customers" v-for="(item,index) in cusTmoer" :key="index">
      <div>{{item.clientName}}</div>
      <div>{{item.clientWay}}</div>
      <div>{{item.insuranceCompanyName}}</div>
      <div>
        <van-button type="primary" size="small" color="#0f70e0" @click="xiangqing(item)">详细信息</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String
  },
  data() {
    return {
      typeId: "",
      cusTmoer: [],
      count: ""
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
    }
  },
  mounted() {
    this.typeId = this.$parent.name; //获取父组件标签的值 转换为typeId
    var cookie1 = this.common.getCookie();
    var userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .customer({
        params: {
          //查询客户
          userId: userId,
          typeId: this.typeId
        }
      })
      .then(res => {
        this.count = res.data.count; //获取count判断页面有无数据
        this.cusTmoer = res.data.data;
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
  width: 7.125rem;
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
  width: 7.125rem;
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