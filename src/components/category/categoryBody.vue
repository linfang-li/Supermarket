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
      <div class="list" v-for="good of showGoods" :key="good.id">
        <img :src="good.goods_front_image" alt="" class="imge">
        <div class="aisb fle1 pl10">
          <h3>{{good.name + good.goods_brief}}</h3>
          <div class="jcsb">
            <h3 class="col4">￥{{good.shop_price}}</h3>
            <div class="f22 col1 pr10">
              <i class="el-icon-remove-outline" @click="decrease" v-show="count"></i>
              <span v-show="count">{{count}}</span>
              <i class="el-icon-circle-plus" @click="increment"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'categoryBody',
  data () {
    // console.log(this.$route.query.id)
    return {
      click: this.$route.query.id,
      count: 0
    }
  },
  computed: {
    ...mapState(['cateGory', 'Goods']),
    showGoods: function () {
      return this.Goods.filter(good => good.category.id === this.$route.query.id)
    }
  },
  methods: {
    decrease () {
      this.count--
    },
    increment () {
      this.count++
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
