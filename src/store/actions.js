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
  }
}

export default actions
