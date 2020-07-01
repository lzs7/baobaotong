<template>
  <!-- 个人信息页面 -->
  <div class="page">
    <!-- 导航栏 -->
    <van-nav-bar left-text="个人信息" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <div style="height:2.4rem;"></div>
    <div class="i_list">
      <van-cell title="手机号" :value="userdata.userPhone" />
      <van-cell title="姓名" :value="userdata.userName" />
      <van-cell title="身份证号码" :value="userdata.userIdentityCard" />
      <van-cell title="编号" :value="userdata.userNumber" />
      <van-cell title="保险公司" :value="userdata.insuranceCompanyName" />
      <van-cell title="城市" :value="userdata.userAddress" />
      <van-cell
        title="身份"
        :value="userdata.userTietong==1?'大家保险(铁通员工)':userdata.userTietong==2?'大家保险员工':userdata.userTietong==3?'其他保险员工':''"
      />
      <!-- <van-cell title="个人诚信等级" value="0" />
      <van-cell title="服务积分" value="0" />-->
      <button @click="eidt">编辑资料</button>
    </div>
    <van-popup v-model="show" :style="{ height: '94%',width:'93%' }" closeable>
      <div class="xiugai">
        <van-form @submit="onSubmit">
          <van-field
            v-model="userdata.userPhone"
            name="userPhone"
            type="phone"
            label="手机号"
            placeholder="手机号"
          />
          <van-field
            v-model="userdata.userName"
            name="userName"
            readonly
            label="姓名"
            placeholder="姓名"
          />
          <van-field
            readonly
            v-model="userdata.userIdentityCard"
            name="userIdentityCard"
            label="身份证号码"
            placeholder="身份证号码"
            :rules="[
							{pattern:  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式错误！'}
					]"
          />
          <van-field v-model="userdata.userNumber" name="userNumber" label="编号" placeholder="编号" />
          <!-- 点击选择保险机构 -->
          <van-field
            readonly
            clickable
            v-model="valus"
            name="insuranceCompanyName"
            label="保险公司"
            placeholder="保险公司"
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
            readonly
            clickable
            name="userAddress"
            :value="value"
            label="城市"
            placeholder="点击选择省市区"
            @click="showArea = true"
          />
          <van-popup v-model="showArea" position="bottom">
            <van-area :area-list="cslist" @confirm="onConfirm" @cancel="showArea = false" />
          </van-popup>

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
            <van-button round block type="info" native-type="submit">保存</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import area from '../utils/area.js'
import cs from "../../utils/chengshi.js";
export default {
  inject: ["reload"],
  data() {
    return {
      userId: "",
      userdata: [],
      show: false,
      columns: [], //存储保险公司
      showBao: false, //保险选择器
      insuranceCompanyName: "",
      userName: "",
      userPhone: "",
      userIdentityCard: "", //身份证号码
      userNumber: "", //代理人编号
      valus: "", //机构
      id: "", //选择器选中值id
      value: "", //城市
      //   areaList: area, //城市数据
      cslist: cs,
      showArea: false, //城市选择器
      userTietong: "2"
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/index" });
    },
    eidt() {
      this.show = true;
    },
    onSubmit(values) {
      let cookie1 = this.common.getCookie();
      let userId = cookie1.replace(/\"/g, "").split("#")[0];
      let myselfData = values;
      this.$set(myselfData, "userId", Number(userId));
      this.getData
        .modifyMyself(myselfData)
        .then(res => {
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
    }
  },
  mounted() {
    let cookie1 = this.common.getCookie();
    let userId = cookie1.replace(/\"/g, "").split("#")[0];
    this.getData
      .personal({
        params: {
          //获取页面数据
          userId: userId
        }
      })
      .then(res => {
        this.userdata = res.data.data;
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.code == 0) {
          //判断有没有登陆
          this.$router.push({ path: "/" });
        }
      });
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
  background-color: #f9f3f3;
  min-height: 100vh;
}
.i_list {
  margin-top: 0.4rem;
}
.i_list button {
  width: 80%;
  height: 3rem;
  margin-top: 7%;
  margin-left: 10%;
  background-color: #07c160;
  border: 1px solid #07c160;
  color: #ffffff;
  border-radius: 0.4rem;
}
.xiugai {
  margin-top: 1.5rem;
}
</style>
