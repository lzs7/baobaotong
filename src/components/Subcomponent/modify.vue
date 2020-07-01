<template>
  <!-- 修改客户信息 -->
  <div>
    <van-form @submit="onSubmit">
      <van-field v-model="list.clientName" name="clientName" label="姓名" placeholder />
      <van-field
        v-model="list.clientWay"
        type="phone"
        name="clientWay"
        label="手机号码"
        placeholder="手机号码"
        :rules="[
				{pattern:  /^1[3-9]\d{9}$/, message: '手机号格式错误！'}
		]"
      />
      <van-field
        v-model="list.clientLicenseNumber"
        name="clientLicenseNumber"
        label="车牌号码"
        placeholder="车牌号"
        :rules="[
				{pattern:  /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/, message: '车牌号格式错误！'}
				]"
      />
      <van-field
        v-model="list.clientIdentityCard"
        name="clientIdentityCard"
        label="身份证号码"
        placeholder="身份证号码"
        :rules="[
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
      <!-- 到保时间 -->
      <van-field
        clickable
        name="clientExpirationTime"
        :value="list.clientExpirationTime"
        label="到保时间"
        placeholder="到保时间"
        @click="show2 = true"
      />
      <van-popup v-model="show2" position="bottom">
        <van-datetime-picker
          type="date"
          v-model="currentDate1"
          @confirm="confirm1"
          @cancel="show2 = false"
        />
      </van-popup>
      <!-- 行驶证 -->
      <van-field
        v-model="list.clientDrivingLicense"
        name="clientDrivingLicense"
        label="行驶证"
        placeholder="行驶证"
      />
      <van-field v-model="list.clientType" name="clientType" label="车型" placeholder="车型" />
      <!-- 备注 -->
      <van-field
        v-model="list.clientRemark"
        rows="2"
        autosize
        label="备注"
        name="clientRemark"
        type="textarea"
        maxlength="30"
        placeholder="备注"
        show-word-limit
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
        <van-button round block type="info" native-type="submit">保存</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
// import area from "../../utils/area.js";
import cs from "../../utils/chengshi.js";
export default {
  inject: ["reload"],
  data() {
    return {
      clientName: "",
      clientWay: "",
      clientLicenseNumber: "",
      clientIdentityCard: "",
      insuranceCompanyId: "",
      insuranceCompanyName: "",
      showBao: false,
      id: "",
      list: [],
      columns: [], //保险公司数据
      valus: "",
      showArea: false, //城市选择器
      cslist: cs,
      value: "", //城市
      colNum: "3",
      currentDate1: new Date(),
      show2: false, //结束时间弹窗
      clientExpirationTime: "",
      startend: "", //结束时间
      startend1: "", //结束时间戳
      clientDrivingLicense: "",
      clientType: "",
      typeId: 1, //客户类型 （1表示准客户，2续保客户）默认是1
      clientRemark: "",
      clientId: ""
    };
  },

  methods: {
    onSubmit(values) {
      let cookie1 = this.common.getCookie();
      let userId = cookie1.replace(/\"/g, "").split("#")[0];

      let modifyData = values;

      this.$set(modifyData, "userId", Number(userId));
      this.$set(modifyData, "clientId", Number(this.clientId));
      console.log(modifyData);
      this.getData
        .modifyCustomer(modifyData)
        .then(res => {
          //将表单数据提交
          console.log(res.data);
          if (res.data.code == 200) {
            this.$dialog
              .alert({
                title: "提示",
                message: "修改成功"
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
    onCancel() {
      this.showBao = false;
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
    onConfirm1(values) {
      this.value = values.map(item => item.name).join("/");
      this.showArea = false;
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
    }
  },
  mounted() {
    this.clientId = this.$route.query.clientId; //获取传过来的id
    let cookie1 = this.common.getCookie();
    let userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .xinxi({
        params: {
          //查询客户信息
          clientId: this.clientId,
          userId: userId
        }
      })
      .then(res => {
        this.list = res.data.data;
        console.log(this.list);
      })
      .catch(err => {
        console.log(err);
        //判断有没有登陆
        if (err.response.data.code == 0) {
          this.$router.push({ path: "/" });
        }
      });
    //查询保险公司
    this.getData
      .Insurance()
      .then(res => {
        this.columns = res.data.data;
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