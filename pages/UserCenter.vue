<template>
  <div>
    <section class="d-top-blog">
      {{ UserName }}的博客
    </section>
    <section>
      <div class="d-user-box">
        <p class="d-user-img">
          <img src="../static/images/logo.jpg" alt="" width="100%">
        </p>
        <p class="d-user-name">
          {{ UserName }}
        </p>
        <p class="alignC" style="font-size:20px">
          <nuxt-link :to="{name:'aritcle-addAritcle'}" class="handlecursor">
            创建博客
          </nuxt-link>
        </p>
      </div>
    </section>
    <ArticleList :article-list="ArticleList" :is-person="isPerson" @handleSuccess="getUseList" />
    <template v-if="total">
      <div class="alignR">
        <Page :total="total" :current="pageNumber" :page-size="20" @on-change="changePage" />
      </div>
    </template>
  </div>
</template>

<script>
import { getUseArticleList } from '@/api/article'
import { mapState } from 'vuex'
import ArticleList from './compnents/ArticleList'
export default {
  name: 'UserCenter',
  components: { ArticleList },
  middleware: 'userAuth',
  data() {
    return {
      total: 0,
      pageNumber: 1,
      isPerson: true,
      ArticleList: []
    }
  },
  computed: {
    ...mapState('User', {
      UserName: state => state.username
    })
  },
  mounted () {
    this.getUseList();
  },
  methods: {
    doseach () {
      return {
        title: this.title,
        pageNumber: this.pageNumber,
        pageSize: 20
      }
    },
    async getUseList() {
      this.pageNumber = 1;
      const { data } = await getUseArticleList(this.doseach());
      if (data.status === 1) {
        this.ArticleList = data.value.list
        this.total = data.value.count
      }
    },
    async changePage (val) {
      this.pageNumber = 1;
      this.pageNumber = val;
      const { data } = await getUseArticleList(this.doseach());
      if (data.status === 1) {
        this.ArticleList = data.value.list
        this.total = data.value.count
      }
    }
  }
}
</script>

<style scoped lang="scss">
.d-top-blog{
  padding-top: 16px;
  width: 100%;
  height: 100px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  background-image: url("../static/images/usrbj.jpg");
  font-size:20px;
  color:#fff;
  font-weight: 500;
  padding-left:10px;
}
.d-user-img{width:100px;height:100px;border-radius: 100%;border:1px solid #333;background:#fff;overflow: hidden;}
.d-user-box{width:100px;height:130px;position: relative;
  top: -50px;
  left: 50%;
  margin-left: -50px;}
.d-user-name{font-size:20px;text-align: center;color:#333;}
</style>
