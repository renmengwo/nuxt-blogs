<template>
  <div>
    <ArticleList :article-list="ArticleList" :is-person="isPerson" />
    <template v-if="total">
      <Page :total="total" :current="pageNumber" :page-size="20" @on-change="changePage" />
    </template>
  </div>
</template>

<script>
import { getUseArticleList } from '@/api/article'
import ArticleList from './compnents/ArticleList'
export default {
  name: 'UserCenter',
  components: { ArticleList },
  data() {
    return {
      total: 0,
      pageNumber: 1,
      isPerson: true,
      ArticleList: []
    }
  },
  mounted () {
    this.getUseList();
  },
  methods: {
    doseach () {
      return {
        title: this.title,
        pageNumber: this.pageNumber
      }
    },
    async getUseList() {
      const { data } = await getUseArticleList(this.doseach());
      if (data.status === 1) {
        this.ArticleList = data.value.list
        this.total = data.value.count
      }
    },
    changePage (val) {
      this.pageNumber = val
    }
  }
}
</script>

<style scoped>

</style>
