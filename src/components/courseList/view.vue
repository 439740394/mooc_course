<template>
  <div class="recommend-view">
    <div class="top">
      <div class="nav">
        <div class="nav-content">
          <div
            :class="{active: courseListActiveName.firstnavname === key}"
            v-for="(item, key, index) of courseListNavList"
            :key="index"
            class="nav-item"
            @click.stop="handleClickBackTo({ firstnavname: key, secondnavname: courseListNavList[key][0] })">
            <span>{{key}}</span>
            <ol v-if="courseListActiveName.firstnavname === key">
              <li
                v-for="(val, i) of courseListNavList[key]"
                :key="i"
                @click.stop="handleClickBackTo({ firstnavname: key, secondnavname: val })">
                <strong>{{val}}</strong>
                <div class="nav-active-bar" v-if="courseListActiveName.secondnavname === val">
                  <i></i>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="catalog-pos">
        <catalog :catalogList="courseListCatalogList" :catalogActive="courseListCatalogActive" @changecatalogactive="changeCatalogActive"></catalog>
      </div>
      <div class="detail-pos">
        <detail :text="courseListDetailText" :videoInfo="courseListDetailVideoInfo"></detail>
        <detail-tips :qrcodeUrl="courseListQrcodeUrl"></detail-tips>
      </div>
      <div class="back" @click="backHistory">
        <img src="../../assets/images/back_icon.png" alt="">
      </div>
    </div>
    <div class="loading-wrapper" v-show="courseListCatalogList.length < 1">
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
/* 引入localStorage组件 */
import { saveCatalog, getCatalog } from '../../utils/localStorage'

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
    /* 点击导航返回上一级 */
    handleClickBackTo (v) {
      this.reset()
      this.setCourseListActiveName(v)
      this.$router.push('/courseList')
    },
    /* 修改目录高亮及数据 */
    changeCatalogActive (v) {
      this.setCourseListCatalogActive(v)
    },
    /* 获取目录数据 */
    getData () {
      /* 自动获取数据 */
      const courseId = this.$route.params.id
      /* 如果存储了localStorage则读取存储的目录 */
      if (getCatalog(courseId)) {
        this.setCourseListCatalogList(getCatalog(courseId))
        console.log(this.courseListCatalogList)
        this.setCourseListCatalogActive(1)
        this.getDetail(1)
        return false
      }
      this.getCatalogById(courseId).then(res => {
        const data = res.data.data[0].knowledge.data
        if (data && data.length > 0) {
          const catalogList = this.quickSort(this.arrangementData(data))
          saveCatalog(courseId, catalogList)
          this.setCourseListCatalogList(catalogList)
          this.setCourseListCatalogActive(1)
          this.getDetail(1)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    /* 监听当前章节切换数据 */
    courseListCatalogActive (v) {
      if (v > 0) {
        this.getDetail(1)
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
    z-index: 9;
    .top {
      height: 184px;
      background: url("../../assets/images/course_list_bg.png") no-repeat center center;
      background-size: 100% 100%;
      position: relative;
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
            ol {
              position: absolute;
              bottom: -80px;
              width: 100%;
              left: 0;
              box-sizing: border-box;
              padding: 0 60px;
              height: 80px;
              z-index: 10;
              display: flex;
              li {
                flex: 1;
                position: relative;
                @include wrap-center;
                strong {
                  display: inline-block;
                  width: 100%;
                  border-right: 1px solid #333333;
                  font-size: 20px;
                  height: 22px;
                  line-height: 20px;
                  text-align: center;
                  color: #333333!important;
                }
                .nav-active-bar {
                  position: absolute;
                  bottom: 4px;
                  left: 0;
                  width: 100%;
                  height: 2px;
                  i {
                    display: block;
                    margin: 0 auto;
                    width: 60%;
                    height: 100%;
                    background: $active-color;
                  }
                }
                &:nth-last-of-type(1) {
                  strong {
                    border-right: none;
                  }
                }
                &.active {
                  strong {
                    color: $active-color;
                  }
                }
              }
            }
          }
        }
      }
    }
    .content-wrapper {
      position: absolute;
      top: 264px;
      right: 0;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      padding: 10px 60px 78px;
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
        right: 100px;
        top: 24px;
      }
    }
    .loading-wrapper {
      position: absolute;
      top: 264px;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .5);
      @include wrap-around;
    }
  }
</style>
