<template>
  <div class="catalog-wrapper">
    <h3 class="title"><i></i>目录</h3>
    <div class="catalog-content">
      <scroll
        :data="catalogList">
        <ul>
          <li
            :class="{unit: item.unit, 'unit-item': item['unit-item'], active: index === catalogActive}"
            v-for="(item, index) of catalogList"
            :key="item.id">
            <div v-if="item.unit">
              <i></i>
              <span>第{{item.label}}单元 <b>{{item.name}}</b></span>
            </div>
            <div v-else @click="handleClickChangeData(index)">
              <span :style="{ paddingLeft: (item.label.match(/\.\d+/g).length * 10) + 40 + 'px' }">{{item.label}}&nbsp;{{item.name}}</span>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
/* 引入滑屏组件 */
import Scroll from './scroll'
import { courseMixins } from '../../utils/mixin'

export default {
  name: 'catalog',
  props: {
    catalogList: {
      type: Array,
      default () {
        return []
      }
    },
    catalogActive: {
      type: Number,
      default: -1
    }
  },
  mixins: [courseMixins],
  components: {
    Scroll
  },
  methods: {
    /* 点击章节切换目录高亮样式 */
    handleClickChangeData (v) {
      if (v !== this.catalogActive) {
        this.$emit('changecatalogactive', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/mixin";
  @import "../../assets/styles/variable";
  .catalog-wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px 40px;
    position: relative;
    background: #fafafa;
    .title {
      font-size: 34px;
      color: $active-color;
      line-height: 36px;
      font-weight: bold;
      display: flex;
      align-items: center;
      i {
        display: inline-block;
        width: 0;
        height: 0;
        border: 17px solid;
        border-color: transparent transparent transparent $active-color;
      }
    }
    .catalog-content {
      position: absolute;
      top: 100px;
      right: 40px;
      bottom: 20px;
      left: 40px;
      .unit {
        width: 100%;
        div {
          font-size: 20px;
          font-weight: bold;
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid $active-color;
            position: relative;
            &::before {
              content: "";
              width: 20px;
              height: 20px;
              background: $active-color;
              border-radius: 50%;
              position: absolute;
              top: 4px;
              left: 4px;
            }
          }
          span {
            line-height: 34px;
            padding-left: 16px;
            flex: 1;
            @include ellipsis;
          }
        }
      }
      .unit-item {
        width: 100%;
        div {
          width: 100%;
          @include ellipsis;
          span {
            display: inline-block;
            line-height: 34px;
            font-size: $introduction-font-size;
          }
        }
        &.active {
          span {
            color: $active-color;
          }
        }
      }
    }
  }
</style>
