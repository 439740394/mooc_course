<template>
  <div class="recommend">
    <div class="top">
      <h3 class="title">超星课程展示平台</h3>
      <div class="nav">
        <div class="nav-content">
          <router-link
            tag="div"
            v-for="(item, index) of recommendNavList" :key="index"
            :to="{path: '/recommend', query: {firstnavname: item}}"
            class="nav-item"
            :class="{active: item === recommendActiveName}">
            <span>{{item}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="course-list-content">
      <scroll
        :data="nowDataList"
        :scrollbar="true">
        <div
           v-for="item of nowDataList"
           :key="item.id"
           class="course-list-item"
           @click="handleClickEnterDetail(item.id, item.invitecode)">
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
    <div class="course-router">
      <span>全部课程</span>
    </div>
    <div class="mask" v-show="!recommendAlive">
      <loading></loading>
    </div>
    <transition name="scale">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { RECOMMEND_ID, RECOMMEND_LIST } from '../config/config'
import Scroll from 'components/common/scroll'
import { courseMixins } from '../utils/mixin'
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
    /* 进入目录详情页 */
    handleClickEnterDetail (id, qrcodeUrl) {
      this.setRecommendQrcodeUrl(`https://mooc1-api.chaoxing.com/teachingClassPhoneManage/phone/toParticipateCls?appId=1000&inviteCode=${qrcodeUrl}`)
      this.$router.push(`/recommend/${id}`)
    },
    /* 初始化获取数据 */
    getDataList () {
      this.getDataByUserId(RECOMMEND_ID).then(res => {
        const resList = res.data.data[0].course.data
        let datas = {}
        let navs = []
        resList.forEach((item, i) => {
          item.school = RECOMMEND_LIST[i].school
          item.professional = RECOMMEND_LIST[i].professional
          item.firstnavname = RECOMMEND_LIST[i].first_classification
          item.tearcherintroduction = RECOMMEND_LIST[i].teacher_introduction
          item.courseintroduction = RECOMMEND_LIST[i].course_introduction
          const invitecode = item.clazz.data[0].invitecode
          item.invitecode = invitecode
          if (!datas[item.firstnavname]) {
            datas[item.firstnavname] = []
            navs.push(item.firstnavname)
          }
          datas[item.firstnavname].push(item)
        })
        this.allDataList = datas
        this.setRecommendNavList(navs)
        const val = this.$route.query.firstnavname || navs[0]
        this.selectData(val)
        this.setRecommendAlive(true)
        return false
      }).catch(err => {
        console.log(err)
        this.getDataList()
      })
    },
    /* 筛选数据 */
    selectData (v) {
      this.setRecommendActiveName(v)
      this.nowDataList = this.allDataList[this.recommendActiveName]
    }
  },
  watch: {
    /* 监听路由查询字符串来进行分类 */
    '$route' (v) {
      if (v.query && v.query.firstnavname) {
        const activeName = v.query.firstnavname
        this.selectData(activeName)
      }
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
      height: 670px;
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
      background: rgba(0, 0, 0, .5);
    }
  }
</style>
