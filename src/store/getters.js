const getters = {
  recommendAlive: state => state.recommend.alive,
  recommendNavList: state => state.recommend.navList,
  recommendCatalogList: state => state.recommend.catalogList,
  recommendQrcodeUrl: state => state.recommend.qrcodeUrl,
  recommendActiveName: state => state.recommend.activeName,
  recommendCatalogActive: state => state.recommend.catalogActive,
  recommendDetailText: state => state.recommend.detailText,
  recommendDetailVideoInfo: state => state.recommend.detailVideoInfo,
  courseListAlive: state => state.courseList.alive,
  courseListNavList: state => state.courseList.navList,
  courseListCatalogList: state => state.courseList.catalogList,
  courseListQrcodeUrl: state => state.courseList.qrcodeUrl,
  courseListActiveName: state => state.courseList.activeName,
  courseListCatalogActive: state => state.courseList.catalogActive,
  courseListDetailText: state => state.courseList.detailText,
  courseListDetailVideoInfo: state => state.courseList.detailVideoInfo
}

export default getters
