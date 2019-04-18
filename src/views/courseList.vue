<template>
  <div class="course-page">
    <div class="course-pos">
      <div class="course-container">
        <div class="course-content">
          <div class="nav-content">
            <div class="nav-list">
              <ul>
                <li
                  @click.stop="handleClickSelect({ firstnavname: key, secondnavname: courseListNavList[key][0] })"
                  :class="{active: courseListActiveName.firstnavname === key}"
                  v-for="(item, key, index) of courseListNavList"
                  :key="index">
                  <span>{{key}}</span>
                  <ol v-if="courseListActiveName.firstnavname === key">
                    <li
                      :class="{active: courseListActiveName.secondnavname === val}"
                      v-for="(val, i) of courseListNavList[key]"
                      :key="i">
                      <span @click.stop="handleClickSelect({ firstnavname: key, secondnavname: val })">{{val}}</span>
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>
          <div class="course-list-content">
            <scroll :data="nowDataList">
              <div
                class="list-item"
                v-for="item of selectDataList"
                :key="item.id"
                @click="handleClickEnterDetail(item.id, item.invitecode)">
                <div class="list-item-img">
                  <img :src="item.imageurl" alt="">
                </div>
                <h3>{{item.name}}</h3>
                <span>
                {{item.teacherfactor}}&nbsp;{{item.professional}}
                <i>{{item.school}}</i>
              </span>
              </div>
            </scroll>
          </div>
          <div class="initials">
            <ul>
              <li
                :class="{ active: index === initialsActive}"
                v-for="(item, index) of initials"
                :key="index"
                @click.stop="handleClickSelectByInitials(item, index)">
                {{item}}
              </li>
            </ul>
          </div>
          <div class="back" @click="handleClickEnterRecommend">
            <img src="../assets/images/back_icon.png" alt="">
          </div>
        </div>
      </div>
      <transition name="slide-left">
        <router-view></router-view>
      </transition>
    </div>
    <transition name="fade">
      <div class="mask" v-show="!courseListAlive">
        <loading></loading>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
/* 引入vue混入组价 */
import { courseMixins } from '../utils/mixin'
/* 引入用户ID */
import { COURSE_ID, COURSE_LIST } from '../config/config'
/* 引入滑屏组件 */
import Scroll from 'components/common/scroll'
/* 引入加载组件 */
import Loading from 'components/common/loading'

