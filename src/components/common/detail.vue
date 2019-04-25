<template>
  <div class="detail-wrapper">
    <div class="detail-content">
      <scroll :title="title" :data="text" :videoInfo="videoInfo">
        <h3 class="detail-title">{{title}}</h3>
        <div class="detail-video" v-if="videoInfo.length > 0">
          <player :id="item.id" :videoUrl="item.src" :poster="item.poster" v-for="(item, index) of videoInfo" :key="index"></player>
        </div>
        <div class="detail">
          <div class="detail-text" v-html="text"></div>
        </div>
      </scroll>
    </div>
    <transition name="fade">
      <div class="detail-mask" v-show="detailAlive">
        <loading></loading>
      </div>
    </transition>
  </div>
</template>

<script>
import { courseMixins } from '../../utils/mixin'
/* 引入滑屏组件 */
import Scroll from './scroll'
/* 引入视频组件 */
import Player from './Player'
/* 引入加载动画组件 */
import Loading from './loading'

export default {
  name: 'detail.vue',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    videoInfo: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mixins: [courseMixins],
  components: {
    Scroll,
    Player,
    Loading
  }
}
</script>

<style lang="scss">
  @import "../../assets/styles/variable";
  @import "../../assets/styles/mixin";
  @import "../../assets/styles/transition";
  .detail-wrapper {
    position: relative;
    flex: 1;
    box-sizing: border-box;
    padding: 60px 30px;
    .detail-content {
      width: 100%;
      height: 100%;
      .detail-title {
        font-size: 22px;
        line-height: 1.5;
        margin-bottom: 20px;
      }
      .detail-video {
        margin-bottom: 30px;
      }
      .detail-text {
        iframe {
          display: none;
        }
        p {
          padding-bottom: 20px;
          text-indent: 2rem;
          height: auto;
          line-height: 1.8;
          * {
            font-size: $title-font-size;
            color: #333333;
          }
          img {
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
    .detail-mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 11;
      @include column-Center;
    }
  }
</style>
