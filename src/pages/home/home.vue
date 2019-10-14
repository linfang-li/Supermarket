<template>
  <keep-alive>
    <div class="background1">
      <div class="background2">
        <home-header></home-header>
        <home-icon></home-icon>
      </div>
      <home-recommend></home-recommend>
      <home-footer></home-footer>
    </div>
  </keep-alive>
</template>

<script>
import homeHeader from '@/components/home/homeHeader'
import homeIcon from '@/components/home/homeIcon'
import homeRecommend from '@/components/home/homeRecommend'
import homeFooter from '@/components/home/homeFooter'

export default {
  name: 'home',
  components: {
    homeHeader,
    homeIcon,
    homeRecommend,
    homeFooter
  },
  created () {
    this.$store.dispatch('setCategory')
    this.$store.dispatch('setGoods')
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
