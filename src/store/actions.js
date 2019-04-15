const actions = {
  setRecommendAlive: ({ commit }, alive) => {
    return commit('SET_RECOMMEND_ALIVE', alive)
  },
  setRecommendNavList: ({ commit }, navList) => {
    return commit('SET_RECOMMEND_NAVLIST', navList)
  },
  setRecommendCatalogList: ({ commit }, catalogList) => {
    return commit('SET_RECOMMEND_CATALOGLIST', catalogList)
  },
  setRecommendQrcodeUrl: ({ commit }, qrcodeUrl) => {
    return commit('SET_RECOMMEND_QRCODEURL', qrcodeUrl)
  },
  setRecommendActiveName: ({ commit }, activeName) => {
    return commit('SET_RECOMMEND_ACTIVE_NAME', activeName)
  },
  setRecommendCatalogActive: ({ commit }, catalogActive) => {
    return commit('SET_RECOMMEND_CATALOG_ACTIVE', catalogActive)
  },
  setRecommendDetailText: ({ commit }, detailText) => {
    return commit('SET_RECOMMEND_DETAIL_TEXT', detailText)
  },
  setRecommendDetailVideoInfo: ({ commit }, json) => {
    return commit('SET_RECOMMEND_DETAIL_VIDEO_INFO', json)
  },
  setCourseListAlive: ({ commit }, alive) => {
    return commit('SET_COURSE_LIST_ALIVE', alive)
  },
  setCourseListNavList: ({ commit }, navList) => {
    return commit('SET_COURSE_LIST_NAVLIST', navList)
  },
  setCourseListCatalogList: ({ commit }, catalogList) => {
    return commit('SET_COURSE_LIST_CATALOGLIST', catalogList)
  },
  setCourseListQrcodeUrl: ({ commit }, qrcodeUrl) => {
    return commit('SET_COURSE_LIST_QRCODEURL', qrcodeUrl)
  },
  setCourseListActiveName: ({ commit }, activeName) => {
    return commit('SET_COURSE_LIST_ACTIVE_NAME', activeName)
  },
  setCourseListCatalogActive: ({ commit }, catalogActive) => {
    return commit('SET_COURSE_LIST_CATALOG_ACTIVE', catalogActive)
  },
  setCourseListDetailText: ({ commit }, detailText) => {
    return commit('SET_COURSE_LIST_DETAIL_TEXT', detailText)
  },
  setCourseListDetailVideoInfo: ({ commit }, json) => {
    return commit('SET_COURSE_LIST_DETAIL_VIDEO_INFO', json)
  }
}

export default actions
