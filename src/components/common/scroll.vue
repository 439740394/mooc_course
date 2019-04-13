<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll" ref="scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    tap: {
      type: Boolean,
      default: false
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    videoInfo: {
      type: [Array, String, Object],
      default: null
    },
    data: {
      type: [Array, String, Object],
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    pulldown: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    scrollbar: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, this.refreshDelay)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      let scrollbar = false
      if (this.scrollBarInfo) {
        scrollbar = {
          fade: true,
          interactive: true
        }
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        tap: this.tap,
        scrollbar: scrollbar,
        disableMouse: false,
        disableTouch: false
      })
      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', (pos) => {
          _this.$emit('scroll', pos)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  computed: {
    scrollBarInfo () {
      return this.scrollbar
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
        this.scrollTo(0, 0, 0)
      }, this.refreshDelay)
    },
    videoInfo () {
      setTimeout(() => {
        this.refresh()
        this.scrollTo(0, 0, 0)
      }, this.refreshDelay)
    }
  }
}
</script>

<style lang="scss">
  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .scroll {
      *zoom: 1;
      &::before, &::after {
        content: "";
        height: 0;
        display: block;
        clear: both;
      }
    }
  }
</style>
