import Vue from 'vue'
import Router from 'vue-router'
/* 引入推荐列表组件 */
import recommend from 'views/recommend'
/* 引入课程列表组件 */
import courseList from 'views/courseList'
/* 引入推荐详情组件 */
import recommendDetail from 'components/recommend/view'
/* 引入课程列表详情组件 */
import courseListDetail from 'components/courseList/view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend,
      meta: {
        keepAlive: false
      },
      children: [
        {
          path: ':id',
          component: recommendDetail
        }
      ]
    },
    {
      path: '/courseList',
      component: courseList,
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: ':id',
          component: courseListDetail
        }
      ]
    }
  ]
})
