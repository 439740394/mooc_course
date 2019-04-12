<template>
  <div class="loading">
    <img src="../../assets/images/loading.gif" alt="">
    <span>{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'loading',
  props: {
    text: {
      type: String,
      default: '数据加载中...'
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    width: 200px;
    height: 200px;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 100px;
      height: 100px;
    }
    span {
      color: #ffffff;
      padding-top: 30px;
      letter-spacing: 6px;
    }
  }
</style>
