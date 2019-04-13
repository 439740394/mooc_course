<template>
  <div class="detail-tips">
    <div class="qrcode-pos">
      <div class="qrcode-wrapper">
        <img src="../../assets/images/cx_qrcode.png" alt="">
      </div>
      <span>学习通二维码</span>
    </div>
    <div class="qrcode-pos">
      <div class="qrcode-wrapper">
        <qrcode :qrcodeWidth="94" :qrcodeHeight="94" :qrcodeUrl="recommendQrcodeUrl"></qrcode>
      </div>
      <span>班级课程二维码</span>
    </div>
    <div class="text-pos">
      <div class="text">
        <h3>《使用说明》</h3>
          <span>
            ①&nbsp;&nbsp;扫描二维码下载学习通；<br>②&nbsp;&nbsp;使用学习通扫描上方课程<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二维码进入课程学习。
          </span>
      </div>
    </div>
  </div>
</template>

<script>
/* 引入生成二维码组件 */
import Qrcode from './qrcode'
import { courseMixins } from '../../utils/mixin'

export default {
  name: 'detailTips',
  mixins: [courseMixins],
  components: {
    Qrcode
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/variable";
  @import "../../assets/styles/mixin";
  .detail-tips {
    width: 220px;
    height: 100%;
    @include column-Center;
    .qrcode-pos {
      text-align: center;
      margin: 10px 0;
      width: 100%;
      @include column-Center;
      .qrcode-wrapper {
        width: 94px;
        height: 94px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        font-size: $tips-font-size;
        display: inline-block;
        line-height: 2;
        @include ellipsis;
      }
    }
    .text-pos {
      width: 100%;
      margin-top: 20px;
      h3 {
        font-weight: 400;
        font-size: 18px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #e0525d;
      }
      span {
        display: inline-block;
        width: 100%;
        font-size: 14px;
        line-height: 26px;
        color: #e0525d;
        text-align: center;
      }
    }
  }
</style>
