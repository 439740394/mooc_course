<template>
  <div>
    <video-player  class="video-player-box vjs-big-play-centered"
                   ref="videoPlayer"
                   :options="playerOptions"
                   :playsinline="true">
    </video-player>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
export default {
  name: 'player',
  components: {
    videoPlayer
  },
  props: {
    videoUrl: {
      type: String,
      default: 'http://s1.ananas.chaoxing.com/video/75/a0/82/4c423a0c5f696920852fd11c4d0b4df7/hd.mp4?at_=1546054208928&ak_=1b7379e51f6b9895fc1db610901bc5c2&ad_=8e901b89d486e2f91de3301278deb404'
    },
    poster: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        inactivityTimeout: 3000,
        nativeControlsForTouch: false,
        fluid: true,
        aspectRatio: '16:9',
        sources: [{
          type: 'video/mp4',
          src: this.videoUrl
        }],
        poster: this.poster,
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          playToggle: true,
          currentTimeDisplay: true,
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          liveDisplay: false,
          seekToLive: false,
          progressControl: true,
          volumePanel: false,
          customControlSpacer: true,
          PlaybackRateMenuButton: false,
          chaptersButton: false,
          descriptionsButton: false,
          subsCapsButton: false,
          audioTrackButton: false,
          fullscreenToggle: true
        }
      }
    }
  },
  methods: {
    /* 播放 */
    _pause () {
      this.videoPlayer.pause()
    },
    /* 播放 */
    _play () {
      this.videoPlayer.play()
    }
  },
  computed: {
    videoPlayer () {
      return this.$refs.videoPlayer.player
    }
  },
  watch: {
    videoUrl (v) {
      this.videoPlayer.src(v)
      this.videoPlayer.load()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
