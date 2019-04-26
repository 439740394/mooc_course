import { mapActions, mapGetters } from 'vuex'
import qs from 'qs'

export const courseMixins = {
  methods: {
    ...mapActions([
      'setRecommendAlive',
      'setRecommendNavList',
      'setRecommendActiveName',
      'setCourseListAlive',
      'setCourseListNavList',
      'setCourseListActiveName',
      'setQrcodeUrl',
      'setDetailAlive',
      'setCatalogActive',
      'setCatalogList',
      'setDetailText',
      'setDetailVideoInfo'
    ]),
    /* 返回列表页设置 */
    reset () {
      setTimeout(() => {
        this.setCatalogActive(0)
        this.setCatalogList([])
        this.setDetailText('')
        this.setDetailVideoInfo([])
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
    getVideo (videoList) {
      if (!videoList || videoList.length === 0) {
        return
      }
      this.setDetailAlive(true)
      Promise.all(videoList.map(item => {
        return new Promise((resolve, reject) => {
          this.$http.post(`${process.env.VUE_APP_API}/courese/sendGetData`, qs.stringify({
            url: `https://mooc1-2.chaoxing.com/ananas/status/${item.id}?k=145&flag=normal&_dc=${item.lastmodifytime}`
          })).then(res => {
            resolve(res)
          }).catch(err => {
            console.log(err)
          })
        })
      })).then(res => {
        let list = []
        res.forEach((item, i) => {
          const data = item.data
          let videoJson = {}
          videoJson.id = 'xgplay' + i
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
          list.push(videoJson)
        })
        this.setDetailVideoInfo(list)
        this.setDetailAlive(false)
      }).catch(err => {
        console.log(err)
      })
    },
    /* 整理视频数据 */
    arrangementVideo (data, lastmodifytime) {
      const reg2 = /\.(mp4|flv|m3u8)/
      const oDiv = document.createElement('div')
      oDiv.innerHTML = data
      const list = oDiv.getElementsByTagName('iframe')
      let videoList = []
      for (let i = 0; i < list.length; i++) {
        const type = JSON.parse(list[i].getAttribute('data')).type
        const id = JSON.parse(list[i].getAttribute('data')).objectid ? JSON.parse(list[i].getAttribute('data')).objectid : null
        const isMp4 = reg2.test(type)
        if (isMp4 && id) {
          videoList.push({
            id: id,
            lastmodifytime: lastmodifytime
          })
        }
      }
      this.getVideo(videoList)
    },
    /* 请求筛选详情数据 */
    getDetail () {
      this.setDetailVideoInfo([])
      let card = null
      let lastmodifytime = 0
      card = this.catalogList[this.catalogActive].card.data
      lastmodifytime = this.catalogList[this.catalogActive].lastmodifytime
      const reg1 = /href="[^"]*"/g
      const reg2 = /style\s*?=\s*?([‘"])[\s\S]*?\1/g
      let data = ''
      card.forEach(item => {
        let desc = item.description
        desc = desc.replace(reg1, 'href="javascript:void(0);"')
        desc = desc.replace(reg2, '')
        data += desc
      })
      this.setDetailText(data)
      this.arrangementVideo(data, lastmodifytime)
    },
    /* 整理数据 */
    arrangementData (v) {
      let oneMaxNum = 0
      let oneMaxLayer = 0
      v.forEach(element => {
        if (element.label.indexOf('.') === -1) {
          element.unit = true
          element['unit-item'] = false
        } else {
          element.unit = false
          element['unit-item'] = true
        }
        if (element.layer > oneMaxLayer) {
          oneMaxLayer = element.layer
        }
        const arr = element.label.match(/\d+/g)
        arr.forEach(item => {
          if (item.toString().length > oneMaxNum) {
            oneMaxNum = item.toString().length
          }
        })
      })
      v.forEach(element => {
        let sortid = ''
        const arr = element.label.match(/\d+/g)
        arr.forEach(item => {
          let zero = ''
          const zeroNum = oneMaxNum - item.toString().length
          for (let i = 0; i < zeroNum; i++) {
            zero += '0'
          }
          sortid += zero + item.toString()
        })
        element.sortid = sortid
      })
      let maxNum = oneMaxNum * oneMaxLayer
      v.forEach(element => {
        const zeroNum = maxNum - element.sortid.length
        let zero = ''
        for (let i = 0; i < zeroNum; i++) {
          zero += '0'
        }
        element.sortid = Number(element.sortid + zero)
      })
      return v
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
        if (parseInt(arr[i].sortid) < parseInt(midNumValue.sortid)) {
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
      'recommendActiveName',
      'courseListAlive',
      'courseListNavList',
      'courseListActiveName',
      'qrcodeUrl',
      'detailAlive',
      'catalogActive',
      'catalogList',
      'detailText',
      'detailVideoInfo'
    ])
  }
}
