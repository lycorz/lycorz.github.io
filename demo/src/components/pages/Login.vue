<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="LoginId">
          <el-input v-model="ruleForm.LoginId" placeholder="请输入用户名">
            <el-button slot="prepend" icon="el-icon-service"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="Pwd">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.Pwd"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-bell"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
	name: 'Login',
	created(){

	},
	data () {
			return {
					ruleForm: {
							LoginId: '001',
							Pwd: '001'
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
	methods: {
		...mapMutations(['getUserInfo']),
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var _this = this;
					this.$axios.post(this.$api.Login, this.ruleForm).then(res => {
						if (res.data.status === 1) {
							console.log(this.$store)
							console.log(this.$router)
							_this.$store.commit('getUserInfo', res.data.entity);
							_this.$router.push('/');
						} else {
							_this.$message.error(res.data.message);
						}
					}).catch (err => {
						_this.$message.error(err.data.message);
					});
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
