<template>
  <div class="header">
    <div class="jcsb">
      <i class="el-icon-arrow-left iconstyle f26" @click="goBack"></i>
      <span class="f22 fle1">分类</span>
      <router-link to="/cart" class="colb pl10">
        <el-badge :value="3" class="item">
          <i class="el-icon-shopping-cart-1 f28"></i>
        </el-badge>
      </router-link>
    </div>
    <!--    搜索框-->
    <el-input
      size="small"
      placeholder="商品名称"
      v-model="search"
      class="search"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'categoryHeader',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    padding :.15rem .15rem 0 .15rem
    .search >>> .el-input__inner
      border :.01rem solid #EBEEF5
      background :#F2F6FC
      width :100%
      margin :.1rem 0
      border-radius :.06rem
</style>
