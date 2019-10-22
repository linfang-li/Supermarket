<template>
  <div class="background1">
    <div class="background2">
      <home-header></home-header>
      <home-icon></home-icon>
    </div>
    <home-recommend></home-recommend>
  </div>
</template>

<script>
import homeHeader from '@/components/home/homeHeader'
import homeIcon from '@/components/home/homeIcon'
import homeRecommend from '@/components/home/homeRecommend'

export default {
  name: 'home',
  components: {
    homeHeader,
    homeIcon,
    homeRecommend
  },
  created () {
    // this.$store.dispatch('setInfo')
    this.$store.dispatch('setCategory')
    this.$store.dispatch('setGoods')
    // this.$store.dispatch('setShopList')
  }
}
</script>

<style lang="stylus" scoped>
  .background1
    background :#f8f8f8
    position :absolute
    top :0
    right :0
    left :0
    height :100%
    z-index :-10
    .background2
      position :fixed
      left :0
      right :0
      background :#409EFF
      height :1.5rem
      border-radius :0 0 .3rem .3rem
      padding :.15rem
</style>
