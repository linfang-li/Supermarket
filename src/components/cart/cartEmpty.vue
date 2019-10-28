<template>
  <div class="box">
    <img src="@/assets/img/timg.gif" class="pw80 bra8">
    <el-button type="danger" plain class="button" @click="tohome">去逛逛</el-button>
  </div>
</template>

<script>
export default {
  name: 'cartEmpty',
  methods: {
    tohome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box
    height: 5rem
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    .button
      margin-top :.4rem
      font-size :.2rem
      width :1.6rem
</style>
