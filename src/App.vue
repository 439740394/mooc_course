<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import { bind } from './utils/utils'

export default {
  name: 'APP',
  mounted () {
    this._reset()
  },
  methods: {
    /* 初始化禁止默认事件 */
    _reset () {
      /* 禁止键盘事件 */
      bind(document, 'keydown', (ev) => {
        const e = ev || window.event
        e.preventDefault()
      })
      /* 禁止鼠标右键以及长按事件 */
      bind(document, 'contextmenu', (ev) => {
        const e = ev || window.event
        e.preventDefault()
      })
      /* 禁止拖拽事件 */
      bind(document, 'dragstart', (ev) => {
        const e = ev || window.event
        e.preventDefault()
      })
      /* 禁止双指缩放 */
      bind(document, 'touchmove', (ev) => {
        const e = ev || window.event
        const touchesLength = e.changedTouches.length
        if (touchesLength > 1) {
          e.preventDefault()
          e.stopPropagation()
        }
      }, true)
    }
  }
}
</script>

<style lang="scss" scoped>
  #app {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
