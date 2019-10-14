<template>
  <div>
    <cart-body></cart-body>
    <cart-footer></cart-footer>
  </div>
</template>

<script>
import cartBody from '@/components/cart/cartBody'
import cartFooter from '@/components/cart/cartFooter'
export default {
  name: 'cart',
  components: {
    cartBody,
    cartFooter
  },
  created () {
    this.$store.dispatch('setShopList')
  }
}
</script>

<style lang="stylus" scoped>
</style>
