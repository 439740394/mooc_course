const state = {
  recommend: {
    alive: false, // 推荐页面是否数据请求成功
    navList: [], // 推荐页面导航数据
    catalogList: [], // 推荐目录数据
    qrcodeUrl: '', // 二维码地址
    activeName: '',
    catalogActive: 0,
    detailText: '',
    detailVideoInfo: {}
  },
  courseList: {
    alive: false, // 课程列表页面是否数据请求成功
    navList: [], // 课程列表页面导航数据
    catalogList: [], // 课程列表目录数据
    qrcodeUrl: '', // 二维码地址
    activeName: {},
    catalogActive: 0,
    detailText: '',
    detailVideoInfo: {}
  }
}

export default state
