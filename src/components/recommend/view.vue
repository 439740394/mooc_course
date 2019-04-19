<template>
  <div class="recommend-view">
    <div class="top">
      <div class="nav">
        <div class="nav-content">
          <div
            v-for="(item, index) of recommendNavList" :key="index"
            class="nav-item"
            :class="{active: item === recommendActiveName}"
            @click.stop="handleClickBackTo(item)">
            <span>{{item}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="catalog-pos">
        <catalog :catalogList="recommendCatalogList" :catalogActive="recommendCatalogActive" @changecatalogactive="changeCatalogActive"></catalog>
      </div>
      <div class="detail-pos">
        <detail :text="recommendDetailText" :videoInfo="recommendDetailVideoInfo"></detail>
        <detail-tips :qrcodeUrl="recommendQrcodeUrl"></detail-tips>
      </div>
      <div class="back" @click.stop="backHistory">
        <img src="../../assets/images/back_icon.png" alt="">
      </div>
    </div>
    <div class="loading-wrapper" v-show="recommendCatalogList.length < 1">
      <loading></loading>
    </div>
  </div>
</template>

<script>
/* 引入vue混入方法 */
import { courseMixins } from '../../utils/mixin'
/* 引入目录组件 */
import Catalog from '../common/catalog'
/* 引入详情组件 */
import Detail from '../common/detail'
/* 引入二维码提示组件 */
import DetailTips from '../common/detailTips'
/* 引入加载组件 */
import Loading from '../common/loading'

export default {
  name: 'recommendView',
  mixins: [courseMixins],
  components: {
    Catalog,
    Detail,
    DetailTips,
    Loading
  },
  created () {
    this.getData()
  },
  methods: {
    /* 修改当前目录显示高亮及变换数据 */
    changeCatalogActive (v) {
      this.setRecommendCatalogActive(v)
    },
    /* 点击导航返回上一级 */
    handleClickBackTo (v) {
      this.reset()
      this.setRecommendActiveName(v)
      this.$router.push('/recommend')
    },
    /* 获取目录数据 */
    getData () {
      /* 自动获取数据 */
      const courseId = this.$route.params.id
      this.getCatalogById(courseId).then(res => {
        const data = res.data.data[0].knowledge.data
        if (data && data.length > 0) {
          const catalogList = this.quickSort(this.arrangementData(data))
          this.setRecommendCatalogList(catalogList)
          this.setRecommendCatalogActive(1)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    /* 监听当前章节切换数据 */
    recommendCatalogActive (v) {
      if (v > 0) {
        this.getDetail(0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/mixin";
  @import "../../assets/styles/variable";
  .recommend-view {
    background: #ffffff;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .top {
      height: 184px;
      background: url("../../assets/images/course_list_bg.png") no-repeat center center;
      background-size: 100% 100%;
      @include wrap-center;
      .nav {
        width: 100%;
        box-sizing: border-box;
        padding: 24px 60px;
        .nav-content {
          background: rgba(255, 255, 255, .5);
          box-sizing: border-box;
          padding: 0 60px;
          @include wrap-around;
          .nav-item {
            span {
              display: inline-block;
              height: 42px;
              line-height: 42px;
              font-size: 25px;
              padding: 0 10px;
              color: #595757;
            }
            &.active {
              background: $active-color;
              span {
                color: #ffffff;
              }
            }
          }
        }
      }
    }
    .content-wrapper {
      position: absolute;
      top: 184px;
      right: 0;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      padding: 78px 60px;
      @include wrap-center;
      .catalog-pos {
        width: 400px;
        height: 100%;
        margin-right: 80px;
        border-radius: 44px;
        border: 1px dotted $active-color;
        overflow: hidden;
      }
      .detail-pos {
        flex: 1;
        height: 100%;
        display: flex;
        border-radius: 44px;
        border: 1px dotted $active-color;
        overflow: hidden;
      }
      .back {
        width: 42px;
        height: 42px;
        position: absolute;
        right: 90px;
        top: 92px;
      }
    }
    .loading-wrapper {
      position: absolute;
      top: 184px;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .5);
      @include wrap-around;
    }
  }
</style>
