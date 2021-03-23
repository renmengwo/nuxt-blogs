<template>
  <div>
    <List item-layout="vertical">
      <ListItem v-for="item in ArticleList" :key="item.id">
        <ListItemMeta>
          <template slot="title">
            <nuxt-link :to="{name:'aritcle-id',params:{id:item.id}}" class="handlecursor">
              {{ item.title }}
            </nuxt-link>
          </template>
        </ListItemMeta>
        <p v-html="item.content"></p>
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
              编辑
            </li>
            <li>
              删除
            </li>
          </template>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    ArticleList: {
      type: Array,
      default: () => []
    },
    isPerson: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCheck(aritcleId) {
      this.$router.push({
        path: `/aritcle/${aritcleId}`
      })
    }
  }
}
</script>

<style scoped>

</style>
