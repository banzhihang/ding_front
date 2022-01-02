<template>
  <div>
    <div class="head">
      <van-row type="flex">
        <van-col span="9">帮助中心</van-col>
      </van-row>
    </div>
    <van-list v-model="loading" :finished="finished" inset>
      <van-cell v-for="item in list" :key="item.id" :title="item.title" @click="jumpToArticle(item.id)" size="large" :icon="getIcon(item.kind)" center />
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    async getArticleList() {
      const {data:res} = await this.$http.get('/article_list')
      this.list = res.data
      this.finished = true
    },
    jumpToArticle(id) {
      this.$router.push(
          {
            path:`/notice/${id}`
          }
      )
    },
    getIcon(kind) {
      console.log(kind)
      if (kind === "疑问") {
        return 'http://p.pigpigen.online/%E9%97%AE%E5%8F%B7.png'
      }else if (kind === '通知'){
        return 'http://p.pigpigen.online/%E8%AD%A6%E5%91%8A%20.png'
      }
    }
  },
  created() {
    this.getArticleList()
  }
}
</script>

<style scoped lang="less">
.van-list{
  margin-top: 20px;
}
.head {
  margin-top: 5%;
  margin-left: 6% ;
  font-size: 18px;
}

.van-cell {
  box-shadow:1px 1px 1px 1px rgba(0, 0, 0, 0.1);
}

</style>
