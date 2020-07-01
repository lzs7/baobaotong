<template>
  <!-- 委托大厅（大家保险） -->
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar left-text="委托大厅" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- <div class="daohang">
		<div style="display: flex;">
		  <router-link to="/">
			<div class="fanhui-img">
			  <img src="../assets/guanbi.png" alt />
			</div>
		  </router-link>
		  <div class="dating">委托大厅</div>
	  </div>
      <div class="img-Right">
        <img src="../assets/elipsis.png" alt />
      </div>
    </div>-->

    <div class="ngb">
      <van-tabs
        v-model="activeName"
        color="#0066FF"
        title-active-color="#0066FF"
        background="#f9f3f3"
        sticky
        offset-top="40"
      >
        <van-tab title="待办委托" name="a">
          <!-- <van-pull-refresh
			      v-model="isRefresh"
			      @refresh="onRefresh"
			      success-text="刷新成功"
				  animation-duration="500"
			      :error.sync="errRefresh"
          >-->
          <van-list
            v-model="isLoading"
            :finished="isFinished"
            finished-text="没有更多了"
            @load="onLoad"
            :error.sync="isError"
            :offset="offset"
            :immediate-check="false"
          >
            <div style="height:2.5rem;"></div>
            <van-empty description="暂无委托" v-show="count==0" />
            <div class="db_list" v-for="(item,index) in list" :key="index" v-show="count>0">
              <div class="db_title">
                <div>保费金额</div>
                <div>意向机构</div>
                <div>投保城市</div>
                <div>服务费用</div>
              </div>
              <van-divider />
              <div class="db_data">
                <div>¥{{item.entrustMoney}}</div>
                <div>{{item.insuranceCompanyName}}</div>
                <div>{{item.entrustAddress.split('/')[1]}}</div>
                <div>{{item.entrustServiceCharge!=''?item.entrustServiceCharge:"电话沟通"}}</div>
              </div>
              <div class="db_operation">
                <div>
                  <p>委托日期</p>
                  <p>{{item.entrustStartTime.substring(0,10)}}</p>
                </div>
                <div>
                  <p>委托进度</p>
                  <p>{{item.entrustState==0?(item.number>0?"待确认委托人":"无意向人"):item.entrustState==1?"进行中":item.entrustState==2?"待确认完成":item.entrustState==3?"待确认还单":""}}</p>
                </div>
                <div>
                  <!-- <router-link :to="{name:'Agent_details',query:{id:item.entrustId,entrustmoney:item.entrustMoney,entruststartTime:item.entrustStartTime}}"> -->
                  <div class="btn_detl" @click="todetail(item)">查看详情</div>
                  <a class="chexiao" @click="chexiao(item)">撤销委托</a>
                  <!-- </router-link> -->
                </div>
              </div>
            </div>
          </van-list>
          <!-- </van-pull-refresh> -->
        </van-tab>
        <van-tab title="历史委托" name="b">
          <div style="height:2.4rem;"></div>
          <div>
            <Historical></Historical>
          </div>
        </van-tab>
        <van-tab title="发布委托" name="c">
          <div style="height:2.1rem;"></div>
          <div class="release">
            <Release></Release>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Release from "../Subcomponent/Release.vue";
