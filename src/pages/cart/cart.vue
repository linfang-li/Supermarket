<template>
  <div class="background">
    <p class="f24">购物车</p>
    <cart-list v-if="$store.state.goodsList.length"></cart-list>
    <cart-empty v-else></cart-empty>
  </div>
</template>

<script>
import cartEmpty from '@/components/cart/cartEmpty'
import cartList from '@/components/cart/cartList'
export default {
  name: 'cart',
  components: {
    cartEmpty,
    cartList
  },
  created () {
    this.$store.dispatch('setShopList')
  }
}
</script>

<style lang="stylus" scoped>
  .background
    position :fixed
    box-sizing :border-box
    width: 100%
    height: 100%
    padding :.15rem
    background :rgb(217, 236, 255)
    z-index :-10
</style>
