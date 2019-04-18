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
import { bind } from './utils/utils'

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
      document.addEventListener(document, 'keydown', (ev) => {
        const e = ev || window.event
        e.preventDefault()
      })
      document.addEventListener(document, 'contextmenu', (ev) => {
        const e = ev || window.event
        e.preventDefault()
      })
      document.addEventListener(document, 'dragstart', (ev) => {
        const e = ev || window.event
        e.preventDefault()
      })
      document.addEventListener(document, 'touchstart', (ev) => {
        const e = ev || window.event
        const touchesLength = e.touches.length
        if (touchesLength > 1) {
          e.preventDefault()
        }
      }, { passive: false })
      document.addEventListener(document, 'touchmove', (ev) => {
        const e = ev || window.event
        const touchesLength = e.touches.length
        if (touchesLength > 1) {
          e.preventDefault()
        }
      }, { passive: false })
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
