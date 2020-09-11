<template>
  <div>
    <!-- 个人台账 -->
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </form>
    <div class="gere_table">
        <div>姓名</div>
        <div>部门</div>
        <div>代理点</div>
        <div>车牌号</div>
        <div>交强保费</div>
        <div>商业保费</div>
    </div>
    <div class="gere_list">
        <div>李泽胜</div>
        <div>车商一部</div>
        <div>国合快车</div>
        <div>湘AN8989</div>
        <div>6500</div>
        <div>6500</div>
    </div>
    <div class="gere_list">
        <div>李泽胜</div>
        <div>车商一部</div>
        <div>国合快车</div>
        <div>湘AN8989</div>
        <div>6500</div>
        <div>6500</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
     onSearch(val) {
      console.log(val);
    },
  },
};
</script>
<style scoped>
.gere_table{
    display: flex;
    width:100%;
    background-color: #0f70e0;
    height:1.875rem;
    line-height: 1.875rem;
    color:#ffff
}
.gere_table div{

    font-size: 0.8125rem;
    width:17%;
    text-align: center;
}
.gere_list{
    margin-top:0.25rem;
    display: flex;
    width:100%;
    min-height: 1.875rem;
    line-height: 1.25rem;
}
.gere_list div{
    font-size:0.75rem;
    width:17%;
    text-align: center;
}
</style>