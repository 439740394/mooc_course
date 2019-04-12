const getters = {
  recommendAlive: state => state.recommend.alive,
  recommendNavList: state => state.recommend.navList,
  recommendCatalogList: state => state.recommend.catalogList,
  recommendQrcodeUrl: state => state.recommend.qrcodeUrl,
  recommendActiveName: state => state.recommend.activeName,
  recommendCatalogActive: state => state.recommend.catalogActive,
  recommendDetailText: state => state.recommend.detailText,
  recommendDetailVideoInfo: state => state.recommend.detailVideoInfo
}

export default getters
