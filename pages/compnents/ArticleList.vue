<template>
  <div>
    <List item-layout="vertical">
      <ListItem v-for="item in ArticleList" :key="item.id">
        <ListItemMeta>
          <template slot="title">
            <p class="handlecursor">
              {{ item.title }}
            </p>
          </template>
        </ListItemMeta>
        <p>{{ item.content }}</p>
        <template slot="action">
          <li>
            作者：{{ item.userName }}
          </li>
          <li>
            分类：{{ item.cateName }}
          </li>
          <li>
            发表时间：{{ item.createdAt }}
          </li>
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
    }
  }
}
</script>

<style scoped>

</style>
