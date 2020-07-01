<template>
  <!-- 委托大厅（其它保险） -->
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar left-text="委托大厅" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- 标签栏 -->
    <div>
      <van-tabs
        v-model="active"
        color="#0066FF"
        title-active-color="#0066FF"
        background="#f9f3f3"
        sticky
        offset-top="40"
      >
        <van-tab title="所有委托">
          <div style="height:2.4rem;"></div>
          <!-- <div v-show="count==0" class="wu">
					<div><img src="../../assets/img/kong.png" alt=""></div>
          </div>-->
          <van-empty description="暂无委托" v-show="count==0" />
          <div class="other" v-show="count>0">
            <div class="o_title">
              <div>发布时间</div>
              <div>车牌号码</div>
              <div>委托保费</div>
              <div>期望服务费</div>
              <div>操作</div>
            </div>
            <div class="o_display" v-for="(item,index) in list" :key="index">
              <div>{{item.entrustStartTime.substring(0,10)}}</div>
              <!-- <div>{{item.licensePlateNumber.}}</div> -->
              <div>{{item.licensePlateNumber.substring(0,4)}}***</div>
              <div>{{item.entrustMoney}}</div>
              <div>{{item.entrustServiceCharge!=''?item.entrustServiceCharge:"电话沟通"}}</div>
              <!-- <div class="bb">
                <van-button type="primary" size="small" color="#0f70e0" @click="jiedan(item)">确认意向</van-button>
                
              </div>-->
              <div class="btnn" @click="jiedan(item)">确认意向</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="历史委托">
          <div style="height:2.4rem;"></div>
          <heistori></heistori>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import heistori from "../Subcomponent/heistori.vue";
export default {
  data() {
    return {
      active: 2,
      count: "",
      list: [],
      userId: ""
    };
  },
  components: {
    heistori
  },
  methods: {
    onClickLeft() {
      //返回按钮
      this.$router.push({ path: "/index" });
    },
    jiedan(index) {
      this.getData
        .yixiang({
          params: {
            entrustId: index.entrustId,
            userId: this.userId
          }
        })
        .then(res => {
          //将表单数据提交
          let message = res.data.message;

          if (res.data.code == 200) {
            this.$toast("确认成功,等待审核");
            this.$router.push({ path: "/weituo_Details" });
          } else {
            this.$toast(message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    let cookie1 = this.common.getCookie();
    let insuranceCompanyId = cookie1.replace(/\"/g, "").split("#")[1]; //去掉引号
    this.userId = cookie1.replace(/\"/g, "").split("#")[0];

    this.getData
      .other({
        params: {
          //获取首页数据（其他保险）
          userId: this.userId,
          insuranceCompanyId: insuranceCompanyId
        }
      })
      .then(res => {
        this.count = res.data.count;
        this.list = res.data.data;
        console.log(this.list);
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
text {
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
.van-pull-refresh {
  min-height: calc(100vh - 46px) !important;
}
.other {
  width: 96%;
  margin: 0 auto;
}
.o_title {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  display: flex;
  padding-top: 0.3125rem;
  background-color: #0f70e0;
  margin-top: 0.3125rem;
}
.o_title div {
  font-weight: 500;
  font-size: 0.8125rem;
  width: 8.125rem;
  text-align: center;
  color: #fff;
  margin-left: 0.16rem;
}
.o_title div:first-child {
  width: 8.5rem;
}
.o_title div:nth-child(2) {
  width: 8.5rem;
}
.o_display {
  width: 100%;
  height: 2.4rem;
  line-height: 2rem;
  display: flex;
  background-color: #ffffff;
  padding-top: 0.3125rem;
  margin-top: 0.3125rem;
}
.o_display div {
  font-weight: 500;
  font-size: 0.75rem;
  width: 7.125rem;
  text-align: center;
  color: #999999;
  margin-left: 0.16rem;
}
.o_display div:nth-child(2) {
  width: 8.5rem;
}
/* .van-button {
		width:3rem!important;
	} */
.van-button__content {
  margin-right: 0.16rem;
  width: 100% !important;
  color: #fff !important;
  font-size: 1rem !important;
}
.van-button {
  background-color: rgb(15, 112, 224);
}
/* .bb{
  !important;
  width:10%!
} */
</style>
