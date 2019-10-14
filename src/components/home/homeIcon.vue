<template>
  <el-row class="container">
    <div v-for="item in cateGory" :key="item.id" @click="handleClick(item.id)">
      <el-button type="danger" plain>{{item.name}}</el-button>
    </div>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'homeIcon',
  computed: {
    ...mapState([ 'cateGory' ])
  },
  methods: {
    handleClick (id) {
      // console.log(id)
      // debugger
      this.$router.push({
        name: 'category',
        // 只是把query改了，其他都没变
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    background :#f8f8f8
    padding :.18rem 0 .13rem 0
    display :flex
    justify-content: space-between
</style>
