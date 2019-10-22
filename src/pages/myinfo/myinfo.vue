<template>
  <div>
    <div class="info">
      <img src="@/assets/img/touxiang.jpeg" alt="">
      <h1 class="pl10">admin</h1>
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
  </div>
</template>

<script>
export default {
  name: 'myinfo',
  methods: {
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .info
    display :flex
    align-items :center
    color :#fff
    background :#409EFF
    height :1.5rem
    padding :0 .2rem
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
