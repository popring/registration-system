<template>
  <div class="offer-container">
    <el-card v-if="offer === 1" style="padding: 0 50px;">
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
      <p class="offer-par">
        你好，新生。
      </p>
      <p class="offer-par">
        新生始于新生，愿这里是你年少时梦想的彼岸，亦是你新生梦想开始的地方。
      </p>
      <p class="offer-par" style="text-align: right;">
        具体报道时间、地点，见《新生入学通知》
      </p>
    </el-card>
    <!-- TODO 未被录取的消息 -->
    <el-card v-else-if="offer === 2">
      <h3 class="offer-title">录取查询</h3>
      <p style="color: red;">
        同学你的成绩没有达到我们学校的录取标准，很遗憾，你未被录取。
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offer: 2
    }
  },
  created() {
    if (this.offer === 0) {
      this.$message('敬请等待录取通知')
      this.$router.go(-1)
    }
  }
}
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
