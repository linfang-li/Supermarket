<template>
  <div class="box">
    <p class="f24">Supermarket</p>
    <el-input
      size="small"
      placeholder="商品名称"
      v-model="search"
      class="search"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-carousel height="1.3rem" class="container">
      <el-carousel-item v-for="item in banners" :key="item.goods">
        <img :src="item.image" alt="" class="pw100"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {bannerGoods} from '@/api/api'
export default {
  name: 'homeHeader',
  data () {
    return {
      search: '',
      banners: []
    }
  },
  methods: {
    getBanner () {
      bannerGoods()
        .then((response) => {
          this.banners = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    this.getBanner()
  }
}
</script>

<style lang="stylus" scoped>
  .box
    color :white
    .search
      width :100%
      margin :.1rem 0
      border-radius :.06rem
    .container
      width :100%
      border-radius :.12rem
</style>
