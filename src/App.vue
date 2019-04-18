<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'APP',
  data () {
    return {
      transitionName: ''
    }
  },
  mounted () {
    this._reset()
  },
  methods: {
    /* 初始化禁止默认事件 */
    _reset () {
      /* 禁止键盘事件 */
      this.bind(document, 'keydown', (ev) => {
        const e = ev || window.event
        e.preventDefault()
      })
      /* 禁止鼠标右键以及长按事件 */
      this.bind(document, 'contextmenu', (ev) => {
        const e = ev || window.event
        e.preventDefault()
      })
      /* 禁止拖拽事件 */
      this.bind(document, 'dragstart', (ev) => {
        const e = ev || window.event
        e.preventDefault()
      })
      /* 禁止双指缩放 */
      this.bind(document, 'touchmove', (ev) => {
        const e = ev || window.event
        const touchesLength = e.changedTouches.length
        if (touchesLength > 1) {
          e.preventDefault()
          e.stopPropagation()
        }
      })
    },
    bind (el, event, callback) {
      if (el.addEventListener) {
        el.addEventListener(event, callback, { passive: false })
      } else {
        el.attachEvent('on' + event, () => {
          callback.call(el)
        })
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.meta.transition === 1 && from.meta.transition === 0) {
        this.transitionName = 'slide-right'
      } else if (to.meta.transition === 0 && from.meta.transition === 1) {
        this.transitionName = 'slide-left'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./assets/styles/transition";
  #app {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
