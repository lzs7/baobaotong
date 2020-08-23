<template>
  <div>
      <!-- 总台帐 -->
    <van-row
      type="flex"
      justify="center"
      style="height:2.5rem;line-height:2.5rem;text-align:center;border-bottom:0.0625rem solid 	#DDDDDD"
    >
      <van-col span="9" class="ziti">今日交强总台帐</van-col>
      <van-col span="8" class="ziti">650</van-col>
      <van-col span="8" class="ziti">10%</van-col>
    </van-row>
    <van-row
      type="flex"
      justify="center"
      style="height:2.5rem;line-height:2.5rem;text-align:center;border-bottom:0.0625rem solid 	#DDDDDD"
    >
      <van-col span="9" class="ziti">今日商业总台帐</van-col>
      <van-col span="8" class="ziti">650</van-col>
      <van-col span="8" class="ziti">10%</van-col>
    </van-row>
    <van-row
      type="flex"
      justify="center"
      style="height:2.5rem;line-height:2.5rem;text-align:center;border-bottom:0.0625rem solid 	#DDDDDD"
    >
      <van-col span="9" class="ziti">本月交强总台帐</van-col>
      <van-col span="8" class="ziti">650</van-col>
      <van-col span="8" class="ziti">10%</van-col>
    </van-row>
    <van-row
      type="flex"
      justify="center"
      style="height:2.5rem;line-height:2.5rem;text-align:center;border-bottom:0.0625rem solid 	#DDDDDD"
    >
      <van-col span="9" class="ziti">本月商业总台帐</van-col>
      <van-col span="8" class="ziti">650</van-col>
      <van-col span="8" class="ziti">10%</van-col>
    </van-row>
    <!-- 下拉选择 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value" :options="option1" />
    </van-dropdown-menu>
    <div>77</div>
    
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0,
      option1: [
        { text: "7月份商业险", value: 0 },
        { text: "8月份商业险", value: 1 },
      ],
    };
  },
};
</script>
<style scoped>
.ziti {
  font-size: 0.8125rem;
}
</style>