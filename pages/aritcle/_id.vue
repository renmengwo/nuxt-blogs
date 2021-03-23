<template>
  <div>
    <h4 class="d-title">
      {{ ContentObj.title }}
    </h4>
    <div class="d-cont-box">
      <div v-html="ContentObj.content"></div>
    </div>
    <p class="d-span-box">
      <span>作者：{{ ContentObj.username }}</span>|
      <span>分类：{{ ContentObj.catename }}</span>|
      <span v-if="ContentObj.updatedAt !== ''">最后更新时间：{{ ContentObj.updatedAt | formatimes('yyyy/MM/dd hh:mm:ss') }} |</span>
      <span>添加时间：{{ ContentObj.createdAt | formatimes('yyyy/MM/dd hh:mm:ss') }}</span>
    </p>
  </div>
</template>

<script>
import { queryArticleDetails } from '@/api/article'
export default {
  name: 'Id',
  data () {
    return {
      ContentObj: {}
    }
  },
  head() {
    return {
      title: `${this.ContentObj.title}`,
      meta:[
        { hid:'description', name:'description', content: `${this.description}` },
        { hid:'keywords', name:'keywords', content: '博客' }
      ]
    }
  },
  mounted () {
    this.getAritcle();
  },
  methods: {
    async getAritcle() {
      const { data } = await queryArticleDetails(this.$route.params.id);
      if (data.status === 1) {
        this.ContentObj = data.value;
        this.description = data.value.content.substr(0, 20)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.d-cont-box{font-size:16px;color:#333;line-height: 24px;text-indent: 24px;margin-top:10px;}
.d-title{font-size:30px;line-height: 40px; text-align: center;color:#333;margin-top:20px;}
.d-span-box{font-size:12px;line-height: 16px;color:#666;text-align: right;
  margin-top:20px;
  span{margin-right:10px;}
}
</style>
