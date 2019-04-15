<template>
  <div class="qrcode-canvas" ref="qrcode"></div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  name: 'qrcode',
  props: {
    qrcodeUrl: {
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
        text: this.qrcodeUrl,
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
    qrcodeUrl () {
      this.qrcode.makeCode(this.qrcodeUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
