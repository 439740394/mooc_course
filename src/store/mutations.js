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
  /* 设置二维码地址 */
  'SET_RECOMMEND_QRCODEURL': (state, qrcodeUrl) => {
    state.recommend.qrcodeUrl = qrcodeUrl
  },
  /* 设置activeName */
  'SET_RECOMMEND_ACTIVE_NAME': (state, activeName) => {
    state.recommend.activeName = activeName
  },
  /* 设置当前在哪一个章节 */
  'SET_RECOMMEND_CATALOG_ACTIVE': (state, catalogActive) => {
    state.recommend.catalogActive = catalogActive
  },
  /* 设置详情文字 */
  'SET_RECOMMEND_DETAIL_TEXT': (state, detailText) => {
    state.recommend.detailText = detailText
  },
  /* 设置详情视频 */
  'SET_RECOMMEND_DETAIL_VIDEO_INFO': (state, json) => {
    state.recommend.detailVideoInfo = json
  }
}

export default mutations
