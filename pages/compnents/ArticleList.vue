<template>
  <div>
    <List item-layout="vertical">
      <ListItem v-for="item in articleList" :key="item.id">
        <ListItemMeta>
          <template slot="title">
            <nuxt-link :to="{name:'aritcle-id',params:{id:item.id}}" class="handlecursor">
              {{ item.title }}
            </nuxt-link>
          </template>
        </ListItemMeta>
        <p class="title-item">
          {{ item.content }}
        </p>
        <template slot="action">
          <li>
            作者：{{ item.userName }}
          </li>
          <li>
            分类：{{ item.cateName }}
          </li>
          <li>
            发表时间：{{ item.createdAt | formatimes('yyyy/MM/dd hh:mm:ss') }}
          </li>
          <template v-if="isPerson">
            <li>
              <nuxt-link :to="{name:'aritcle-editeAritcle',query:{id:item.id}}" class="handlecursor handlecolor">
                编辑
              </nuxt-link>
            </li>
            <li @click="handleDisabled(item.id)">
              删除
            </li>
          </template>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
import { setDisabledArticle } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    articleList: {
      type: Array,
      default: () => []
    },
    isPerson: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleDisabled(id) {
      this.$Modal.confirm({
        title: '提示',
        okText: '确定',
        cancelText: '取消',
        content: '确定删除该条博客吗？',
        onOk: () => {
          this.Submite(id)
        },
        onCancel: () => {
        }
      });
    },
    async Submite(id) {
      const body = {
        status: 0,
        id
      }
      const { data } = await setDisabledArticle(body);
      if (data.status === 1) {
        this.$Message.success({
          content: '删除成功！',
          duration: 1,
          onClose: () => {
            this.$emit('handleSuccess')
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.handlecolor{color:#000; opacity:0.45}
</style>
