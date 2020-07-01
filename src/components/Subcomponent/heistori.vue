<template>
  <!-- 其它保险历史记录 -->
  <!-- 历史委托子组件-->
  <div class="H_list">
    <div class="H_title">
      <div>完成时间</div>
      <div>车牌号码</div>
      <div>委托保费</div>
      <div>还单保费</div>
    </div>
    <van-empty description="暂无委托" v-show="code==400" />
    <!--手风琴组件-->
    <div class="hello" v-for="(item,index) in list" :key="index">
      <div class="H_data">
        <div>{{item.entrustEndTime.substring(0,10)}}</div>
        <!--{{item.entrustGradeTime.substring(0,10)}}-->
        <div>{{item.licensePlateNumber}}</div>
        <div>{{item.entrustMoney}}</div>
        <div>{{item.entrustReturnMoney}}</div>
      </div>
      <div @click="toggle(item.entrustId)" class="H_detailed">还单明细</div>
      <div v-show="show===item.entrustId" class="H_order">
        <div class="order_title">
          <div>还单时间</div>
          <div>车牌号码</div>
          <div>还单保费</div>
          <div>还单代理人</div>
        </div>
        <div class="order_data" v-for="(item,index) in getorder" :key="index">
          <div>{{item.entrustGradeTime.substring(0,10)}}</div>
          <div>{{item.deliveryOrderNumber}}</div>
          <div>¥{{item.deliveryOrderMoney}}</div>
          <div>{{item.userName}}</div>
        </div>
      </div>
    </div>
    <!-- ******** -->
    <!-- <div class="hello">
					<div class="H_data">
						<div>2020/4/20</div>
						<div>湘A·88888</div>
						<div>2500</div>
						<div>1250</div>
					</div>
				<div @click="toggle(2)" class="H_detailed">还单明细</div>
				      <div v-show="show===2" class="H_order">
				        <div class="order_title">
				        	<div>还单时间</div>
				        	<div>车牌号码</div>
				        	<div>还单保费</div>
				        	<div>还单代理人</div>
				        </div>
								  <div class="order_data">
								  	<div>2020/4/21</div>
								  	<div>湘A·88988</div>
								  	<div>750</div>
								  	<div>张三</div>
								  </div>
								  <div class="order_data">
								  	<div>2020/4/21</div>
								  	<div>湘A·88988</div>
								  	<div>750</div>
								  	<div>张三</div>
								  </div>
				      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      show: "",
      list: [],
      userId: "",
      entrustId: "",
      getorder: "",
      code: ""
    };
  },
  methods: {
    toggle: function(index) {
      //手风琴
      if (this.show === index) {
        this.show = 0;
      } else {
        this.show = index;
      }
      this.getData
        .getorder({
          params: {
            userId: this.userId,
            entrustId: index
          }
        })
        .then(res => {
          //通过点击发送ajax请求查询还单信息
          this.getorder = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    let _this = this;
    let cookie1 = this.common.getCookie();
    _this.userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .record({
        params: {
          //查询还单信息
          userId: _this.userId
        }
      })
      .then(res => {
        _this.code = res.data.code;
        _this.list = res.data.data;
        // _this.entrustId=_this.list[0].entrustId
        // console.log(_this.entrustId)
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
.H_list {
  width: 95%;
  margin: 0 auto;
  margin-top: 0.625rem;
}
.H_title {
  width: 100%;
  display: flex;
  padding-top: 0.3125rem;
  text-align: center;
  background-color: #0f70e0;
}
.H_title div {
  font-weight: 500;
  font-size: 0.875rem;
  width: 25%;
  height: 2.3rem;
  line-height: 2.3rem;
  text-align: center;
  color: #ffffff;
}
.e-popup {
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}

.e-popup-container {
  position: absolute;
  z-index: 1002;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 30vh);
  background-color: #fff;
}

.e-accordion-box {
  overflow: hidden;
  height: 0;
  box-sizing: border-box;
  transition: all 0.3s;
}

.e-accordion-title {
  background-color: #000;
  color: #fff;
}

.H_data {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  margin-top: 0.3125rem;
  display: flex;
  background-color: #ffffff;
}
.H_data div {
  font-size: 0.875rem;
  width: 25%;
  text-align: center;
  color: #999999;
  background-color: #ffffff;
}
.H_detailed {
  width: 100%;
  height: 1.875rem;
  line-height: 1.875rem;
  text-align: center;
  font-size: 0.75rem;
  color: #0f70e0;
  background-color: #ffffff;
  margin-top: 0.0625rem;
}
.H_order {
  background-color: #ffffff;
  margin-bottom: 0.625rem;
}
.order_title {
  width: 100%;
  line-height: 3.125rem;
  display: flex;
  background-color: #aaaaaa;
}
.order_title div {
  font-size: 0.875rem;
  width: 25%;
  text-align: center;
}
.order_data {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  margin-top: 0.1rem;
  display: flex;
  background: #c0c0c0;
  border-bottom: 0.0625rem solid #c8c9cc;
}
.order_data div {
  font-size: 0.875rem;
  width: 25%;
  text-align: center;
  color: #666666;
}
.order_data:last-child {
  border: none;
}
</style>
