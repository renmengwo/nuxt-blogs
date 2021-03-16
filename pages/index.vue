<template>
  <section class="container">
    <section class="d-banner">
      这是banner图
    </section>
    <section class="wrap">
      <Row>
        <Col span="8" />
        <Col span="6" class-name="set-title" />文章分类</Col>
        <Col span="18" />
        <Select v-model="cate" placeholder="请选择" clearable>
          <Option v-for="item in catelist" :key="item.id" :value="item.id">
            {{ item.name }}
          </Option>
        </Select>
        </Col>
        </Col>
        <Col span="8" />
        <Col span="6" class-name="set-title pl10" />文章标题</Col>
        <Col span="18" />
        <Input v-model="title" placeholder="请输入" clearable />
        </Col>
        </Col>
        <Col span="7" offset="1" class-name="alignL" />
        <Button type="primary" @click="getInitData">
          搜索
        </Button>
        </Col>
      </Row>
      <section class="mt10 clearfix">
        <div class="d-content-left fl">
          <ArticleList :article-list="ArticleList" />
          <template v-if="total">
            <Page :total="total" :current="pageNumber" :page-size="20" @on-change="changePage" />
          </template>
        </div>
        <div class="d-content-right fr">
          <h4>本月热门</h4>
          <ul>
            <li />
          </ul>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { getCateList } from '@/api/cate'
import { getArticleList } from '@/api/article'
import ArticleList from './compnents/ArticleList'
export default {
  components: {
    ArticleList
  },
  data () {
    return {
      cate: '',
      title: '',
      total: 0,
      pageNumber: 1,
      catelist: [],
      ArticleList: []
    }
  },
  mounted () {
    this.getInitData()
    this.SeachArticle()
  },
  methods: {
    async SeachArticle () {
      const { data } = await getCateList()
      if (data.status === 1) {
        this.catelist = data.value
      }
    },
    changePage (val) {
      this.pageNumber = val
    },
    async getInitData () {
      const { data } = await getArticleList(this.doseach())
      if (data.status === 1) {
        this.ArticleList = data.value.list
        this.total = data.value.count
      }
    },
    doseach () {
      return {
        title: this.title,
        pageNumber: this.pageNumber,
        cate: this.cate
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width:100%;
}
.d-banner{
  width:100%;
  min-width:1000px;
  height:500px;
}
.d-content-left{width:770px}
.d-content-right{width:200px}
.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.set-title{height:32px; line-height: 32px;}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
