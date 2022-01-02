<template>
  <div v-html="content" class="markdown-body content"></div>
</template>

<script>
const marked = require("marked");
export default {
  name: "Article",
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async getContent(id) {
      const {data:res} = await this.$http.get('/article',{params:{
        'id':id
        }})
      this.content = marked(res.data.content)
    }
  },
  created() {
    const id = this.$route.params.id
    this.getContent(id)
  }
}
</script>

<style scoped lang="less">
.content {
  margin: 15px 15px 0 15px;
}
</style>