<template>
  <div>
    <van-form @submit="onSubmit">
      <!-- 部门选择 -->
      <van-field
        readonly
        clickable
        is-link
        v-model="bumen"
        name="部门"
        label="部门"
        @click="showBumen = true"
      />
       <van-popup v-model="showBumen" position="bottom">
        <van-picker
          title="部门"
          show-toolbar
          @cancel="onCancel"
          :columns="list"
          @confirm="onconfirm"
          value-key="name"
        />
        </van-popup>
        <!-- 代理点选择 -->
         <van-field
        readonly
        clickable
        is-link
        v-model="daili"
        name="代理点"
        label="代理点"
        @click="showDai = true"
      />
       <van-popup v-model="showDai" position="bottom">
        <van-picker
          title="部门"
          show-toolbar
          @cancel="oncancel"
          :columns="data"
          @confirm="onConfirm"
          value-key="name"
        />
        </van-popup>


      <van-field
        v-model="chepai"
        name="车牌号"
        label="车牌号"
        placeholder="车牌号"
        :rules="[{ required: true, message: '请填写车牌号' }]"
      />
      <van-field
        v-model="jiaoqiang"
        name="交强报费"
        label="交强报费"
        placeholder="交强报费"
      />
      <van-field
        v-model="shangye"
        name="商业保费"
        label="商业保费"
        placeholder="商业保费"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      bumen: "车商渠道客户",
      daili:"代理点",
      
      list:["车商渠道客户","转贷渠道","车商3部"],
      data:["代理点","代理人"],
      showBumen: false,
      showDai:false,
      chepai:'',
      jiaoqiang:'',
      shangye:''

    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
     onconfirm(values) {
      //城市选择器确定按钮
      console.log(values)
      this.showBumen = false;
    },
    onCancel() {
      this.showBumen = false;
    },
    onConfirm(values){
        this.showDai=false
    },
    oncancel(){
        this.showDai=false
    }
  },
};
</script>