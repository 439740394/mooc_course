const state = {
  recommend: {
    alive: false, // 推荐页面是否数据请求成功
    navList: [], // 推荐页面导航数据
    activeName: ''// 推荐页面分类名称
  },
  courseList: {
    alive: false, // 课程列表页面是否数据请求成功
    navList: [], // 课程列表页面导航数据
    activeName: {} // 课程列表分类名称
  },
  qrcodeUrl: '', // 二维码地址
  detailAlive: false, // 详情页数据是否请求成功
  catalogActive: 0, // 当前所在课程列表索引
  catalogList: [], // 课程列表目录数据
  detailText: '', // 详情文字
  detailVideoInfo: [] // 详情视频列表
}

export default state
