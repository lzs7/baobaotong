<template>
  <div class="admin">
    <!-- 导航栏 -->
    <van-nav-bar left-text="返回" title="管理员" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <div style="height:3.2rem;"></div>
    <van-tabs type="line" sticky offset-top="40">
      <van-tab title="总台帐">
        <div class="admin_nei">
          <genera></genera>
        </div>
      </van-tab>
      <van-tab title="个人台账">
          <div class="admin_nei">
          <personal></personal>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import genera from '../Subcomponent/GeneralLedger'
import personal from '../Subcomponent/personal'
export default {
  data() {
    return {
      active: 1,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/login" });
    },
  },
  components:{
      genera,
      personal
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
.admin {
  background-color: #f9f3f3;
  min-height: 100vh;
}
.admin_nei {
  width: 98%;
  margin: 0 auto;
<<<<<<< HEAD
  background: #ffffff15;
=======
  background: #ffffff;
>>>>>>> cd12dae82dbc18f963e985d7e2d5c0154d7e427b
  margin-top:0.3125rem
}
</style>