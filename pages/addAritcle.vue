<template>
  <div>
    <i-col :span="12" class-name="clearfix">
      <i-col :span="6" class-name="set-title">
        请输入文章标题
      </i-col>
      <i-col :span="18">
        <i-input v-model="title" placeholder="请输入" clearable></i-input>
      </i-col>
    </i-col>
    <i-col :span="11" class-name="clearfix" :offset="1">
      <i-col :span="4" class-name="set-title">
        请选择分类
      </i-col>
      <i-col :span="20">
        <i-select v-model="cateId" placeholder="请选择" clearable>
          <Option v-for="item in catelist" :key="item.id" :value="item.id">
            {{ item.name }}
          </Option>
        </i-select>
      </i-col>
    </i-col>
    <section class="container">
      <client-only>
        <quill-editor
          ref="editor"
          v-model="content"
          :options="editorOption"
        />
      </client-only>
    </section>
    <section class="alignC mt20">
      <i-button>取消</i-button>
      <i-button type="primary" class="ml10" @click="Submite">
        提交
      </i-button>
    </section>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate'
import { addArticle } from '@/api/article'
export default {
  name: 'AddAritcle',
  data () {
    return {
      title:'',
      cateId:'',
      catelist: [],
      content: '',
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['clean']/*,
            ['image'] */
          ]
        }
      }
    }
  },
  mounted () {
    this.SeachArticle();
  },
  methods: {
    async SeachArticle () {
      const { data } = await getCateList()
      if (data.status === 1) {
        this.catelist = data.value
      }
    },
    /* onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
    }, */
    async Submite () {
      const body = {
        title: this.title,
        cateId: this.cateId,
        content: this.content
      }
      const { data } = await addArticle(body)
      if (data.status === 1) {
        console.log(data);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width:100%;
  margin: 0 auto;
  padding: 50px 0;
  .quill-editor{
    height:600px;
  }
}
</style>
