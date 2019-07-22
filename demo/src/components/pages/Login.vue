<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="LoginId">
          <el-input v-model="ruleForm.LoginId" placeholder="账号" clearable @keyup.enter.native="submitForm('ruleForm')" class="username">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="Pwd">
          <el-input
            type="password"
            placeholder="登录密码"
            v-model="ruleForm.Pwd"
						clearable
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLogin">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapActions} from 'vuex';
export default {
	name: 'Login',
	data () {
		return {
			isLogin: false,
			ruleForm: {
				LoginId: '004',
				Pwd: 'pwd'
			},
			rules: {
				LoginId: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				Pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}
		}
	},
	mounted() {
		document.querySelector('.username input').focus();
	},
	methods: {
		...mapMutations(['getUserInfo']),
		...mapActions(['login','getMenu']),
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.isLogin = true;
					this.login(this.ruleForm).then(res => {
						if(res.status === 1) {
							this.$message({
								message: res.message,
								type: 'success',
								duration: 1000
							})
							this.getMenu(window.USERINFO.operatorCode);
							this.isLogin = true;
						} else {
							this.isLogin = true;
							this.$message.error(res.message);
						}
					}).catch(err => {
						this.isLogin = true;
						this.$message.error(err.message);
					})
				}
			})
		}
	}
}
</script>

<style scoped>
.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  margin-top: 16px;
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
