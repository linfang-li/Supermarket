<template>
  <div class="recommend" ref="recommend">
    <div class="content">
      <h2>商家推荐</h2>
      <div class="card">
        <div class="items" v-for="(item, index) of Goods" :key="item.id">
          <img :src="item.goods_front_image"
               class="image">
          <div class="text aisb">
            <h3 class="mb10">{{item.name + item.goods_brief}}</h3>
            <div class="jcsb col1">
              <h3 class="mr10 col4">￥{{item.shop_price}}</h3>
              <i class="el-icon-remove-outline f20"
                 @click="decrease(index, item.id, item.shop_cart_num)"></i>
              <h3>{{item.shop_cart_num}}</h3>
              <i class="el-icon-circle-plus f20" @click="increment(index, item.id, item.shop_cart_num)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import { addShopCart, updateShopCart } from '@/api/api'
export default {
  name: 'homeRecommend',
  computed: {
    ...mapState(['Goods'])
  },
  methods: {
    decrease (index, id, nums) {
      const that = this
      if (nums > 1) {
        updateShopCart(id, {
          nums: nums - 1
        }).then((response) => {
          that.Goods[index].shop_cart_num = response.data.nums
          // console.log(response.nums)
          // debugger
          // 更新store数据
          that.$store.dispatch('setShopList')
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    increment (index, id, nums) {
      const that = this
      if (!that.$store.state.userInfo.token) {
        that.$router.push({
          name: 'login'
        })
      } else {
        // 添加到购物车
        addShopCart({
          goods: id, // 商品id
          nums: 1 // 加入数量
        }).then((response) => {
          console.log(response.data)
          that.Goods[index].shop_cart_num = response.data.nums
          // 更新store数据
          that.$store.dispatch('setShopList')
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.recommend, {probeType: 1, click: true})
      } else {
        this.scroll.refresh()
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  .recommend
    position :absolute
    top :2.8rem
    left :0
    right :0
    bottom :.6rem
    z-index :-1
    overflow :hidden
    .content
      padding :.2rem
      .card
        display :flex
        justify-content :space-between
        flex-wrap: wrap
        .items
          flex-basis :44%
          margin :.1rem 0
          .image
            border-radius :.06rem .06rem 0 0
            width :100%
            height :1rem
          .text
            height :.6rem
            box-shadow : 0 0 .1rem #DCDFE6
            border-radius : 0 0 .06rem .06rem
            padding :.06rem
</style>
