<template>
  <div>
    <!-- 总台帐 -->
    <van-row
      type="flex"
      justify="center"
      style="height:2.5rem;line-height:2.5rem;text-align:center;border-bottom:0.0625rem solid 	#DDDDDD;background-color:#ffff"
    >
      <van-col span="9" class="ziti">今日交强总台帐</van-col>
      <van-col span="8" class="ziti">650</van-col>
      <van-col span="8" class="ziti">10%</van-col>
    </van-row>
    <van-row
      type="flex"
      justify="center"
      style="height:2.5rem;line-height:2.5rem;text-align:center;border-bottom:0.0625rem solid 	#DDDDDD;background-color:#ffff"
    >
      <van-col span="9" class="ziti">今日商业总台帐</van-col>
      <van-col span="8" class="ziti">650</van-col>
      <van-col span="8" class="ziti">10%</van-col>
    </van-row>
    <van-row
      type="flex"
      justify="center"
      style="height:2.5rem;line-height:2.5rem;text-align:center;border-bottom:0.0625rem solid 	#DDDDDD;background-color:#ffff"
    >
      <van-col span="9" class="ziti">本月交强总台帐</van-col>
      <van-col span="8" class="ziti">650</van-col>
      <van-col span="8" class="ziti">10%</van-col>
    </van-row>
    <van-row
      type="flex"
      justify="center"
      style="height:2.5rem;line-height:2.5rem;text-align:center;border-bottom:0.0625rem solid 	#DDDDDD;background-color:#ffff"
    >
      <van-col span="9" class="ziti">本月商业总台帐</van-col>
      <van-col span="8" class="ziti">650</van-col>
      <van-col span="8" class="ziti">10%</van-col>
    </van-row>
    <!-- 下拉选择 -->
    <div style="margin-top:0.625rem">
      <van-dropdown-menu>
        <van-dropdown-item title="选择月份" v-model="value" :options="option1" @change="changeDevelop" />
      </van-dropdown-menu>
      <div v-show="value==0" class="qiyue">
        <div>商业险</div>
        <div>650</div>
        <div>10%</div>
      </div>
      <div v-show="id==1" class="bayue">
        <div>商业险</div>
        <div>650</div>
        <div>10%</div>
      </div>
    </div>
    <!-- 下拉 -->
    <div style="margin-top:0.625rem">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="developList" @change="changeDevelop1" />
      </van-dropdown-menu>

      <div v-show="value1=='a'" class="qiyue">
        <div>7交强险</div>
        <div>650</div>
        <div>10%</div>
      </div>
      <div v-show="value1==id1" class="bayue">
        <div>8交强险</div>
        <div>650</div>
        <div>10%</div>
      </div>
    </div>
    <!-- 部门 -->
    <div class="bumen">
      <van-dropdown-menu>
        <van-dropdown-item v-model="bumenlist.value2" :options="list" @change="changeDevelop2" />
      </van-dropdown-menu>
      <!-- 开始弹窗层 -->
      <van-field
        v-model="bumenlist.startValue"
        placeholder="开始时间"
        readonly
        label="开始时间"
        @click="showStartTime()"
      />
      <van-popup v-model="showStart" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="startTime"
          type="date"
          :max-date="currentTime"
          @confirm="confirmStartFn()"
          @cancel="cancelFn()"
        />
      </van-popup>
      <!-- 结束时间 输入框 -->
      <van-field
        v-model="bumenlist.endValue"
        placeholder="结束时间"
        readonly
        label="结束时间"
        @click="showEndTime()"
      />
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
    <van-button type="info" block @click="shaixuan(bumenlist)">筛选</van-button>
      <div>
        <div class="list">
          <div>交强险</div>
          <div>650</div>
          <div>10%</div>
        </div>
        <div class="list">
          <div>商业险</div>
          <div>650</div>
          <div>10%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0, //第一个
      value1: "a", //第二个

      id: 0,
      id1: "",
      option1: [
        { text: "7月份商业险", value: 0 },
        { text: "8月份商业险", value: 1 },
      ],
      developList: [
        {
          value: "a",
          text: "我是第一个",
        },
        {
          value: "b",
          text: "我是第二个",
        },
      ],
      list: [
        { text: "部门", value: 0 },
        { text: "全部门", value: 1 },
        { text: "车商", value: 2 },
      ],

      bumenlist: {
        value2: 0, //第三个
        startValue: "",
        endValue: "",
      },
      currentTime: new Date(), // 开始时间不能超过当前时间
      startTime: new Date(), // 开始时间
      endTime: new Date(), // 结束时间
      showStart: false, // 用来显示弹出层
      showEnd: false,
    };
  },
  methods: {
    changeDevelop(i) {
      var that = this;
      console.log(i);
      that.id = i;
    },
    changeDevelop1(i) {
      var that = this;
      console.log(i);
      that.id1 = i;
    },
    changeDevelop2() {},
    showStartTime() {
      this.showStart = true;
    },
    showEndTime() {
      this.showEnd = true;
    },
    confirmStartFn() {
      // 确定按钮
      this.bumenlist.startValue = this.timeFormat(this.startTime);
      this.showStart = false;
    },
    confirmEndFn() {
      this.bumenlist.endValue = this.timeFormat(this.endTime);
      this.showEnd = false;
    },
    cancelFn() {
      this.showStart = false;
      this.showEnd = false;
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "年" + month + "月" + day + "日";
    },
    shaixuan(data){
      console.log(data)
    }
  },
  mounted() {
    this.timeFormat(new Date());
  },
};
</script>
<style scoped>
.ziti {
  font-size: 0.8125rem;
}
.qiyue {
  margin-top: 0.3125rem;
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.qiyue div {
  width: 33%;
  text-align: center;
  font-size: 0.8125rem;
}
.bayue {
  margin-top: 0.3125rem;
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.bayue div {
  width: 33%;
  text-align: center;
  font-size: 0.8125rem;
}
.bumen {
  width: 98%;
  margin:0 auto;
  margin-top: 0.625rem;
  background-color: #ffffff;
  /* border: 1px solid red; */
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
}
.list {
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  display: flex;
}
.list div {
  width: 34%;
  text-align: center;
  font-size: 0.8125rem;
}
</style>