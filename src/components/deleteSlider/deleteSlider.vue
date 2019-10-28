<template>
<div>
  <div class="slider-item" data-type="0">
    <div class="content"
         @touchstart.prevent='touchStart'
         @touchmove.prevent='touchMove'
         @touchend.prevent='touchEnd'
         :style="deleteSlider">
      <!-- 插槽中放具体项目中需要内容 -->
      <slot></slot>
    </div>
    <div class="remove" ref='remove' @click.prevent="deleteItem(index)">
      <span>删除</span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    index: Number
  },
  data () {
    return {
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      deleteSlider: '', // 滑动时的效果,使用v-bind:style="deleteSlider"
      lastIndex: '',
      startY: 0, // 触摸位置
      endY: 0, // 结束位置
      moveY: 0 // 滑动时的位置
    }
  },
  methods: {
    touchStart (ev) {
      // console.log('index:', this.index)
      this.restSlide()
      ev = ev || event

      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕

      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX
        this.startY = ev.touches[0].clientY
      }
    },
    touchMove (ev) {
      ev = ev || event
      let parentElement = ev.currentTarget.parentElement
      // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd = this.$refs.remove.offsetWidth
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveY = ev.touches[0].clientY
        this.moveX = ev.touches[0].clientX
        if (Math.abs(this.moveY - this.startY) < 30) {
          // 起始位置减去 实时的滑动的距离，得到手指实时偏移距离
          this.disX = this.startX - this.moveX
          // 如果是向右滑动或者不滑动，不改变滑块的位置
          if (this.disX < wd / 2 || this.disX === 0) {
            this.deleteSlider = 'transform:translateX(0px)'
            parentElement.dataset.type = 0
            // 大于0，表示左滑了，此时滑块开始滑动
          } else if (this.disX > wd / 2) {
            // 具体滑动距离我取的是 手指偏移距离*5。
            parentElement.dataset.type = 1
            this.deleteSlider = 'transform:translateX(-' + this.disX + 'px)'

            // 最大也只能等于删除按钮宽度
            if (this.disX * 1.5 >= wd) {
              parentElement.dataset.type = 1
              this.deleteSlider = 'transform:translateX(-' + wd + 'px)'
            }
          }
        }
      }
    },
    touchEnd (ev) {
      ev = ev || event
      let parentElement = ev.currentTarget.parentElement
      let wd = this.$refs.remove.offsetWidth
      if (ev.changedTouches.length === 1) {
        let endY = ev.changedTouches[0].clientY
        if (Math.abs(this.startY - endY) < 30) {
          let endX = ev.changedTouches[0].clientX
          this.disX = this.startX - endX
          // console.log('touchEndthis.disX:', this.disX)
          // 如果距离小于删除按钮一半,强行回到起点

          if (this.disX < (wd / 2)) {
            parentElement.dataset.type = 0
            this.deleteSlider = 'transform:translateX(0px)'
          } else {
            // 大于一半 滑动到最大值
            parentElement.dataset.type = 1
            this.deleteSlider = 'transform:translateX(-' + wd + 'px)'
          }
          // console.log('touchEnd:dataset', parentElement.dataset.type)
        }
      }
    },
    restSlide () {
      let listItems = document.querySelectorAll('.slider-item')
      // console.log(listItems)
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].firstChild.style = 'transform:translateX(0' + 'rem)'
      }
    },
    deleteItem: function (index) {
      this.$emit('deleteItem', index)
      this.deleteSlider = 'transform:translateX(0' + 'rem)'
    }
  }
}
</script>
<style scoped>
.slider-item {
  width: 100%;
  position: relative;
  user-select: none;
}

.content {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  transition: 0.6s;
}

.remove {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 1rem;
  height: 100%;
  background: #409EFF;
  right: 0;
  top: 0;
  color: #fff;
  font-size: .24rem;
}
</style>
