<template>
  <div class="page">
    <div class="title">
      <div>宝保通</div>
    </div>
    <div class="login_block">
      <input type="text" class="qxs-ic_user qxs-icon" placeholder="请输入手机号" v-model="userPhone" />
      <input
        type="text"
        class="qxs-ic_password qxs-icon"
        placeholder="输入验证码"
        v-model="VerificationCode"
      />
      <div class="tishi">
        <div>
          <img src="../assets/img/ts2.png" alt />
        </div>
        <span>未登陆过的手机号默认会注册</span>
      </div>
      <div class="yzm_btn">
        <button @click="obtain(userPhone)" v-show="isDisabled" class="btn1">获取验证码</button>
        <button v-show="!isDisabled" class="btn1">{{timer}}s后重新获取</button>
      </div>
      <div class="btn">
        <van-button
          round
          type="primary"
          size="large"
          color="#0f70e0"
          @click="login(userPhone,VerificationCode)"
        >登陆</van-button>
      </div>

      <!-- <div class='kz-cont' v-show='showstate'>
				<div class='kz-wrapper' >
				<div class='kz-text'>
					
				</div>
				<div class="masegg">您未注册</div>
				<div class='footer'>
					<div @click='tocancel' class='kz-btn'>取消</div>
					<div class='kz-btn' @click='took'>确定</div>
				</div>
				</div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      userPhone: "",
      VerificationCode: "",
      isDisabled: true, //控制按钮是否可以点击（true:可以点击，false:不可点击）
      timer: 60 //倒计时默认60s
      // showstate:false
    };
  },
  methods: {
    //   tocancel(){

    //   },
    //   took(){

    //   },
    login(userPhone, VerificationCode) {
      //判断验证码是否为空
      if (!this.VerificationCode) {
        this.$notify({
          message: "验证码不能为空",
          type: "warning",
          duration: 1000
        });
      } else {
        this.getData
          .login({
            params: {
              userPhone: userPhone,
              num: VerificationCode
            }
          })
          .then(res => {
            console.log(res);
            let message = res.data.message;
            if (res.data.code === 200) {
              this.$toast({
                message: "登陆成功",
                icon: "checked"
              });
              this.$router.push({ path: "/index" });
            } else if (res.data.code === 205) {
              this.$dialog
                .alert({
                  message: "您未注册,点击确认去注册"
                })
                .then(() => {
                  this.$router.push({ path: "/authentication" });
                });
              // this.showstate=true
            } else if (res.data.code === 300) {
              // this.$toast.fail(message);
              this.$toast({
                message,
                icon: "clear"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    obtain(phone) {
      // 验证手机
      if (!this.userPhone) {
        this.$notify({
          message: "手机号不能为空",
          type: "warning",
          duration: 1000
        });
      } else if (!/^1[3-9]\d{9}$/.test(this.userPhone)) {
        this.$notify({
          message: "请输入正确的手机号",
          type: "warning",
          duration: 1000
        });
      } else {
        //当手机号码正确时发送验证码 倒计时
        this.isDisabled = false; //点击button改变v-show的状态
        let auth_timer = setInterval(() => {
          //定时器设置每秒递减
          this.timer--; //递减时间
          if (this.timer <= 0) {
            this.isDisabled = true; //60s时间结束还原v-show状态并清除定时器
            this.timer = 60;
            clearInterval(auth_timer);
          }
        }, 1000);
        this.getData
          .yanzhengma({
            params: {
              userPhone: phone
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$toast({
                message: "发送成功",
                icon: "checked"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    var cookie1 = this.common.getCookie();
    if (cookie1 != null && cookie1 != "") {
      this.$router.push({ path: "/index" });
    }
  }
};
</script>

<style scoped="scoped">
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
input::-webkit-input-placeholder {
  color: #888888;
  font-size: 0.8125rem;
}
.page {
  min-height: 100vh;
  background: url("../assets/img/back1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
input::-webkit-input-placeholder {
  color: #c0c0c0;
}
.fanhui-img {
  width: 2rem;
  height: 2rem;
  line-height: 3.2rem;
  margin-left: 0.3rem;
}
.login_block {
  width: 90%;
  margin: 0 auto;
  position: absolute;
  top: 31%;
  left: 6%;
}
.qxs-ic_user {
  background: url("../assets/img/iPhone.png") no-repeat;
  background-size: 1rem 1rem;
  background-position: 3%;
}
.qxs-ic_password {
  background: url("../assets/img/ma.png") no-repeat;
  background-size: 1rem 1rem;
  background-position: 3%;
  margin-bottom: 1.25rem;
}
.qxs-icon {
  height: 2.5rem;
  width: 100%;
  margin-bottom: 1.3125rem;
  padding-left: 10%;
  border: 0;
  border-bottom: solid 0.0625rem lavender;
  color: #ffffff;
  font-size: 0.875rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.tishi {
  width: 100%;
  display: flex;
}
.tishi div {
  width: 1rem;
  height: 1rem;
}
.tishi span {
  color: #ffff99;
  letter-spacing: 0.2rem;
  font-size: 0.8rem;
  margin-left: 0.3rem;
}
.btn {
  margin-top: 1.25rem;
}
.yzm_btn {
  position: absolute;
  top: 30%;
  right: 1%;
}
.yzm_btn .btn1 {
  background-color: #e94710;
  color: #ffffff;
  height: 2.25rem;
  width: 6.125rem;
  font-size: 0.8125rem;
  border: 0;
  border: 0.0625rem solid #e94710;
  border-radius: 0.3125rem;
}

.title {
  width: 100%;
  height: 12rem;
  position: relative;
}
.title div {
  width: 50%;
  text-align: center;
  position: absolute;
  top: 5rem;
  left: 27%;
  color: #ffffff;
  letter-spacing: 1rem;
  font-size: 2rem;
}
/* .masegg{
		width:100%;
		text-align: center;
		margin-top:2rem;
	}
	.kz-cont{position:fixed;left:0;right: 0;top:0;bottom: 0;z-index: 500;background:rgba(0,0,0,0.3);text-align:center;overflow: hidden;white-space:nowrap;}
  .kz-cont:after{content:"";display:inline-block;width:0;height:100%;visibility: hidden;vertical-align:middle;}
  .kz-wrapper{position: relative;display:inline-block;vertical-align:middle;background:#fff;color:#333333;border-radius: 5px;max-width:100%;width:18rem;height:13rem;}
  .kz-text{text-align:center;padding:20px 75px;}
  .footer{
	  display:flex;
	  border-top:1px solid #E5E5E5;
	  color:#488BF1;
	  position: absolute;
	  bottom: 0;
	  width:100%
	  }
  .kz-btn{flex:1;padding: 12px;}
  .kz-btn +.kz-btn{border-left:1px solid #E5E5E5;} */
</style>
