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
              <div class="feiyong">650</div>
            </div>
            <div style="margin-right:1rem;margin-top:0.1875rem">
              <div class="font">今日商业险费用(元)</div>
              <div class="feiyong">650</div>
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
                  <span>昨日交强费用</span>
                  <span class="jiage">650</span>
                </div>
                <div style="margin-top:0.625rem">
                  <span>昨日商业费用</span>
                  <span class="jiage">650</span>
                </div>
                <div>
                  <span>本月交强费用</span>
                  <span class="jiage">650</span>
                </div>
                <div>
                  <span>本月商业费用</span>
                  <span class="jiage">650</span>
                </div>
                <div>
                  <span>本年交强费用</span>
                  <span class="jiage">650</span>
                </div>
                <div>
                  <span>本年商业费用</span>
                  <span class="jiage">650</span>
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
            <timer></timer>
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
            <div class="table_neirong">
              <div>湘A88888</div>
              <div>1000</div>
              <div>1000</div>
            </div>
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
import submit from '../Subcomponent/submit'
export default {
  data() {
    return {
      isActive: false,
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
  },
  components: {
    collapseTransition,
    timer,
    submit
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
  height: 1.875rem;
  line-height: 1.875rem;
}
.table_neirong div {
  width: 32%;
  text-align: center;
  font-size: 0.8125rem;
}
</style>