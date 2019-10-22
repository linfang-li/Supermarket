<template>
  <div>
    <div class="cart">
      <p class="f24">购物车</p>
      <!-- 购物车列表   -->
      <div class="cartlist" ref="cartlist" v-if="goodsList">
        <div>
          <div class="list"
               v-for="(item, index) of goodsList"
               :key="item.goods.id"
          >
            <input
              type="checkbox"
              :id="item.goods.id"
              name="checkboxs"
              v-model="checkeds[index]"
            />
            <div class="w90 ml10 mr10">
              <img :src="item.goods.goods_front_image" class="pw100">
            </div>
            <div class="aisb details fle1">
              <h3>{{item.goods.name + item.goods.goods_brief}}</h3>
              <div class="jcsb">
                <h3 class="col4">￥{{item.goods.shop_price}}</h3>
                <div class="disf f22 col1">
                  <i class="el-icon-remove-outline"
                     @click="decrease(index, item.nums)"
                  ></i>
                  <p class="tac minw30">{{item.nums}}</p>
                  <i class="el-icon-circle-plus" @click="increment(index, item.nums)"></i>
                </div>
              </div>
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
    <!--  底部 -->
    <div class="footer">
      <input
        type="checkbox"
        id="all"
        v-model="checkAll"
        @click="handleCheckAll"
      />
      <label for="all">全选</label>
      <div class="f20 disf">
        <p class="mr20">合计: <span class="col4">￥{{sumPrice}}</span></p>
        <el-button type="danger" plain round>结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import {mapState} from 'vuex'

export default {
  name: 'cart',
  data () {
    return {
      checkAll: false,
      checkeds: []
    }
  },
  computed: {
    ...mapState(['goodsList']),
    sumPrice: function () {
      let sum = 0
      for (let i = 0; i < this.checkeds.length; i++) {
        // 如果checkeds[i]的结果为truth，则进行累加
        if (this.checkeds[i] === true) {
          sum += this.goodsList[i].nums * this.goodsList[i].goods.shop_price
        }
      }
      return sum
    }
  },
  watch: { // 监视双向绑定的数据数组
    checkeds: {
      handler () {
        if (this.checkeds.indexOf(false) === -1) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      }
    }
  },
  methods: {
    // 减少数量
    decrease (index, nums) {
      if (nums > 1) {
        let goodnum = nums - 1
        this.goodsList[index].nums = goodnum
        // 更新store数据
        let goodInfo = {
          index: index,
          goodnum: goodnum
        }
        this.$store.dispatch('updateShopList', goodInfo)
      }
    },
    // 添加数量
    increment (index, nums) {
      let goodnum = nums + 1
      this.goodsList[index].nums = goodnum
      // 更新store数据
      let goodInfo = {
        index: index,
        goodnum: goodnum
      }
      this.$store.dispatch('updateShopList', goodInfo)
    },
    //  全选
    handleCheckAll () {
      if (this.checkAll) {
        this.checkAll = false
      } else {
        this.checkAll = true
      }
      for (let i = 0; i < this.checkeds.length; i++) {
        Vue.set(this.checkeds, i, this.checkAll)
      }
    }
  },
  created () {
    this.$store.dispatch('setShopList')
  },
  updated () {
    if (!this.scroll) {
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.cartlist, {probeType: 1, click: true})
    } else {
      this.scroll.refresh()
    }
  },
  mounted () {
    const that = this
    this.$store.state.goodsList.forEach(item => {
      Vue.set(item, 'checked', false)
      // Vue 解决不能检测到对象属性的添加或删除
      // item.checked = false; //如果为真实数据直接设置的对象改变值不会更新视图
      that.checkeds.push(item.checked)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .footer
    display :flex
    align-items:center
    justify-content:space-between
    position :fixed
    background :#fff
    bottom :.6rem
    left :0
    right :0
    box-sizing: border-box
    padding :.15rem
    height :.6rem
    border-top :.01rem solid #E4E7ED
    z-index :1
  .cart
    position :fixed
    box-sizing: border-box
    width: 100%
    height: 100%
    padding :.15rem
    background :rgb(217, 236, 255)
    z-index :-10

    .cartlist
      position :absolute
      top :.6rem
      left :0
      right :0
      bottom :1.2rem
      padding :.15rem
      overflow: hidden
      .list
        display: flex
        align-items: center
        width :100%
        height: 1rem
        background: #fff
        border-radius: .06rem
        box-sizing :border-box
        padding: 0 .1rem
        margin: .15rem 0
        .details
          height: .66rem

    .box
      height: 5rem
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
</style>
