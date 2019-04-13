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
    width: 120px;
    height: 80px;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 26px;
      height: 26px;
    }
    span {
      color: #ffffff;
      margin-top: 10px;
    }
  }
</style>
