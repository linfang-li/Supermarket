<template>
  <div>
    <ul class="cartlist" ref="cartlist" v-if="goodsList">
      <li>
        <delete-slider
          v-for="(item, index) of goodsList"
          :key="item.goods.id"
          :index="index"
          @deleteItem="deletegoods(index, item.goods.id)"
        >
          <div class="list">
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
        </delete-slider>
      </li>
    </ul>
    <!--  底部 -->
    <tr class="footer">
      <td>
        <input
          type="checkbox"
          id="all"
          v-model="checkAll"
          @click="handleCheckAll"
        />
        <label for="all">全选</label>
      </td>
      <td>
        合计: <span class="col4">￥{{sumPrice}}</span>
        <el-button type="danger" plain round>结算</el-button>
      </td>
    </tr>
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
import deleteSlider from '@/components/deleteSlider/deleteSlider'
import { deleteShopCart } from '@/api/api'

export default {
  name: 'cartList',
  components: {
    deleteSlider
  },
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
    // 删除商品
    deletegoods (index, id) {
      deleteShopCart(id).then((response) => {
        this.goodsList.splice(index, 1)
        // 更新store数据
        this.$store.dispatch('setShopList')
      }).catch(function (error) {
        console.log(error)
      })
    },
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
  mounted () {
    const that = this
    this.$store.state.goodsList.forEach(item => {
      Vue.set(item, 'checked', false)
      // Vue 解决不能检测到对象属性的添加或删除
      // item.checked = false; //如果为真实数据直接设置的对象改变值不会更新视图
      that.checkeds.push(item.checked)
    })
    // 滚动
    this.$nextTick(() => {
      if (!this.scroll) {
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.cartlist, {probeType: 1, click: true})
      } else {
        this.scroll.refresh()
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  .footer
    display :flex
    align-items:center
    justify-content:space-between
    font-size :.2rem
    position: fixed
    background: #fff
    bottom: .6rem
    left: 0
    right: 0
    box-sizing: border-box
    padding: .15rem
    height: .6rem
    border-top: .01rem solid #E4E7ED
    z-index: 1
  .cartlist
    position :absolute
    top :.5rem
    left :0
    right :0
    bottom :1.2rem
    padding :.15rem
    overflow: hidden
    .list
      display: flex
      align-items: center
      height: 1rem
      background: #fff
      box-sizing :border-box
      padding:0 .1rem
      margin: .15rem 0
      .label
        width :.8rem
        height :1rem
      .details
        height: .66rem

    .delete
      border-radius: 0
      height: 1rem
</style>
