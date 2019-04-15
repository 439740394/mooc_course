const mutations = {
  /* 设置推荐页面数据是否请求成功 */
  'SET_RECOMMEND_ALIVE': (state, alive) => {
    state.recommend.alive = alive
  },
  /* 设置推荐页面导航数据 */
  'SET_RECOMMEND_NAVLIST': (state, navList) => {
    state.recommend.navList = navList
  },
  /* 设置推荐目录数据 */
  'SET_RECOMMEND_CATALOGLIST': (state, catalogList) => {
    state.recommend.catalogList = catalogList
  },
  /* 设置推荐页面二维码地址 */
  'SET_RECOMMEND_QRCODEURL': (state, qrcodeUrl) => {
    state.recommend.qrcodeUrl = qrcodeUrl
  },
  /* 设置推荐页面activeName */
  'SET_RECOMMEND_ACTIVE_NAME': (state, activeName) => {
    state.recommend.activeName = activeName
  },
  /* 设置推荐页面当前在哪一个章节 */
  'SET_RECOMMEND_CATALOG_ACTIVE': (state, catalogActive) => {
    state.recommend.catalogActive = catalogActive
  },
  /* 设置推荐页面详情文字 */
  'SET_RECOMMEND_DETAIL_TEXT': (state, detailText) => {
    state.recommend.detailText = detailText
  },
  /* 设置推荐页面详情视频 */
  'SET_RECOMMEND_DETAIL_VIDEO_INFO': (state, json) => {
    state.recommend.detailVideoInfo = json
  },
  /* 设置课程列表页面数据是否请求成功 */
  'SET_COURSE_LIST_ALIVE': (state, alive) => {
    state.courseList.alive = alive
  },
  /* 设置课程列表页面导航数据 */
  'SET_COURSE_LIST_NAVLIST': (state, navList) => {
    state.courseList.navList = navList
  },
  /* 设置课程列表页面推荐目录数据 */
  'SET_COURSE_LIST_CATALOGLIST': (state, catalogList) => {
    state.courseList.catalogList = catalogList
  },
  /* 设置课程列表页面二维码地址 */
  'SET_COURSE_LIST_QRCODEURL': (state, qrcodeUrl) => {
    state.courseList.qrcodeUrl = qrcodeUrl
  },
  /* 设置课程列表页面activeName */
  'SET_COURSE_LIST_ACTIVE_NAME': (state, activeName) => {
    state.courseList.activeName = activeName
  },
  /* 设置课程列表页面当前在哪一个章节 */
  'SET_COURSE_LIST_CATALOG_ACTIVE': (state, catalogActive) => {
    state.courseList.catalogActive = catalogActive
  },
  /* 设置课程列表页面详情文字 */
  'SET_COURSE_LIST_DETAIL_TEXT': (state, detailText) => {
    state.courseList.detailText = detailText
  },
  /* 设置课程列表页面详情视频 */
  'SET_COURSE_LIST_DETAIL_VIDEO_INFO': (state, json) => {
    state.courseList.detailVideoInfo = json
  }
}

export default mutations
