<template>
  <div class="qrcode-canvas" ref="qrcode"></div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  name: 'qrcode',
  props: {
    url: {
      type: String,
      default: 'https://www.baidu.com'
    },
    qrcodeWidth: {
      type: Number,
      default: 100
    },
    qrcodeHeight: {
      type: Number,
      default: 100
    },
    qrcodeColorDark: {
      type: String,
      default: '#000000'
    },
    qrcodeColorLight: {
      type: String,
      default: '#ffffff'
    }
  },
  mounted () {
    this.createQrcode()
  },
  methods: {
    createQrcode () {
      this.qrcode = new QRCode(this.$refs.qrcode, {
        text: this.url,
        width: this.qrcodeWidth,
        height: this.qrcodeHeight,
        colorDark: this.qrcodeColorDark,
        colorLight: this.qrcodeColorLight,
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    destroyQrcode () {
      this.qrcode.clear()
    }
  },
  watch: {
    url () {
      this.qrcode.makeCode(this.url)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
