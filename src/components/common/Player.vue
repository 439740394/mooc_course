<template>
    <Xgplayer :config="config" @player="Player = $event"/>
</template>

<script>
import Xgplayer from 'xgplayer-vue'
export default {
  name: 'xgPlayer',
  props: {
    videoUrl: {
      type: String,
      default: 'https://video-qn.ibaotu.com/00/48/92/18T888piCJkI.mp4'
    },
    poster: {
      type: String,
      default: ''
    }
  },
  components: {
    Xgplayer
  },
  data () {
    return {
      config: {
        id: 'xg-player',
        url: this.videoUrl,
        fluid: true,
        volume: 1,
        autoplay: false,
        poster: this.poster,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        rotate: {
          innerRotate: true,
          clockwise: false
        },
        download: false,
        enterLogo: {
          url: '/template/static/images/logo.png',
          width: 149,
          height: 62
        },
        enterBg: {
          color: 'rgba(0,0,0,0.87)'
        },
        enterTips: {
          background: 'linear-gradient(to right, rgba(0,0,0,0.87), #3D96FD, rgba(86,195,248), #3D96FD, rgba(0,0,0,0.87))'
        },
        pip: false,
        cssFullscreen: false,
        screenShot: false,
        keyShortcut: 'off'
      },
      Player: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
