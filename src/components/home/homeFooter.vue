<template>
  <div class="footer">
    <div :class="click == item.id ?'Active' : '' "
         v-for="item of content" :key="item.id"
         @click="menuClick(item)"><i :class="item.icon"></i><p>{{item.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeFooter',
  data () {
    return {
      click: 1,
      content: [
        {id: 1, icon: 'el-icon-house', text: '首页', path: 'home'},
        {id: 2, icon: 'el-icon-shopping-cart-1', text: '购物车', path: 'cart'},
        {id: 3, icon: 'el-icon-document', text: '订单', path: 'order'},
        {id: 4, icon: 'el-icon-user', text: '我的', path: 'myinfo'}
      ]
    }
  },
  methods: {
    menuClick (item) {
      this.click = item.id
      this.$router.push({ name: item.path })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .footer
    z-index :99
    display :flex
    justify-content :space-around
    align-items :center
    position :fixed
    left :0
    right :0
    bottom :0
    height :.6rem
    background :#fff
    color :#606266
    border-top :.01rem solid #EBEEF5
    i
      font-size :.28rem
    p
      font-size :.12rem
      text-align :center
      padding :.02rem 0
    .Active
      color: #409EFF
</style>
