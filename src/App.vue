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
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (e) => {
    e.preventDefault()
  })
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
  document.addEventListener('dragstart', (e) => {
    e.preventDefault()
  })
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length >= 2) {
      e.preventDefault()
    }
  }, { passive: false })
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length >= 2) {
      e.preventDefault()
    }
  }, { passive: false })
})

export default {
  name: 'APP',
  data () {
    return {
      transitionName: ''
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
