<template>
  <div class="cart">
    <div class="jcsb">
      <i class="el-icon-arrow-left iconstyle f26" @click="goBack"></i>
      <span class="f22 fle1">购物车</span>
      <span class="f20">管理</span>
    </div>
    <!-- 购物车列表   -->
    <div class="list" v-if="goodsList.goodsList" v-for="(item, index) of goodsList.goodsList" :key="item.goods.id">
      <i class="el-icon-success f24 col1"></i>
      <div class="w90 ml10 mr10"><img :src="item.goods.goods_front_image" alt="" class="pw100"></div>
      <div class="aisb details fle1">
        <h3>{{item.goods.name + item.goods.goods_brief}}</h3>
        <div class="jcsb">
          <h3 class="col4">￥{{item.goods.shop_price}}</h3>
          <div class="f22 col1">
            <i class="el-icon-remove-outline"
               @click="decrease(index, item.goods.id, item.nums)"
            ></i>
            <span>{{item.nums}}</span>
            <i class="el-icon-circle-plus" @click="increment(index, item.goods.id, item.nums)"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车为空   -->
    <div class="box" v-else>
      <img src="@/assets/img/timg.gif" class="pw66 bra8">
      <el-button type="danger" round plain class="mt15">去逛逛</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateShopCart } from '@/api/api'
export default {
  name: 'cartBody',
  computed: {
    ...mapState(['goodsList'])
  },
  methods: {
    goBack () {
      this.$router.push('/')
    },
    // 减少数量
    decrease (index, id, nums) {
      updateShopCart(id, {
        nums: nums - 1
      }).then((response) => {
        this.goodsList.goodsList[index].nums = response.nums
        // 更新store数据
        this.$store.dispatch('setShopList')
        // 更新总价
        this.setTotalPrice()
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 添加数量
    increment (index, id, nums) {
      updateShopCart(id, {
        nums: nums + 1
      }).then((response) => {
        this.goodsList.goodsList[index].nums = response.nums
        // 更新store数据
        this.$store.dispatch('setShopList')
        // 更新总价
        this.setTotalPrice()
      }).catch(function (error) {
        console.log(error)
      })
    }
    // 添加到购物车
    // addShopCart({
    //   goods: goodId, // 商品id
    //   nums: 1 // 加入数量
    // }).then((response) => {
    //   // 更新store数据
    //   this.$store.dispatch('setShopList')
    // }).catch(function (error) {
    //   console.log(error)
    // })
    // 计算总价格
    // setTotalPrice(){
    //   var goods_list = this.goods.goods_list;
    //   var totalPrice = 0;
    //   for(var i = 0;i<goods_list.length;i++){
    //     totalPrice=totalPrice+goods_list[i].nums* goods_list[i].goods.shop_price;
    //   }
    //   this.totalPrice = totalPrice;
    // }
    // 删除购物车商品
    // deleteGoods(index,id) {
    //   deleteShopCart(id).then((response)=> {
    //     console.log(response.data);
    //     this.goods.goods_list.splice(index,1);
    //
    //     // 更新store数据
    //     this.$store.dispatch('setShopList');
    //
    //   }).catch(function (error) {
    //     console.log(error);
    //   })
    // }
  }
}
</script>

<style lang="stylus" scoped>
  .cart
    position :fixed
    box-sizing: border-box
    width: 100%
    height: 100%
    padding :.15rem
    background :rgb(217, 236, 255)
    z-index :-10
    .list
      display: flex
      align-items: center
      box-sizing: border-box
      width :100%
      height: 1rem
      background: #fff
      border-radius: .06rem
      padding: .06rem .1rem
      margin-top: .2rem

      .details
        height: .66rem

    .box
      height: 5rem
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
</style>
