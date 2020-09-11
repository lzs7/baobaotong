<template>
  <div class="rijie">
    <!-- 导航栏 -->
    <van-nav-bar left-text="日结" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <div style="height:3.2rem;"></div>
    <!-- 菜单 -->
    <van-tabs type="line" sticky offset-top="40">
      <van-tab title="台账记录">
        <div class="neirong">
          <div class="zongshu">
            <div style="margin-left:1rem;margin-top:0.1875rem">
              <div class="font">今日交强险费用(元)</div>
              <div class="feiyong">{{list.todayCompulsory}}</div>
            </div>
            <div style="margin-right:1rem;margin-top:0.1875rem">
              <div class="font">今日商业险费用(元)</div>
              <div class="feiyong">{{list.todayCommercial}}</div>
            </div>
          </div>
          <van-divider />
          <!-- 隐藏的组件 -->
          <collapse-transition>
            <div class="collapse-wrap" v-show="isActive">
              <!-- @slot default -->
              <!-- <slot>勇勇啊</slot> -->
              <div class="content1">
                <div style="margin-top:0.625rem">
                  <span>昨日交强费用(元)</span>
                  <span class="jiage">{{list.yesterdayCompulsory}}</span>
                </div>
                <div style="margin-top:0.625rem">
                  <span>昨日商业费用(元)</span>
                  <span class="jiage">{{list.yesterdayCommercial}}</span>
                </div>
                <div>
                  <span>本月交强费用(元)</span>
                  <span class="jiage">{{list.instantCompulsory}}</span>
                </div>
                <div>
                  <span>本月商业费用(元)</span>
                  <span class="jiage">{{list.instantCommercial}}</span>
                </div>
                <div>
                  <span>本年交强费用(年)</span>
                  <span class="jiage">{{list.yearCompulsory}}</span>
                </div>
                <div>
                  <span>本年商业费用(年)</span>
                  <span class="jiage">{{list.yearCommercial}}</span>
                </div>
              </div>
            </div>
          </collapse-transition>
          <div style="width:100%">
            <div @click="toggle($event)" class="collapse_btn">展开</div>
          </div>
          <van-divider />
          <!-- <div class="time">选择时间</div> -->
          <van-divider
            :style="{ color: '#000', borderColor: '#999', padding: '0.875rem 1rem' }"
          >选择时间</van-divider>
          <!-- 时间选择器 -->
          <div>
            <!-- 开始时间 输入框 -->
            <van-field
              v-model="timeDate.startTime"
              placeholder="开始时间"
              readonly
              label="开始时间"
              @click="showStartTime()"
            />
            <!-- 结束时间 输入框 -->
            <van-field
              v-model="timeDate.endTime"
              placeholder="结束时间"
              readonly
              label="结束时间"
              @click="showEndTime()"
            />
            <!-- 开始 弹出层 -->
            <van-popup v-model="showStart" position="bottom" :style="{ height: '40%' }">
              <van-datetime-picker
                v-model="startTime"
                type="date"
                :max-date="currentTime"
                @confirm="confirmStartFn()"
                @cancel="cancelFn()"
              />
            </van-popup>
            <!-- 结束 弹出层 -->
            <van-popup v-model="showEnd" position="bottom" :style="{ height: '40%' }">
              <van-datetime-picker
                v-model="endTime"
                type="date"
                :min-date="startTime"
                @confirm="confirmEndFn()"
                @cancel="cancelFn()"
              />
            </van-popup>
            <!-- 按钮 -->
            <van-button type="info" block @click="shaixuan(timeDate)">筛选</van-button>
          </div>
          <van-divider
            :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '1rem 1rem' }"
          >保单信息</van-divider>
          <div class="list">
            <div class="table_title">
              <div>车牌号</div>
              <div>交强保险费</div>
              <div>商业保险费</div>
            </div>
            <div class="table_neirong" v-for="(item,index) in data " :key="index">
              <div>
                <p>{{item.licensePlateNumber}}</p>
                <p style="font-size:0.6875rem;color:#666">{{item.dailyTime}}</p>
              </div>
              <div>{{item.compulsory}}</div>
              <div>{{item.commercial}}</div>
            </div>
            <van-empty description="暂无委托" v-show="data==null" />
          </div>
        </div>
      </van-tab>
      <van-tab title="提交台账">
        <submit></submit>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import collapseTransition from "../../utils/collapse";
