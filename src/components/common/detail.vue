<template>
  <div class="detail-wrapper">
    <div class="detail-content">
      <scroll :data="text" :videoInfo="videoInfo">
        <div class="detail-video" v-if="videoInfo.src">
          <player :videoUrl="videoInfo.src" :poster="videoInfo.poster"></player>
        </div>
        <div class="detail">
          <div class="detail-text" v-html="text"></div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { courseMixins } from '../../utils/mixin'
/* 引入滑屏组件 */
import Scroll from './scroll'
/* 引入视频组件 */
import Player from './Player'

export default {
  name: 'detail.vue',
  props: {
    text: {
      type: String,
      default: ''
    },
    videoInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mixins: [courseMixins],
  components: {
    Scroll,
    Player
  }
}
</script>

<style lang="scss">
  @import "../../assets/styles/variable";
  .detail-wrapper {
    flex: 1;
    box-sizing: border-box;
    padding: 60px 30px;
    iframe {
      display: none;
    }
    .detail-content {
      width: 100%;
      height: 100%;
      .detail-video {
        margin-bottom: 20px;
      }
      .detail-text {
        p {
          padding-bottom: 20px;
          text-indent: 2rem;
          height: auto;
          line-height: 1.8;
          * {
            font-size: $title-font-size;
          }
          img {
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
  }
</style>