export default {
  name: 'courseList',
  mixins: [courseMixins],
  components: {
    Scroll,
    Loading
  },
  data () {
    return {
      allDataList: null,
      nowDataList: [],
      initials: [],
      selectDataList: [],
      initialsActive: -1
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    /* 返回 */
    handleClickEnterRecommend () {
      this.$router.push('/recommend')
    },
    /* 点击进入详情页 */
    handleClickEnterDetail (id, qrcodeUrl) {
      this.setCourseListQrcodeUrl(`https://mooc1-api.chaoxing.com/teachingClassPhoneManage/phone/toParticipateCls?appId=1000&inviteCode=${qrcodeUrl}`)
      this.$router.push(`/courseList/${id}`)
    },
    /* 首字母筛选 */
    handleClickSelectByInitials (v, n) {
      this.initialsActive = n
      this.selectDataList = this.nowDataList.filter(item => item.Initials === v)
    },
    /* 选取数据 */
    handleClickSelect (v) {
      this.setCourseListActiveName(v)
      this.selectDataList = this.nowDataList = this.allDataList[this.courseListActiveName.firstnavname][this.courseListActiveName.secondnavname]
      let arr = []
      this.selectDataList.forEach(item => {
        arr.push(item.Initials)
      })
      const res = Array.from(new Set(arr))
      arr = [...res]
      arr = arr.sort()
      this.initials = arr
    },
    /* 获取课程列表数据 */
    getDataList () {
      this.getDataByUserId(COURSE_ID).then(res => {
        const resList = res.data.data[0].course.data
        if (resList[0].name !== COURSE_LIST[0].course_name) {
          resList.reverse()
        }
        let datas = {}
        let navs = {}
        resList.forEach((item, i) => {
          const invitecode = item.clazz.data[0].invitecode
          item.invitecode = invitecode.trim()
          item.school = COURSE_LIST[i].school.trim()
          item.professional = COURSE_LIST[i].professional.trim()
          if (!(/[A-Z]/.test(COURSE_LIST[i].Initials))) {
            item.Initials = '#'
          } else {
            item.Initials = COURSE_LIST[i].Initials.trim()
          }
          item.firstnavname = COURSE_LIST[i].first_classification.trim()
          item.secondnavname = COURSE_LIST[i].second_classification.trim()
          if (!datas[item.firstnavname]) {
            datas[item.firstnavname] = {}
            navs[item.firstnavname] = {}
          }
          if (!datas[item.firstnavname][item.secondnavname]) {
            datas[item.firstnavname][item.secondnavname] = []
            navs[item.firstnavname][item.secondnavname] = ''
          }
          datas[item.firstnavname][item.secondnavname].push(item)
        })
        this.allDataList = datas
        let navList = {}
        for (let key in navs) {
          if (!navList[key]) {
            navList[key] = []
          }
          for (let key2 in navs[key]) {
            navList[key].push(key2)
          }
        }
        this.setCourseListNavList(navList)
        let firstName = ''
        let secondName = ''
        let json = {}
        for (let key in this.courseListNavList) {
          if (firstName === '') {
            firstName = key
          }
          if (!json[key]) {
            json[key] = []
          }
          for (let i = 0; i < this.courseListNavList[key].length; i++) {
            json[key].push(this.courseListNavList[key][i])
            if (secondName === '') {
              secondName = json[key][i]
            }
          }
        }
        let v = `{ "firstnavname": "${firstName}", "secondnavname": "${secondName}"}`
        v = JSON.parse(v)
        this.handleClickSelect(v)
        this.setCourseListAlive(true)
      }).catch(err => {
        console.log(err)
        this.getDataList()
      })
    }
  },
  watch: {
    courseListActiveName (v) {
      this.handleClickSelect(v)
      this.initialsActive = -1
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/mixin";
  @import "../assets/styles/variable";
  @import "../assets/styles/transition";
  .course-page {
    width: 100%;
    height: 100%;
    position: relative;
    background: url("../assets/images/course_list_bg.png") no-repeat;
    background-size: 100% 100%;
    @include wrap-center;
    .course-pos {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 80px 96px;
      .course-container {
        height: 100%;
        background: rgba(255, 255, 255, .7);
        border-radius: 46px;
        box-sizing: border-box;
        padding: 96px 46px;
        .course-content {
          position: relative;
          height: 100%;
          .nav-content {
            width: 455px;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            .nav-list {
              height: 100%;
              display: flex;
              ul {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                box-sizing: border-box;
                padding: 40px 0;
                > li {
                  border-radius: 10px;
                  > span {
                    display: inline-block;
                    font-size: 38px;
                    padding: 10px 12px;
                  }
                  &.active {
                    background: $active-color;
                    > span {
                      color: #ffffff;
                    }
                  }
                  ol {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 212px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    box-sizing: border-box;
                    padding: 40px 0;
                    li {
                      width: 100%;
                      padding-bottom: 14px;
                      background: url("../assets/images/course_list_icon1.png") no-repeat 0 bottom;
                      span {
                        display: inline-block;
                        width: 100%;
                        font-size: 20px;
                        line-height: 26px;
                        background: #ffffff;
                        padding: 0;
                        text-align: center;
                        box-shadow: 0 2px 3px 0 rgba(210, 210, 210, .3);
                      }
                      &.active {
                        span {
                          background: $active-color;
                          color: #ffffff;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .course-list-content {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 293px;
            z-index: 1;
            background: #ffffff;
            border-radius: 46px;
            box-sizing: border-box;
            padding: 88px 46px 88px 205px;
            overflow: hidden;
            .list-item {
              width: 240px;
              height: 240px;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2);
              float: left;
              margin: 5px 35px 55px 5px;
              &:nth-of-type(4n) {
                margin-right: 0;
              }
              .list-item-img {
                width: 204px;
                height: 135px;
                margin: 0 auto;
                padding-top: 20px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              h3 {
                font-size: 18px;
                box-sizing: border-box;
                padding: 8px 18px 0;
                line-height: 30px;
                width: 100%;
                @include ellipsis;
                border-bottom: 1px solid #dcdcdc;
              }
              span {
                display: inline-block;
                width: 100%;
                line-height: 30px;
                color: #888787;
                padding: 0 18px;
                font-size: 16px;
                box-sizing: border-box;
                @include ellipsis;
                i {
                  font-size: 14px;
                  padding-left: 4px;
                }
              }
            }
          }
          .initials {
            width: 46px;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 2;
            ul {
              height: 100%;
              @include column-Center;
              box-sizing: border-box;
              padding: 88px 0;
              li {
                width: 100%;
                font-size: 16px;
                line-height: 24px;
                text-align: center;
                &.active {
                  color: $active-color;
                }
              }
            }
          }
          .back {
            width: 42px;
            height: 42px;
            position: absolute;
            right: 26px;
            top: 16px;
            z-index: 2;
          }
        }
      }
    }
    .mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 12;
      @include column-Center;
      background: rgba(0, 0, 0, .5);
    }
  }
</style>
