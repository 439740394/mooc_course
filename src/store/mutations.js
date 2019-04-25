const mutations = {
  /* 设置推荐页面数据是否请求成功 */
  'SET_RECOMMEND_ALIVE': (state, alive) => {
    state.recommend.alive = alive
  },
  /* 设置推荐页面导航数据 */
  'SET_RECOMMEND_NAVLIST': (state, navList) => {
    state.recommend.navList = navList
  },
  /* 设置推荐页面activeName */
  'SET_RECOMMEND_ACTIVE_NAME': (state, activeName) => {
    state.recommend.activeName = activeName
  },
  /* 设置课程列表页面数据是否请求成功 */
  'SET_COURSE_LIST_ALIVE': (state, alive) => {
    state.courseList.alive = alive
  },
  /* 设置课程列表页面导航数据 */
  'SET_COURSE_LIST_NAVLIST': (state, navList) => {
    state.courseList.navList = navList
  },
  /* 设置课程列表页面activeName */
  'SET_COURSE_LIST_ACTIVE_NAME': (state, activeName) => {
    state.courseList.activeName = activeName
  },
  /* 设置二维码 */
  'SET_QRCODE_URL': (state, url) => {
    state.qrcodeUrl = url
  },
  'SET_DETAIL_ALIVE': (state, detailAlive) => {
    state.detailAlive = detailAlive
  },
  /* 设置详情页面当前在哪一个章节 */
  'SET_CATALOG_ACTIVE': (state, catalogActive) => {
    state.catalogActive = catalogActive
  },
  /* 设置详情列表目录 */
  'SET_CATALOG_LIST': (state, catalogList) => {
    state.catalogList = catalogList
  },
  /* 设置详情页面题目 */
  'SET_DETAIL_TITLE': (state, detailTitle) => {
    state.detailTitle = detailTitle
  },
  /* 设置详情页面文字 */
  'SET_DETAIL_TEXT': (state, detailText) => {
    state.detailText = detailText
  },
  /* 设置详情页面视频 */
  'SET_DETAIL_VIDEO_INFO': (state, detailVideoInfo) => {
    state.detailVideoInfo = detailVideoInfo
  }
}

export default mutations
