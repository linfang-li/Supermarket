<template>
  <div>
    <category-header></category-header>
    <category-body></category-body>
  </div>
</template>

<script>
import categoryHeader from '@/components/category/categoryHeader'
import categoryBody from '@/components/category/categoryBody'

export default {
  name: 'category',
  components: {
    categoryHeader,
    categoryBody
  }
}
</script>

<style lang="stylus" scoped>
</style>
