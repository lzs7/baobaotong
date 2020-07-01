<template>
  <!-- 历史委托子组件-->
  <div>
    <van-empty description="暂无委托" v-show="code==400" />
    <div class="H_list" v-show="code==200">
      <div class="H_title">
        <div>完成时间</div>
        <div>车牌号码</div>
        <div>委托保费</div>
        <div>还单保费</div>
      </div>
      <!--手风琴组件-->
      <div class="hello" v-for="(item,index) in list" :key="index">
        <div class="H_data">
          <div>{{item.entrustGradeTime.substring(0,10)}}</div>
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
          <div class="order_data" v-for="(itm,index) in still" :key="index">
            <div>{{itm.entrustGradeTime.substring(0,10)}}</div>

            <div>{{itm.deliveryOrderNumber}}</div>
            <div>{{itm.deliveryOrderMoney}}</div>
            <div>{{itm.userName}}</div>
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
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      show: "",
      list: [],
      entrustId: "",
      still: [],
      userId: "",
      code: ""
    };
  },
  methods: {
    toggle: function(index) {
      if (this.show === index) {
        this.show = 0;
      } else {
        this.show = index;
      }

      this.getData
        .still({
          params: {
            userId: this.userId,
            entrustId: index
          }
        })
        .then(res => {
          //通过点击发送ajax请求查询还单信息
          this.still = res.data.data;
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
      .dhistory({
        params: {
          userId: _this.userId
        }
      })
      .then(res => {
        _this.list = res.data.data;
        // this.entrustId=aggregate.entrustId;
        _this.code = res.data.code;
        if (_this.code != 400) {
          _this.entrustId = _this.list.entrustId;
        }
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
.H_list {
  width: 95%;
  height: 10.7rem;
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
  width: 7.125rem;
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
  width: 7.125rem;
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
  width: 7.125rem;
  text-align: center;
}
.order_data {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  margin-top: 0.3125rem;
  display: flex;
  background-color: #c0c0c0;
  border-bottom: 0.0625rem solid #c8c9cc;
}
.order_data div {
  font-size: 0.875rem;
  width: 7.125rem;
  text-align: center;
  color: #666666;
}
.order_data:last-child {
  border: none;
}
.wu {
  width: 100%;
  position: relative;
  margin: 0 auto;
}
.wu div {
  width: 15.625rem;
  height: 15.625rem;
  position: absolute;
  top: 50%;
  left: 17%;
}
</style>
