<template>
  <el-container>
    <i class="el-icon-arrow-left iconstyle f26" @click="goBack"></i>
    <el-header class="text">欢迎登录Supermarket</el-header>
    <el-main>
      <el-input
        placeholder="请输入用户名"
        v-model="username"
        @focus="errorUnshow"
        clearable
      >
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        show-password
        class="margin"
        @focus="errorUnshow"
      ></el-input>
    </el-main>
    <div class="err">
      <p v-show="error">{{error}}</p>
    </div>
    <el-footer>
      <el-button type="primary" class="width" @click="handleLogin">登录</el-button>\
      <div style="text-align: center">帐号：test 密码：qazw1234</div>
    </el-footer>
  </el-container>
</template>

<script>
import cookie from '@/api/cookie'
import { login } from '@/api/api'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  methods: {
    goBack () {
      this.$router.push('/')
    },
    handleLogin () {
      const that = this
      login({
        username: this.username,
        password: this.password
      }).then((response) => {
        // 本地存储用户信息
        cookie.setCookie('name', this.username, 7)
        cookie.setCookie('token', response.data.token, 7)
        // 存储在store
        // 更新store数据
        that.$store.dispatch('setInfo')
        // 如果登录后需要重定向页面
        if (that.$route.query.redirect) {
          const redirectPath = that.$route.query.redirect
          that.$router.push({path: redirectPath})
        } else {
          that.$router.push({name: 'home'})
        }
      })
        .catch(function (error) {
          if ('non_field_errors' in error.response.data) {
            that.error = '用户名或密码错误，请重新输入'
          }
          if ('username' in error.response.data) {
            that.error = '用户名不能为空'
          }
          if ('password' in error.response.data) {
            that.error = '密码不能为空'
          }
        })
    },
    errorUnshow () {
      this.error = false
    }
  },
  created () {
    // 清除缓存
    cookie.delCookie('token')
    cookie.delCookie('name')
    // 重新触发store
    // 更新store数据
    this.$store.dispatch('setInfo')
  }
}
</script>

<style lang="stylus" scoped>
  .iconstyle
    font-size :24px
    margin :10px
  .text
    margin-top :20px
    font-size :20px
  .margin
    margin :10px 0
  .err
    height :20px
    padding :0 20px
    color :red
  .width
    width :100%

</style>