import Historical from "../Subcomponent/Historical.vue";
export default {
  inject: ["reload"],
  data() {
    return {
      activeName: "a",
      sid: 0,
      stat: [],

      // 是否正在加载中
      isLoading: false,
      // 是否加载已完成
      isFinished: false,
      // 是否加载出错
      isError: false,
      // 数据源
      list: [],
      // 当前页
      currentPage: "",
      // 一页有多少条
      pageSize: 5,
      // 总页数
      totalPage: "",
      total: "",
      // 滚动条距离底部多少像素触发加载更多
      offset: 100,
      // 是否正处于刷新状态
      isRefresh: false,
      // 刷新是否失败
      errRefresh: false,
      userId: "",
      count: ""
    };
  },
  components: {
    Release,
    Historical
  },
  methods: {
    // 加载更多
    onLoad() {
      // 无网络直接请求失败
      if (!navigator.onLine) {
        this.isError = true;
        return;
      }
      setTimeout(() => {
        let cookie1 = this.common.getCookie();
        let userId = cookie1.replace(/\"/g, "").split("#")[0];
        this.isLoading = false;
        this.getData
          .hall({
            params: {
              index: this.currentPage + 1,
              userId: userId
            }
          })
          .then(res => {
            this.currentPage = res.data.index;
            this.list = res.data.data;

            if (res.data.data.length >= this.total) {
              this.isFinished = true;
            }
            if (res.data.data.length === 0) {
              // 数据返回为空，表示没有数据了
              this.isLoading = false;
              this.isFinished = true;
            }
            if (this.totalPage >= res.data.index) {
              this.currentPage = res.data.index + 1;
              this.list = this.list.concat(res.data.data);
              this.isLoading = false;
            }
          })
          .catch(() => {
            this.isError = true;
          });
      }, 1000);
    },
    // onRefresh() {
    //       if (!navigator.onLine) {
    //         this.errRefresh = true;
    //         return;
    //       }

    //       // 初始化当前页数

    //    setTimeout(() => {
    // 	   this.currentPage = 1;
    // 	   this.getData.hall({params:{
    // 			index: this.currentPage,
    // 			userId:this.userId
    // 			 }})
    // 		 .then(res => {
    // 		   //  记录总页数
    // 		   this.totalPage = res.pageCount;
    // 		   // 只获取第一页数据
    // 		   this.list = res.data.data;
    // 		   this.currentPage++;
    // 		   this.isRefresh = false;
    // 		   console.log(this.list);
    // 		 });
    // 	},500)

    //     },

    todetail(data) {
      if (data.entrustState === 2 || data.entrustState === 1) {
        this.$router.push({
          path: "/Confirm/",
          query: {
            entrustId: data.entrustId,
            entrustmoney: data.entrustMoney,
            entruststartTime: data.entrustStartTime,
            entruststate: data.entrustState,
            licensePlateNumber: data.licensePlateNumber
          }
        });
      } else if (data.entrustState === 3) {
        this.$router.push({
          path: "/Details/",
          query: {
            entrustId: data.entrustId,
            entrustmoney: data.entrustMoney,
            entruststartTime: data.entrustStartTime,
            entruststate: data.entrustState,
            licensePlateNumber: data.licensePlateNumber,
            entrustReturnMoney: data.entrustReturnMoney
          }
        });
      } else if (data.entrustState == 0 || data.number > 0) {
        this.$router.push({
          path: "/Agent_details",
          query: {
            entrustId: data.entrustId,
            entrustmoney: data.entrustMoney,
            entruststartTime: data.entrustStartTime,
            entruststate: data.entrustState,
            licensePlateNumber: data.licensePlateNumber
          }
        });
      }
    },
    chexiao(list) {
      let cookie1 = this.common.getCookie();
      let userId = cookie1.replace(/\"/g, "").split("#")[0];
      let entrustId = list.entrustId;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认撤销？"
        })
        .then(() => {
          this.getData
            .revoke({
              params: {
                entrustId: entrustId,
                userId: userId
              }
            })
            .then(res => {
              console.log(res);
              this.$dialog
              .alert({
                title: "提示",
                message: "撤销成功"
              })
              .then(() => {
                // on close
                this.reload();
              });
            })
            .catch(err => {});
        })
        .catch(() => {
          // on cancel
        });
    },
    onClickLeft() {
      //返回按钮
      this.$router.push({ path: "/index" });
    }
  },

  mounted() {
    let cookie1 = this.common.getCookie();
    let userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .hall({
        params: {
          //获取首页数据
          index: this.currentPage,
          userId: userId
        }
      })
      .then(res => {
        this.count = res.data.count;
        this.list = res.data.data;
        this.currentPage = res.data.index;
        this.pageSize = res.data.size;
        this.total = res.data.count;
        this.totalPage = res.data.pageCount;
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
.page {
  background-color: #f9f3f3;
  min-height: 100vh;
}
.van-pull-refresh {
  min-height: calc(100vh - 46px) !important;
}
.db_list {
  width: 95%;
  height: 10.3rem;
  margin: 0 auto;
  margin-top: 0.625rem;
  background-color: #ffffff;
  border-radius: 0.625rem;
}
.db_title {
  width: 100%;
  display: flex;
  padding-top: 0.3125rem;
}
.db_title div {
  font-weight: 500;
  font-size: 0.875rem;
  width: 7.125rem;
  text-align: center;
}
.db_data {
  width: 100%;
  display: flex;
}
.db_data div {
  font-size: 0.875rem;
  width: 7.125rem;
  text-align: center;
  color: #999999;
}
.db_operation {
  width: 100%;
  height: 5rem;
  display: flex;
  background-color: #0f70e0;
  margin-top: 0.625rem;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
}
.db_operation div {
  color: #ffffff;
  padding-top: 0.9375rem;
  margin-left: 0.9375rem;
  font-size: 0.8125rem;
}
.db_operation div p:nth-child(2) {
  margin-top: 0.625rem;
}
.db_operation div:nth-child(2) {
  width: 6.25rem;
}
.db_operation div:last-child {
  margin-left: 0.1rem;
  display: flex;
}
.datign {
  margin-left: 0.4rem;
}
.btn_detl {
  color: #323233 !important;
  background-color: #fff;
  border: 0.0625rem solid #ebedf0;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 2.75rem;
  margin: 0;
  line-height: 0.625rem;
  text-align: center !important;
  border-radius: 0.125rem;
  cursor: pointer;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  width: 4.5rem !important;
  margin-left: 0.3rem !important;
}
.chexiao {
  color: #323233 !important;
  background-color: #fff;
  border: 0.0625rem solid #ebedf0;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 2.75rem;
  margin: 0;
  line-height: 2.625rem;
  text-align: center;
  border-radius: 0.125rem;
  cursor: pointer;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  width: 4.5rem !important;
  margin-left: 0.3rem !important;
}
/* .ngb{margin-top: 3.25rem;} */
</style>
