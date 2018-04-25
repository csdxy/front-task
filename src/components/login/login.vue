<template>
  <div class="login">
    <div class="login-background">
      <div class="login-content">
        <img src="./logo.jpg">
        <form>
          <div class="form-group has-feedback">
            <input v-model="name" type="text" class="form-control" placeholder="请输入用户名">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input v-model="password" type="password" class="form-control" @keyup.enter="onLogin" placeholder="请输入密码">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
        </form>
        <div class="button-area">
          <a href="javascript:;" class="btn btn-block btn-social btn-facebook btn-flat" @click="onLogin">登录</a>
          <a href="javascript:;" class="btn btn-block btn-social btn-facebook btn-flat" @click="onSignup">注册</a>
        </div>
      </div>
    </div>
    <tip ref="tip" :message="msg"></tip>
  </div>
</template>

<script>
import { login, signup } from 'api/login'
import Tip from 'base/tip/tip'
export default {
  name: 'HelloWorld',
  data() {
    return {
      name: '',
      password: '',
      msg: '',
      showMsg: false
    }
  },
  methods: {
    // 验证用户名、密码是否输入
    _varify() {
      this.msg = ''
      if (this.name == null || this.name === '' ||
        this.password == null || this.password === '') {
        this.msg = '账号不能为空'
        this.$refs.tip.show()
        return false
      } else {
        return true
      }
    },
    onSignup() {
      // 用户注册
      if (!this._varify()) {
        return
      }
      let param = { name: this.name, password: this.password }
      signup(param).then((res) => {
        if (res.code === 200) {
          sessionStorage.setItem('userName', this.name)
          this.$router.push({ path: '/home' })
        } else {
          this.msg = res.info
          this.$refs.tip.show()
        }
      })
    },
    onLogin() {
      // 用户登录
      if (!this._varify()) {
        return
      }
      let param = { name: this.name, password: this.password }
      login(param).then((res) => {
        if (res.code === 200) {
          sessionStorage.setItem('userName', this.name)
          this.$router.push({ path: '/home' })
        } else {
          this.msg = res.info
          this.$refs.tip.show()
        }
      })
    }
  },
  components: {
    Tip
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-background {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #d2d6de;
}
.login-content {
  width: 360px;
  text-align: center;
  background-color: #fff;
  padding: 20px;
  color: #666;
  margin-top: 7%;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 768px) {
  .login-content {
    width: 90%;
  }
}
.login-content img {
  width: 120px;
  height: 72px;
  margin: 0 20px 20px 20px;
}
.button-area {
  padding-top: 10px;
}
.button-area a {
  text-align: center;
  padding-left: 0px;
}
.button-area a + a {
  margin-top: 10px;
}
</style>
