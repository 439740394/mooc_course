const getters = {
  recommendAlive: state => state.recommend.alive,
  recommendNavList: state => state.recommend.navList,
  recommendActiveName: state => state.recommend.activeName,
  courseListAlive: state => state.courseList.alive,
  courseListNavList: state => state.courseList.navList,
  courseListActiveName: state => state.courseList.activeName,
  qrcodeUrl: state => state.qrcodeUrl,
  detailAlive: state => state.detailAlive,
  catalogActive: state => state.catalogActive,
  catalogList: state => state.catalogList,
  detailTitle: state => state.detailTitle,
  detailText: state => state.detailText,
  detailVideoInfo: state => state.detailVideoInfo
}

export default getters
