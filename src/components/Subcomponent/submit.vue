<template>
  <div>
    <van-form @submit="onSubmit">
      <!-- 部门选择 -->
      <van-field
        readonly
        clickable
        is-link
        v-model="departmentName"
        name="departmentName"
        label="部门"
        @click="showBumen = true"
      />
      <van-field type="text" v-model="id" name="departmentId" style="display: none;" />
       <van-popup v-model="showBumen" position="bottom">
        <van-picker
          title="部门"
          show-toolbar
          @cancel="onCancel"
          :columns="list"
          @confirm="onConfirm1"
          value-key="departmentName"
        />
        </van-popup>
        <!-- 代理点选择 -->
         <van-field
        readonly
        clickable
        is-link
        v-model="agentName"
        name="agentName"
        label="代理点"
        @click="showDai = true"
      />
      <van-field type="text" v-model="Id" name="agentId" style="display: none;" />
       <van-popup v-model="showDai" position="bottom">
        <van-picker
          title="部门"
          show-toolbar
          @cancel="oncancel"
          :columns="data"
          @confirm="onConfirm"
          value-key="agentName"
        />
        </van-popup>


      <van-field
        v-model="licensePlateNumber"
        name="车牌号"
        label="车牌号"
        placeholder="车牌号"
        :rules="[{ required: true, message: '请填写车牌号' }]"
      />
      <van-field
        v-model="compulsory"
        name="交强报费"
        label="交强报费"
        placeholder="交强报费"
      />
      <van-field
        v-model="commercial"
        name="商业保费"
        label="商业保费"
        placeholder="商业保费"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>d:'',
<script>
export default {
  data() {
    return {
      departmentName: "",
      agentName:"",
      id:'',//部门id
      Id:'',//代理人id
      // list:["车商渠道客户","转贷渠道","车商3部"],
      // data:["代理点","代理人"],
      showBumen: false,
      showDai:false,
      licensePlateNumber:'',
      compulsory:'',
      commercial:'',
      data:[],//所有代理人
      list:[],//所有部门

    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
 //提交数据
      let postData = values;
      let cookie1 = this.common.getCookie();
      let userId = cookie1.replace(/\"/g, "").split("#")[0];
      this.$set(postData, "userId", parseInt(userId)); //将userid存入postdata中
      this.getData
        .postdail(postData)
        .then(res => {
          //将表单数据提交

          if (res.data.code == 200) {
            this.$dialog
              .alert({
                title: "提示",
                message: "添加成功"
              })
              .then(() => {
                this.reload();
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
          },
     onConfirm(values,index) {
       console.log(values)
       
       //代理人选择器确定按钮
      var agentId = values.agentId;
      var agentName = values.agentName;
      // console.log('当前值'+insuranceCompanyName + '当前索引'+insuranceCompanyId);
      this.agentName = agentName;
      console.log(this.agentName)
      this.Id = agentId;
      this.showDai = false;
    },
    onCancel() {
      this.showBumen = false;
    },
    onConfirm1(values,index){
      var departmentId = values.departmentId;
      var departmentName = values.departmentName;
      this.departmentName = departmentName;
      this.id = departmentId;
        this.showBumen=false
    },
    oncancel(){
        this.showDai=false
    }
  },
  mounted(){
      let cookie1 = this.common.getCookie();
    let userId = cookie1.replace(/\"/g, "").split("#")[0];
     //查询所有代理人
      this.getData
      .getagent()
      .then((res) => {
        console.log(res.data.data);
        this.data=res.data.data
      });
      //查询所有部门
       this.getData
      .getdepartment()
      .then((res) => {
        console.log(res.data.data);
        this.list=res.data.data
      });
  }
};
</script>