import timer from "../Subcomponent/time";
import submit from "../Subcomponent/submit";
export default {
  data() {
    return {
      isActive: false,
      list: {},
      timeDate: {
        startTime: "", //输入框默认值
        endTime: "",
      },
      currentTime: new Date(), // 开始时间不能超过当前时间
      startTime: new Date(), // 开始时间
      endTime: new Date(), // 结束时间
      showStart: false, // 用来显示弹出层
      showEnd: false,
      userId:'',
      data:{},
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/index" });
    },
    toggle(el) {
      console.log(el);
      this.isActive = !this.isActive;
      if (this.isActive) {
        el.target.innerHTML = "隐藏";
      } else {
        el.target.innerHTML = "展开";
      }
    },
    showStartTime() {
      this.showStart = true;
    },
    showEndTime() {
      this.showEnd = true;
    },
    confirmStartFn() {
      // 确定按钮
      this.timeDate.startTime = this.timeFormat(this.startTime);
      this.showStart = false;
    },
    confirmEndFn() {
      this.timeDate.endTime = this.timeFormat(this.endTime);
      this.showEnd = false;
    },
    cancelFn() {
      this.showStart = false;
      this.showEnd = false;
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth()+1 ;
      let day = time.getDate() ;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },
    shaixuan(data) {
      let cookie1 = this.common.getCookie();
    let userId = cookie1.replace(/\"/g, "").split("#")[0];
      var postData=data
      this.$set(postData, "userId", parseInt(userId) );
      console.log(postData)
      this.getData
      .getguarant({params:postData})
      .then((res) => {
        console.log(res.data);
        this.data=res.data.data
      });
    },
  },
  components: {
    collapseTransition,
    timer,
    submit,
  },
  mounted() {
    this.timeFormat(new Date());
    let cookie1 = this.common.getCookie();
    let userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .ledgerbook({
        params: {
          userId: userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.list = res.data.data;
      });
      //默认显示当日数据
       this.getData
      .getguarant({params:{userId:userId}})
      .then((res) => {
        console.log(res.data);
        this.data=res.data.data
      });
  },
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
input {
  color: red;
}
.rijie {
  background-color: #f9f3f3;
  min-height: 100vh;
}
.neirong {
  width: 95%;
  margin: 0 auto;
  background-color: #ffffff;
}
.zongshu {
  display: flex;
  margin-top: 0.35rem;
  flex-direction: row;
  justify-content: space-between;
}
.font {
  font-size: 0.75rem;
}
.feiyong {
  font-size: 1.7rem;
  text-align: center;
  margin-top: 0.3125rem;
}
.detail {
  width: 100%;
  height: 1.875rem;
  line-height: 1.875rem;
  text-align: center;
  font-size: 0.75rem;
  color: #0f70e0;
  background-color: #ffffff;
  margin-top: 0.0625rem;
}
.collapse_btn {
  width: 100%;
  height: 1.875rem;

  text-align: center;
  line-height: 1.875rem;
  font-size: 0.75rem;
  text-align: center;
  color: #0f70e0;
}
.content1 {
  display: flex;
  flex-wrap: wrap;
}
.content1 div {
  width: 10.25rem;
  height: 3.125rem;
  text-align: center;
}
.content1 div span {
  font-size: 0.75rem;
}
.jiage {
  margin-left: 0.625rem;
}
.list {
  width: 100%;
  margin-top: 0.625rem;
}
.table_title {
  display: flex;
  width: 100%;
  height: 1.875rem;
  line-height: 1.875rem;
  background: #0f70e0;
  color: #ffffff;
}
.table_title div {
  width: 32%;
  text-align: center;
  font-size: 0.8125rem;
}
.table_neirong {
  display: flex;
  width: 100%;
  min-height: 1.875rem;
  line-height: 1.875rem;
}
.table_neirong div {
  width: 32%;
  text-align: center;
  font-size: 0.8125rem;
}
</style>