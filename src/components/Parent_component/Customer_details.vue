<template>
  <!--客户详情 -->
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar left-text="客户详情" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <div style="height:2.4rem;"></div>

    <div class="neirong">
      <van-cell-group>
        <van-cell title="姓名" :value="list.clientName" />
        <van-cell title="联系方式" :value="list.clientWay" />
        <van-cell title="车牌号码" :value="list.clientLicenseNumber" />
        <van-cell title="身份证号码" :value="list.clientIdentityCard" />
        <van-cell title="投保公司" :value="list.insuranceCompanyName" />
        <van-cell title="投保城市" :value="list.clientAddress" />
        <van-cell title="到保时间" :value="list.clientExpirationTime" />
        <van-cell title="行驶证" :value="list.clientDrivingLicense" />
        <van-cell title="车型" :value="list.clientType" />
        <van-cell title="备注" :value="list.clientRemark==''?'无':''" />
        <van-cell title="客户类型" :value="list.typeId==1?'准客户':'续保客户' " />
      </van-cell-group>

      <button @click="eidt">编辑资料</button>
    </div>
    <!-- <div v-show="!isshow"  >
     <modify></modify>
    </div>-->
    <van-popup v-model="show" :style="{ height: '94%',width:'93%' }" closeable>
      <div class="xiugai">
        <modify></modify>
      </div>
    </van-popup>
    <!-- <div class="bj">
      <button @click="eidt">编辑资料</button>
    </div>-->
  </div>
</template>

<script>
import modify from "../Subcomponent/modify.vue";
export default {
  data() {
    return {
      clientId: "",
      list: [],
      // isshow: true,
      show: false
    };
  },
  components: {
    modify
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/Customer" });
    },
    eidt() {
      this.show = true;
    }
  },
  mounted() {
    this.clientId = this.$route.query.clientId; //获取传过来的id
    let cookie1 = this.common.getCookie();
    let userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .xinxi({
        params: {
          //查询客户信息
          clientId: this.clientId,
          userId: userId
        }
      })
      .then(res => {
        console.log(res.data);
        this.list = res.data.data;
        console.log(this.list);
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
.neirong {
  width: 98%;
  margin: 0 auto;
  margin-top: 0.625rem;
  background-color: #ffffff;
}

.neirong button {
  width: 80%;
  height: 3rem;
  margin-top: 7%;
  margin-left: 10%;
  background-color: #07c160;
  border: 1px solid #07c160;
  color: #ffffff;
  border-radius: 0.4rem;
}
.xiugai {
  margin-top: 1.5rem;
}
</style>
