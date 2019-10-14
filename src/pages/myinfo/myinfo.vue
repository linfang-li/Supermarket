<template>
  <div>
    <div class="header">
      <i class="el-icon-arrow-left iconstyle f26" @click="goBack"></i>
      <span class="f22">我的</span>
    </div>
    <div class="info" v-if="this.$store.state.userInfo.token">
      <img src="@/assets/img/touxiang.jpeg" alt="">
      <h1 class="pl10">admin</h1>
    </div>
    <div class="info" v-else>
      <img src="@/assets/img/weidenglu.jpeg" alt="">
      <h1 class="pl10">立即登录</h1>
    </div>
    <div class="address just">
      <i class="el-icon-location-information"></i>
      <p class="fle1 f18 pl10">我的收获地址</p>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="address" @click="goLogin">
      <i class="el-icon-switch-button"></i>
      <p class="f18 pl10">退出登录</p>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from '@/components/myinfo/myFooter'
export default {
  name: 'myinfo',
  components: {
    myFooter
  },
  methods: {
    goBack () {
      this.$router.push('/')
    },
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    background :#409EFF
    color :#fff
    padding :.15rem .1rem
  .info
    display :flex
    align-items :center
    color :#fff
    background :#409EFF
    height :1rem
    padding :.05rem .2rem
    img
      width :.8rem
      border-radius: 50%
  .address
    width :100%
    box-sizing :border-box
    display :flex
    align-items :center
    padding :.2rem
    border-bottom :.01rem solid #EBEEF5
    i
      color :#409EFF
      font-size :.24rem
</style>
