<template>
  <!-- 添加客户组件 -->
  <van-form @submit="onSubmit">
    <van-field
      v-model="clientName"
      required
      name="clientName"
      label="客户名字"
      placeholder="客户名字"
      :rules="[{ required: true, message: '请填写客户名字' }]"
    />
    <van-field
      v-model="clientWay"
      required
      type="phone"
      name="clientWay"
      label="手机号码"
      placeholder="手机号码"
      :rules="[{ required: true, message: '请填写手机号码' },
				{pattern:  /^1[3-9]\d{9}$/, message: '手机号格式错误！'}
		]"
    />
    <van-field
        v-model="clientLicenseNumber"
        name="clientLicenseNumber"
        label="车牌号"
        placeholder="车牌号"
        required
        :rules="[
				{ required: true, message: '请填写车牌号' },
				{pattern:  /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/, message: '车牌号格式错误！'}
				]"
      />
      <van-field required v-model="clientType" name="clientType" label="车型" placeholder="车型" />
    <van-field
      v-model="clientIdentityCard"
      required
      name="clientIdentityCard"
      label="身份证号码"
      placeholder="身份证号码"
      :rules="[{ required: true, message: '请填写身份证号码' },
				{pattern:  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式错误！'}
		]"
    />
    <!-- 点击选择保险机构 -->
    <van-field
      readonly
      clickable
      v-model="valus"
      name="insuranceCompanyName"
      label="投保机构"
      placeholder="投保机构"
      @click="showBao = true"
    />
    <van-field type="text" v-model="id" name="insuranceCompanyId" style="display: none;" />
    <van-popup v-model="showBao" position="bottom">
      <van-picker
        title="保险公司"
        show-toolbar
        @cancel="onCancel"
        :columns="columns"
        @confirm="onconfirm"
        value-key="insuranceCompanyName"
      />
    </van-popup>
    <!-- 投保城市 -->
    <van-field
      required
      readonly
      clickable
      name="clientAddress"
      :value="value"
      label="投保城市"
      placeholder="点击选择城市"
      @click="showArea = true"
    />
    <van-popup v-model="showArea" position="bottom">
      <van-area
        :area-list="cslist"
        :columns-num="colNum"
        @confirm="onConfirm1"
        @cancel="showArea = false"
      />
    </van-popup>
    <!-- 出保时间
    <van-field
      readonly
      clickable
      name="StartTime"
      :value="starttime"
      label="出保时间"
      placeholder="出保时间"
      @click="show1 = true"
    /> -->
    <!-- 到保时间 -->
    <van-field
      clickable
      name="clientExpirationTime"
      :value="startend"
      label="保险到期时间"
      placeholder="保险到期时间"
      @click="show2 = true"
    />
    <!-- 出保时间控件 -->
    <!-- <van-popup v-model="show1" position="bottom">
      <van-datetime-picker
        type="date"
        v-model="currentDate"
        @confirm="onConfirm"
        @cancel="show1 = false"
      /> 
    </van-popup>-->
    <!-- 到保时间控件 -->
    <van-popup v-model="show2" position="bottom">
      <van-datetime-picker
        type="date"
        v-model="currentDate1"
        @confirm="confirm1"
        @cancel="show2 = false"
      />
    </van-popup>
    <!-- 备注 -->
    <van-field
      v-model="clientRemark"
      rows="2"
      autosize
      label="备注"
      name="clientRemark"
      type="textarea"
      maxlength="30"
      placeholder="备注"
      show-word-limit
    />
    <!-- 行驶证 -->
    <van-field
      v-model="clientDrivingLicense"
      name="clientDrivingLicense"
      label="初登日期"
      placeholder="初登日期"
    />
    <van-field name="typeId" label="客户类型">
      <template #input>
        <van-radio-group v-model="typeId" direction="horizontal">
          <van-radio name="1">准客户</van-radio>
          <van-radio name="2">续保客户</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>
<script>
// import area from "../../utils/area.js";
import cs from "../../utils/chengshi.js";
export default {
  inject: ["reload"],
  data() {
    return {
      clientName: "", //客户姓名
      clientWay: "", //客户电话
      clientLicenseNumber: "", //车牌号码
      clientIdentityCard: "", //身份证号码
      insuranceCompanyName: "", //保险公司名字
      insuranceCompanyId: "", //保险公司id
      clientDrivingLicense: "", //行驶证
      clientType: "", //车型
      value: "", //城市
      colNum: "3",
      showArea: false,
      // areaList: area,
       cslist: cs,
      // starttime: "", //开始时间
      // starttime1: "", //开始时间时间戳
      startend: "", //结束时间
      startend1: "", //结束时间戳
      show1: false, //开始时间弹窗
      show2: false, //结束时间弹窗
      currentDate: new Date(), //开始标准时间
      currentDate1: new Date(), //结束标准时间
      typeId: "1", //客户类型 （1表示准客户，2续保客户）默认是1
      columns: [], //保险公司数据
      showBao: false, //保险选择器
      id: "",
      valus: "",
      userId: "",
      clientRemark: "" //备注
    };
  },
  methods: {
    onSubmit(values) {
      //提交数据
      let postData = values;
      let cookie1 = this.common.getCookie();
      let userId = cookie1.replace(/\"/g, "").split("#")[0];
      this.$set(postData, "userId", userId); //将userid存入postdata中
      this.getData
        .addcustomer(postData)
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
    onConfirm1(values) {
      this.value = values.map(item => item.name).join("/");
      this.showArea = false;
    },
    onConfirm(date) {
      this.starttime =
        this.currentDate.getFullYear() +
        "年" +
        (Number(this.currentDate.getMonth()) + 1) +
        "月" +
        this.currentDate.getDate() +
        "日 ";
      this.starttime1 = new Date(this.currentDate).getTime() / 1000;
      this.show1 = false;
    },
    confirm1(data) {
      this.startend =
        this.currentDate1.getFullYear() +
        "年" +
        (Number(this.currentDate1.getMonth()) + 1) +
        "月" +
        this.currentDate1.getDate() +
        "日 ";
      this.startend1 = new Date(this.currentDate1).getTime() / 1000;
      this.show2 = false;
    },
    // 处理控件显示的时间格式
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    onconfirm(values, index) {
      //保险公司选择器确定按钮
      var insuranceCompanyId = values.insuranceCompanyId;
      var insuranceCompanyName = values.insuranceCompanyName;
      // console.log('当前值'+insuranceCompanyName + '当前索引'+insuranceCompanyId);
      this.valus = insuranceCompanyName;
      this.id = insuranceCompanyId;
      this.showBao = false;
    },

    onCancel() {
      this.showBao = false;
    }
  },
  mounted() {
    //查询保险公司
    this.getData
      .Insurance()
      .then(res => {
        this.columns = res.data.data;
        console.log(res.data.data)
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
</style>
