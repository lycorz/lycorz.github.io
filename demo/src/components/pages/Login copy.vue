<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="LoginId">
          <el-input v-model="ruleForm.LoginId"  @keyup.enter.native="submitForm('ruleForm')" v-focus placeholder="账号" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="Pwd">
          <el-input
            type="password"
            placeholder="登录密码"
            v-model="ruleForm.Pwd"
            @keyup.enter.native="submitForm('ruleForm')" clearable>
						<i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
		<div class="login-left"></div>
		<div class="login-right">

			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
				<p style="color: #505050;font-size: 18px;font-weight: bold;text-align: center;">登录系统</p>
        <el-form-item prop="LoginId">
          <el-input v-model="ruleForm.LoginId"  @keyup.enter.native="submitForm('ruleForm')" v-focus placeholder="账号" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="Pwd">
          <el-input
            type="password"
            placeholder="登录密码"
            v-model="ruleForm.Pwd"
            @keyup.enter.native="submitForm('ruleForm')" clearable>
						<i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
			<span style="padding: 30px;color: #999999;font-size: 12px;">输入用户名和密码后点击“确定”按钮登录系统</span>
		</div>
  </div>
</template>

<script>
import {mapMutations,mapActions,mapState} from 'vuex';
export default {
	name: 'Login',
	data () {
			return {
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
	computed: {
		...mapState(['sideBarMenus'])
	},
	methods: {
		...mapMutations(['getUserInfo']),
		...mapActions(['login','getMenu']),
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.login(this.ruleForm).then(res => {
						if(res.status === 1) {
							this.$message.success(res.message);
							this.getMenu(window.USERINFO.operatorCode);
						} else {
							this.$message.error(res.message);
						}
					}).catch(err => {
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
}
.login-left {
	width: 50%;
	height: 100%;
	float: left;
	background: url(../../assets/img/loginBG.png);
	background-size: cover;
	display: none;
}
.login-right {
	height: 100%;
	width: 50%;
	float: right;
	display: none;
}
.ms-content {
	padding: 80px 40px 30px;
}
.el-input >>> .el-input__inner {
	line-height: 36px;
	height: 36px!important;
}
.login-btn {
  margin-top: 36px;
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
/* .ms-title {
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


.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
} */
</style>
