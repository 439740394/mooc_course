const actions = {
  setRecommendAlive: ({ commit }, alive) => {
    return commit('SET_RECOMMEND_ALIVE', alive)
  },
  setRecommendNavList: ({ commit }, navList) => {
    return commit('SET_RECOMMEND_NAVLIST', navList)
  },
  setRecommendActiveName: ({ commit }, activeName) => {
    return commit('SET_RECOMMEND_ACTIVE_NAME', activeName)
  },
  setCourseListAlive: ({ commit }, alive) => {
    return commit('SET_COURSE_LIST_ALIVE', alive)
  },
  setCourseListNavList: ({ commit }, navList) => {
    return commit('SET_COURSE_LIST_NAVLIST', navList)
  },
  setCourseListActiveName: ({ commit }, activeName) => {
    return commit('SET_COURSE_LIST_ACTIVE_NAME', activeName)
  },
  setQrcodeUrl: ({ commit }, url) => {
    return commit('SET_QRCODE_URL', url)
  },
  setDetailAlive: ({ commit }, detailAlive) => {
    return commit('SET_DETAIL_ALIVE', detailAlive)
  },
  setCatalogActive: ({ commit }, catalogActive) => {
    return commit('SET_CATALOG_ACTIVE', catalogActive)
  },
  setCatalogList: ({ commit }, catalogList) => {
    return commit('SET_CATALOG_LIST', catalogList)
  },
  setDetailText: ({ commit }, detailText) => {
    return commit('SET_DETAIL_TEXT', detailText)
  },
  setDetailVideoInfo: ({ commit }, detailVideoInfo) => {
    return commit('SET_DETAIL_VIDEO_INFO', detailVideoInfo)
  }
}

export default actions
