<template>
  <div class="recommend">
    <div class="top">
      <h3 class="title">超星课程展示平台</h3>
      <div class="nav">
        <div class="nav-content">
          <div
            v-for="(item, index) of recommendNavList" :key="index"
            @click.stop="handleClickSelect(item)"
            class="nav-item"
            :class="{active: item === recommendActiveName}">
            <span>{{item}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="course-list-content">
      <scroll
        :data="nowDataList">
        <div
           v-for="item of nowDataList"
           :key="item.id"
           class="course-list-item"
           @click.stop="handleClickEnterDetail(item.id, item.invitecode)">
          <img :src="item.imageurl" alt="">
          <span class="course-tips">[{{item.firstnavname}}]</span>
          <h3 class="course-name">{{item.name}}</h3>
          <span class="course-teacher">{{item.teacherfactor}}</span>
          <span class="course-teacher-professional">{{item.school}}&nbsp;({{item.professional}})</span>
          <span class="course-teacher-introduction">{{item.tearcherintroduction}}</span>
          <span class="course-introduction">{{item.courseintroduction}}</span>
        </div>
      </scroll>
    </div>
    <div class="course-router" @click.stop="handleClickCourseList">
      <span>全部课程</span>
    </div>
    <div class="mask" v-show="!recommendAlive">
      <loading></loading>
    </div>
    <transition name="slide-left">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
/* 引入配置参数 */
import { RECOMMEND_ID, RECOMMEND_LIST } from '../config/config'
/* 引入滑屏组件 */
import Scroll from 'components/common/scroll'
/* 引入vue混入方法 */
import { courseMixins } from '../utils/mixin'
/* 引入加载组件 */
import Loading from 'components/common/loading'

export default {
  name: 'recommend',
  mixins: [courseMixins],
  components: {
    Scroll,
    Loading
  },
  data () {
    return {
      allDataList: null,
      nowDataList: []
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    /* 筛选数据 */
    handleClickSelect (v) {
      this.setRecommendActiveName(v)
    },
    /* 点击进入全部课程列表 */
    handleClickCourseList () {
      this.$router.push('/courseList')
    },
    /* 点击进入目录详情页 */
    handleClickEnterDetail (id, qrcodeUrl) {
      this.setQrcodeUrl(`https://mooc1-api.chaoxing.com/teachingClassPhoneManage/phone/toParticipateCls?appId=1000&inviteCode=${qrcodeUrl}`)
      this.$router.push(`/recommend/${id}`)
    },
    /* 初始化获取数据 */
    getDataList () {
      this.getDataByUserId(RECOMMEND_ID).then(res => {
        const resList = res.data.data[0].course.data
        let localList = RECOMMEND_LIST
        let datas = {}
        let navs = []
        resList.forEach(item => {
          for (let i = 0; i < localList.length; i++) {
            if (localList[i].course_id === item.id) {
              item.school = localList[i].school
              item.professional = localList[i].professional
              item.firstnavname = localList[i].first_classification.trim()
              item.tearcherintroduction = localList[i].teacher_introduction
              item.courseintroduction = localList[i].course_introduction
              const invitecode = item.clazz.data[0].invitecode
              item.invitecode = invitecode
              localList.splice(i, 1)
            }
          }
          if (!datas[item.firstnavname]) {
            datas[item.firstnavname] = []
            navs.push(item.firstnavname)
          }
          datas[item.firstnavname].push(item)
        })
        this.allDataList = datas
        this.setRecommendNavList(navs)
        this.handleClickSelect(navs[0])
        this.setRecommendAlive(true)
        return false
      }).catch(err => {
        console.log(err)
        this.getDataList()
      })
    }
  },
  watch: {
    recommendActiveName (v) {
      this.nowDataList = this.allDataList[v]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/mixin";
  @import "../assets/styles/variable";
  @import "../assets/styles/transition";
  .recommend {
    width: 100%;
    height: 100%;
    position: relative;
    .top {
      height: 212px;
      @include column-Center;
      background: url("../assets/images/recomend_img.png") no-repeat center center;
      background-size: 100% 100%;
      .title {
        font-size: 48px;
        color: #ffffff;
        line-height: 76px;
        text-align: center;
      }
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
    .course-list-content {
      margin-top: 32px;
      height: 760px;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 60px;
      @include clearfix;
      .course-list-item {
        width: 310px;
        height: 318px;
        border-radius: 20px;
        border: 1px dotted $active-color;
        box-sizing: border-box;
        padding: 10px;
        margin-right: 62px;
        margin-bottom: 32px;
        color: #333333;
        overflow: hidden;
        float: left;
        &:nth-of-type(5n) {
          margin-right: 0;
        }
        img {
          width: 100%;
          height: 110px;
        }
        .course-tips {
          display: inline-block;
          width: 100%;
          color: $active-color;
          line-height: 1.5;
          font-size: $introduction-font-size;
          @include ellipsis;
        }
        .course-name {
          display: inline-block;
          width: 100%;
          line-height: 1.3;
          font-weight: bold;
          font-size: $title-font-size;
          @include ellipsis;
        }
        .course-teacher {
          display: inline-block;
          width: 100%;
          line-height: 1.3;
          font-size: $introduction-font-size;
          @include ellipsis;
        }
        .course-teacher-professional {
          display: inline-block;
          width: 100%;
          line-height: 1.3;
          font-size: $tips-font-size;
          @include ellipsis;
        }
        .course-teacher-introduction {
          display: inline-block;
          width: 100%;
          line-height: 1.3;
          font-size: $tips-font-size;
          min-height: 36px;
          @include ellipsis2(2);
        }
        .course-introduction {
          margin-top: 6px;
          display: inline-block;
          width: 100%;
          line-height: 1.3;
          font-size: $tips-font-size;
          text-indent: 2em;
          @include ellipsis2(3);
        }
      }
    }
    .course-router {
      width: 94px;
      height: 94px;
      position: absolute;
      bottom: 40px;
      right: 60px;
      background: url("../assets/images/recomend_icon.png") no-repeat center center;
      background-size: 100% 100%;
      @include wrap-center;
      span {
        font-size: 18px;
        color: $default-color;
      }
    }
    .mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      @include column-Center;
    }
  }
</style>
