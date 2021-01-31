<template>
  <div class="container" style="height:2000px">
    <div>
      <Button type="primary" @click="test">
        Primary
      </Button>
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in data" :key="item.id" :value="item.id">
          {{ item.name }}
        </Option>
      </Select>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const { data } = await $axios.$get('/cate/getCateList')
    return { data }
  },
  data () {
    return {
      model1: ''
    }
  },
  methods: {
    test () {
      this.$axios.$get('/cate/getCateList')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

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
