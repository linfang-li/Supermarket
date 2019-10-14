<template>
  <div class="footer">
    <div>
      <i class="el-icon-success f24 col1"></i><span class="f18">全选</span>
    </div>
    <div class="f20 disf">
      <p class="mr20">合计: <span class="col4">$0</span></p>
      <el-button type="danger" plain round>结算</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartFooter'
}
</script>

<style lang="stylus" scoped>
  .footer
    display :flex
    align-items:baseline
    justify-content:space-between
    position :fixed
    background :#fff
    bottom :0
    left :0
    right :0
    box-sizing: border-box
    padding :.15rem
    height :.66rem
    border-top :.01rem solid #E4E7ED
    z-index :1

</style>
