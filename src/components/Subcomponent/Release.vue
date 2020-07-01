<template>
  <!-- 发布委托子组件 -->
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="licensePlateNumber"
        name="licensePlateNumber"
        label="车牌号"
        placeholder="车牌号"
        required
        :rules="[
				{ required: true, message: '请填写车牌号' },
				{pattern:  /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/, message: '车牌号格式错误！'}
				]"
      />
      <van-field
        v-model="entrustCarBrand"
        name="entrustCarBrand"
        label="品牌车型"
        placeholder="汽车品牌"
        required
        :rules="[{ required: true, message: '请填写车的品牌' }]"
      />
      <van-field
        readonly
        clickable
        name="entrustAddress"
        :value="value"
        label="投保城市"
        required
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area :area-list="cslist" @confirm="onConfirm" @cancel="showArea = false" />
      </van-popup>
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
      <van-field
        v-model="entrustInsure"
        readonly
        name="entrustInsure"
        label="投保险种"
        placeholder="自行描述保险类型"
      />
      <van-field
        v-model="entrustServiceCharge"
        name="entrustServiceCharge"
        label="期望服务费"
        type="number"
        placeholder="期望服务费"
      />
      <van-field
        v-model="entrustMoney"
        name="entrustMoney"
        type="number"
        label="保费的金额"
        required
        placeholder="保费的金额"
        :rules="[{ required: true, message: '请填写保费的金额' }]"
      />
      <van-field
        v-model="entrustReturnMoney"
        name="entrustReturnMoney"
        type="number"
        label="还单保费金额"
        placeholder="还单保费金额"
        required
        :rules="[{ required: true, message: '请填写还单保费金额' }]"
      />
      <van-field
        v-model="entrustReturnTime"
        name="entrustReturnTime"
        label="还单时间"
        placeholder="30天之内"
        readonly
      />
      <van-field
        v-model="entrustRemark"
        rows="2"
        autosize
        label="备注"
        name="entrustRemark"
        type="textarea"
        maxlength="30"
        placeholder="备注"
        show-word-limit
      />

      <van-field name="entrustBusiness">
        <template #input>
          <van-checkbox v-model="entrustBusiness" @change="onchange" />是否投保商业车损险
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">发布</van-button>
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
      licensePlateNumber: "", //车牌号码
      entrustCarBrand: "", //车的品牌
      entrustServiceCharge: "", //期望委托费
      entrustMoney: "", //委托单金额
      entrustReturnMoney: "", //需还单金额
      entrustReturnTime: "", //还单时间
      entrustRemark: "", //备注
      entrustInsure: "交+车损+三责100万+座+", //保险类型
      value: "", //投保城市
      valus: "", //机构
      id: "", //选择器选中值id
      entrustBusiness: "1", //是否投保商业车损险
      columns: [], //存储保险公司
      showArea: false, //城市选择器
      showBao: false, //保险选择器
      // areaList: area, //城市数据
      cslist: cs,

      course: [],
      userId: ""
    };
  },

  methods: {
    onSubmit(values) {
      let cookie1 = this.common.getCookie();
      let userId = cookie1.replace(/\"/g, "").split("#")[0];
      let postData = values;
      let entrustmoney = this.entrustMoney / 2;
      if (this.entrustReturnMoney > entrustmoney) {
        this.$notify({
          message: "还单金额不能超过保费金额的50%",
          type: "warning",
          duration: 1000
        });
      } else {
        this.$set(postData, "userId", userId);
        this.getData
          .release(postData)
          .then(res => {
            //将表单数据提交
            if (res.data.code == 200) {
              this.$dialog
                .alert({
                  title: "提示",
                  message: "发布成功"
                })
                .then(() => {
                  this.reload();
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onConfirm(values) {
      //城市选择器确定按钮
      this.value = values.map(item => item.name).join("/");
      this.showArea = false;
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
    },
    onchange(value) {
      this.entrustBusiness = value == true ? 1 : 0;
    }
    // myInput: function (e) {
    // 	console.log(e)
    // }
  },
  mounted() {
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

<style>
</style>
