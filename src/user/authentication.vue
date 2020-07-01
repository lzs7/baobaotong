<template>
  <!-- 代理认证 -->
  <div class="page">
    <!-- 导航栏 -->
    <!-- <van-nav-bar title="豪车汇" left-text="返回" left-arrow @click-left="onClickLeft"/> -->
    <van-nav-bar left-text="代理人认证" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <div style="height:2.4rem;"></div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="userName"
          name="userName"
          required
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <!-- 点击选择保险机构 -->
        <van-field
          readonly
          clickable
          required
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
          required
          v-model="userPhone"
          name="userPhone"
          type="phone"
          label="手机号码"
          placeholder="手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          required
          v-model="userIdentityCard"
          name="userIdentityCard"
          label="身份证号码"
          placeholder="身份证号码"
          :rules="[{ required: true, message: '请填写身份证号码' },
							{pattern:  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式错误！'}
					]"
        />
        <van-field
          readonly
          clickable
          name="userAddress"
          :value="value"
          label="投保城市"
          required
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="cslist" @confirm="onConfirm" @cancel="showArea = false" />
        </van-popup>
        <van-field
          v-model="userNumber"
          name="userNumber"
          label="代理人编号"
          required
          placeholder="代理人编号"
          :rules="[{ required: true, message: '代理人编号' }]"
        />
        <van-cell title="选择身份标签" />
        <van-field name="userTietong" label>
          <template #input>
            <van-radio-group v-model="userTietong" direction="horizontal">
              <!-- <van-radio  name="1">大家保险代理(铁通员工)</van-radio> -->
              <van-radio name="2">大家保险代理</van-radio>
              <van-radio name="3">非大家保险代理</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>


<script>
// import area from '../utils/area.js'
import cs from "../utils/chengshi.js";
export default {
  data() {
    return {
      insuranceCompanyName: "",
      userName: "",
      userPhone: "",
      userIdentityCard: "", //身份证号码
      userNumber: "", //代理人编号
      valus: "", //机构
      id: "", //选择器选中值id
      columns: [], //存储保险公司
      showBao: false, //保险选择器
      userTietong: "2",
      value: "", //城市
      //   areaList: area, //城市数据
      cslist: cs,
      showArea: false //城市选择器
    };
  },
  methods: {
    onSubmit(values) {
      let postuser = values;
      //    this.userTietong=parseInt(postuser.userTietong);
      //   console.log(this.userTietong)
      this.getData
        .register(postuser)
        .then(res => {
          //将表单数据提交
          if (res.data.code == 200) {
            this.$dialog
              .alert({
                title: "提示",
                message: "注册成功",
                confirmButtonText: "去登陆"
              })
              .then(() => {
                this.$router.push({ path: "/" });
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    onConfirm(values) {
      //城市选择器确定按钮
      this.value = values.map(item => item.name).join("/");
      this.showArea = false;
    },
    onClickLeft() {}
  },

  mounted() {
    //查询保险公司
    this.getData
      .Insurance()
      .then(res => {
        res.data.data = res.data.data.slice(1);
        this.columns = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });

    this.userId = this.$route.query.userId;
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
  background-color: #ffffff;
  min-height: 100vh;
}
</style>
