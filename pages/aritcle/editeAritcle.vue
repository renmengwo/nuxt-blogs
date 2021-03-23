<template>
  <div class="mt20">
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
      <i-button type="info" @click="Goback">
        取消
      </i-button>
      <i-button type="primary" class="ml10" @click="Submite">
        提交
      </i-button>
    </section>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate'
import { updateArticle, queryArticleDetails } from '@/api/article'

export default {
  name: 'EditeAritcle',
  data () {
    return {
      ContentObj: {},
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
    this.SeachArticle();
    this.getAritcle();
  },
  methods: {
    async SeachArticle () {
      const { data } = await getCateList()
      if (data.status === 1) {
        this.catelist = data.value
      }
    },
    async getAritcle() {
      const { data } = await queryArticleDetails(this.$route.query.id);
      if (data.status === 1) {
        this.ContentObj = data.value;
        this.title = data.value.title;
        this.content = data.value.content;
        this.cateId = data.value.cateId;
        this.description = data.value.content.substr(0, 20)
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
    Goback() {
      this.$router.go('-1');
    },
    async Submite () {
      if (this.title === '') {
        this.$Message.error('标题不能为空');
      } else if (this.cateId === '') {
        this.$Message.error('类别不能为空');
      } else if (this.content === '') {
        this.$Message.error('内容不能为空');
      } else {
        const body = {
          title: this.title,
          cateId: this.cateId,
          content: this.content,
          aritcleId: this.ContentObj.id
        }
        const { data } = await updateArticle(body)
        if (data.status === 1) {
          this.$Message.success({
            content: '编辑成功！',
            duration: 1,
            onClose: () => {
              this.$router.push('/')
            }
          });
        }
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
