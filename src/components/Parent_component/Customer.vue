<template>
  <!-- 添加客户页面 -->
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar left-text="客户" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <div class="content">
      <van-tabs
        v-model="active"
        color="#0066FF"
        title-active-color="#0066FF"
        background="#f9f3f3"
        sticky
        offset-top="40"
        @click="onClick"
      >
        <van-tab title="准客户" name="1">
          <div style="height:2.4rem;"></div>
          <accurate v-bind:name="name"></accurate>
        </van-tab>
        <van-tab title="续保客户" name="2">
          <div style="height:2.4rem;"></div>
          <otherNet v-bind:name="name"></otherNet>
        </van-tab>
        <!-- <van-tab title="本网客户" name="3">
		<div style="height:2.4rem;"></div>
         <localNetwork v-bind:name="name"></localNetwork>
        </van-tab>-->
        <van-tab title="添加客户" name="4">
          <div style="height:2.4rem;"></div>
          <div class="c_form">
            <Add_customer></Add_customer>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Add_customer from "../Subcomponent/Add_customer.vue";
import accurate from "../Subcomponent/accurate";
import otherNet from "../Subcomponent/otherNet";
import localNetwork from "../Subcomponent/localNetwork";
export default {
  data() {
    return {
      active: 0,
      cusTmoer: [],
      name: ""
    };
  },
  components: {
    //子组件注册
    Add_customer,
    accurate,
    otherNet,
    localNetwork
  },
  methods: {
    onClick(name) {
      this.name = name;
    },
    onClickLeft() {
      this.$router.push({ path: "/index" });
    }
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

.content {
  margin-top: 0.4rem;
}
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
