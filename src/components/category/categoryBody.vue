<template>
  <!--    列表-->
  <div class="pw100">
    <div class="aside">
      <div class="sort"
           :class="click == item.id ?'Active' : '' "
           v-for="item of cateGory" :key="item.id"
           @click="cutTabClick(item.id)"
      >{{item.name}}
      </div>
    </div>
    <div class="main">
      <div class="list" v-for="(good, index) of showGoods" :key="good.id">
        <img :src="good.goods_front_image" alt="" class="imge">
        <div class="aisb fle1 pl10">
          <h3>{{good.name + good.goods_brief}}</h3>
          <div class="jcsb">
            <h3 class="col4">￥{{good.shop_price}}</h3>
            <div class="f22 col1 pr10">
              <i class="el-icon-remove-outline" @click="decrease(index, good.id, good.shop_cart_num)" v-show="good.shop_cart_num"></i>
              <span v-show="good.shop_cart_num">{{good.shop_cart_num}}</span>
              <i class="el-icon-circle-plus" @click="increment(index, good.id)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { updateShopCart, addShopCart } from '@/api/api'

export default {
  name: 'categoryBody',
  data () {
    return {
      click: this.$route.query.id
    }
  },
  computed: {
    ...mapState(['cateGory', 'Goods']),
    showGoods: function () {
      return this.Goods.filter(good => good.category.id === this.$route.query.id)
    }
  },
  methods: {
    decrease (index, id, nums) {
      const that = this
      if (nums > 1) {
        updateShopCart(id, {
          nums: nums - 1
        }).then((response) => {
          that.showGoods[index].shop_cart_num = response.data.nums
          // 更新store数据
          that.$store.dispatch('setShopList')
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    increment (index, id) {
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
          // console.log(response.data)
          that.showGoods[index].shop_cart_num = response.data.nums
          // 更新store数据
          that.$store.dispatch('setShopList')
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    cutTabClick (id) {
      this.click = id
      this.$router.push({
        name: 'category',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .aside
    background: #F2F6FC
    position: absolute
    top: 1rem
    width: 20%
    left: 0
    bottom: 0
    font-size: .18rem

    .sort
      height: .5rem
      padding: .15rem 0
      text-align: center
      overflow: hidden
      box-sizing: border-box

    .Active
      color: #409EFF
      background: #fff

  .main
    width: 80%
    float: right

    .list
      padding: .1rem
      height: .7rem
      display: flex

      .imge
        height :100%
        width :.8rem

</style>
