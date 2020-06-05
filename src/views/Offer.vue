<template>
  <div class="offer-container">
    <el-card>
      <h3 class="offer-title">录取通知书</h3>
      <p>
        <span class="offer-fill">
          {{ $store.state.user.username }}
        </span>
        同学:
      </p>
      <p class="offer-par">
        恭喜你，录取你入我校
        <span class="offer-fill">xxxx</span>专业学习。
      </p>
      <p class="offer-par">具体报道时间、地点，见《新生入学通知》</p>
    </el-card>
    <!-- TODO 未被录取的消息 -->
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.offer-container {
  .offer-title {
    font-size: 30px;
    text-align: center;
  }
  .offer-fill {
    text-decoration: underline;
    font-size: 22px;
    line-height: 22px;
    text-underline-position: under;
  }
  .offer-par {
    text-indent: 3em;
  }
}
</style>
