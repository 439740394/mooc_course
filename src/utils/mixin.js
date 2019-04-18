import { mapActions, mapGetters } from 'vuex'
import qs from 'qs'

export const courseMixins = {
  methods: {
    ...mapActions([
      'setRecommendAlive',
      'setRecommendNavList',
      'setRecommendCatalogList',
      'setRecommendQrcodeUrl',
      'setRecommendActiveName',
      'setRecommendCatalogActive',
      'setRecommendDetailText',
      'setRecommendDetailVideoInfo',
      'setCourseListAlive',
      'setCourseListNavList',
      'setCourseListCatalogList',
      'setCourseListQrcodeUrl',
      'setCourseListActiveName',
      'setCourseListCatalogActive',
      'setCourseListDetailText',
      'setCourseListDetailVideoInfo'
    ]),
    /* 返回列表页设置 */
    reset () {
      this.setRecommendCatalogActive(0)
      this.setRecommendDetailText('')
      this.setRecommendDetailVideoInfo({})
      this.setCourseListCatalogActive(0)
      this.setCourseListDetailText('')
      this.setCourseListDetailVideoInfo({})
      setTimeout(() => {
        this.setRecommendCatalogList([])
        this.setCourseListCatalogList([])
      }, 300)
    },
    /* 回退 */
    backHistory () {
      this.$router.go(-1)
      this.reset()
    },
    /* 获取课程列表 */
    getDataByUserId (id) {
      return this.$http.post(`${process.env.VUE_APP_API}/courese/sendGetData`, qs.stringify({
        url: `http://mooc1-api.chaoxing.com/gas/person?userid=${id}&fields=course.fields(id,name,productId,teacherfactor,imageurl%20,clazz.fields(inviteCode)).isteachcourse(true)&view=json`
      }))
    },
    /* 获取目录 */
    getCatalogById (id) {
      return this.$http.post(`${process.env.VUE_APP_API}/courese/sendGetData`, qs.stringify({
        url: `http://mooc1-api.chaoxing.com/gas/course?id=${id}&fields=clazz.fields(id,name).ispublic(true),knowledge.fields(id,name,lastmodifytime,createtime,jobcount,indexOrder,parentnodeid,status,layer,label,card.fields(id,title,cardorder,knowledgeid,description))&view=json`
      }))
    },
    /* 获取视频 */
    getVideo (id, lastmodifytime) {
      return this.$http.post(`${process.env.VUE_APP_API}/courese/sendGetData`, qs.stringify({
        url: `https://mooc1-2.chaoxing.com/ananas/status/${id}?k=145&flag=normal&_dc=${lastmodifytime}`
      }))
    },
    /* 请求筛选详情数据 */
    getDetail (v) {
      if (v === 0) {
        const card = this.recommendCatalogList[this.recommendCatalogActive].card.data
        const lastmodifytime = this.recommendCatalogList[this.recommendCatalogActive].lastmodifytime
        let html = ''
        const reg1 = /style\s*?=\s*?([‘"])[\s\S]*?\1/g
        const reg2 = /objectid/
        const reg3 = /iframe/
        const reg4 = /href="[^"]*"/g
        card.forEach(item => {
          const desc = item.description
          html += desc
          html = html.replace(reg4, 'href="javascript:void(0);"')
          html = html.replace(reg1, '')
          this.setRecommendDetailVideoInfo({})
          if (reg2.test(desc) && reg3.test(desc)) {
            let oDiv = document.createElement('div')
            oDiv.innerHTML = desc
            const iframe = oDiv.getElementsByTagName('iframe')[0]
            const id = JSON.parse(iframe.getAttribute('data')).objectid
            this.getVideo(id, lastmodifytime).then(res => {
              const data = res.data
              let videoJson = {}
              if (data && data.screenshot) {
                videoJson.poster = data.screenshot
              }
              if (data && data.httphd) {
                videoJson.src = data.httphd
              } else if (data && data.httpmd) {
                videoJson.src = res.data.httphd
              } else if (data && data.http) {
                videoJson.src = data.http
              }
              this.setRecommendDetailVideoInfo(videoJson)
            }).catch(err => {
              console.log(err)
            })
            this.setRecommendDetailText(html)
          }
        })
      } else {
        const card = this.courseListCatalogList[this.courseListCatalogActive].card.data
        const lastmodifytime = this.courseListCatalogList[this.courseListCatalogActive].lastmodifytime
        let html = ''
        const reg1 = /style\s*?=\s*?([‘"])[\s\S]*?\1/g
        const reg2 = /objectid/
        const reg3 = /iframe/
        const reg4 = /href="[^"]*"/g
        this.setCourseListDetailVideoInfo({})
        card.forEach(item => {
          const desc = item.description
          html += desc
          html = html.replace(reg4, 'href="javascript:void(0);"')
          html = html.replace(reg1, '')
          if (reg2.test(desc) && reg3.test(desc)) {
            let oDiv = document.createElement('div')
            oDiv.innerHTML = desc
            const iframe = oDiv.getElementsByTagName('iframe')[0]
            const id = JSON.parse(iframe.getAttribute('data')).objectid
            this.getVideo(id, lastmodifytime).then(res => {
              const data = res.data
              let videoJson = {}
              if (data && data.screenshot) {
                videoJson.poster = data.screenshot
              }
              if (data && data.httphd) {
                videoJson.src = data.httphd
              } else if (data && data.httpmd) {
                videoJson.src = res.data.httphd
              } else if (data && data.http) {
                videoJson.src = data.http
              }
              this.setCourseListDetailVideoInfo(videoJson)
            }).catch(err => {
              console.log(err)
            })
          }
        })
        this.setCourseListDetailText(html)
      }
    },
    /* 整理数据 */
    arrangementData (arr) {
      const len = arr.length
      const lenmax = arr[len - 1].layer
      for (let i = 0; i < len; i++) {
        if (arr[i].label.indexOf('.') === -1) {
          arr[i].unit = true
          arr[i]['unit-item'] = false
        } else {
          arr[i].unit = false
          arr[i]['unit-item'] = true
        }
        const label = arr[i].label
        let newLayer = arr[i].layer
        let arr1 = label.split('.')
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i].length < 2) {
            arr1[i] = '0' + arr1[i]
          }
        }
        let newLabel = arr1.join('')
        newLabel = newLabel * Math.pow(10, (lenmax - newLayer) * 2)
        arr[i].newLabel = newLabel
      }
      return arr
    },
    /* 快速排序 */
    quickSort (arr) {
      if (arr.length <= 1) {
        return arr
      }
      let midNum = Math.floor(arr.length / 2)
      let midNumValue = arr.splice(midNum, 1)[0]
      let left = []
      let right = []
      for (let i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].newLabel) < parseInt(midNumValue.newLabel)) {
          left.push(arr[i])
        } else {
          right.push(arr[i])
        }
      }
      return this.quickSort(left).concat(midNumValue, this.quickSort(right))
    }
  },
  computed: {
    ...mapGetters([
      'recommendAlive',
      'recommendNavList',
      'recommendCatalogList',
      'recommendQrcodeUrl',
      'recommendActiveName',
      'recommendCatalogActive',
      'recommendDetailText',
      'recommendDetailVideoInfo',
      'courseListAlive',
      'courseListNavList',
      'courseListCatalogList',
      'courseListQrcodeUrl',
      'courseListActiveName',
      'courseListCatalogActive',
      'courseListDetailText',
      'courseListDetailVideoInfo'
    ])
  }
}
