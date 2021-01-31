<template>
  <Affix>
    <header class="d-flex mb10 d-head pl30 pr30">
      <div class="d-head-left">
        这是logo位置
      </div>
      <div class="d-flex d-head-right">
        <p class="admin-img mr20" />
        <p class="mr20">
          欢迎人猛我
        </p>
        <Button type="text" @click="LoginOrRegister">
          请登录/注冊
        </Button>
      </div>
      <Modal
        v-model="loginVisiale"
        :scrollable="false"
        width="350"
      >
        <p slot="header" class="acenter">
          {{ flag === 0 ? '登录' : '注册' }}
        </p>
        <div class="mb15">
          <Input v-model="username" placeholder="请输入账号" clearable prefix="md-contact" />
        </div>
        <div>
          <Input v-model="password" placeholder="请输入密码" type="password" clearable prefix="md-create" />
          <p v-if="flag === 1" class="mt10 handlecursor" @click="handleResitor(1)">
            注册
          </p>
        </div>
        <div slot="footer">
          <Button type="primary" long @click="Submite">
            {{ flag === 0 ? '登录' : '注册' }}
          </Button>
        </div>
      </Modal>
    </header>
  </Affix>
</template>

<script>
import md5 from 'js-md5'
import { mapActions } from 'vuex'
import { addUser } from '../api/user'
export default {
  name: 'Header',
  data () {
    return {
      loginVisiale: false,
      username: '',
      password: '',
      flag: 0 // 0表示登录， 1表示注册
    }
  },
  methods: {
    ...mapActions('User', ['BlogLogin', 'BlogUserInfo']),
    Submite () {
      const body = {
        username: this.username,
        password: md5(this.password)
      }
      this.flag === 0 ? this.login(body) : this.register(body)
    },
    register (obj) {
      addUser(obj).then(({ data }) => {
        if (data.status === 1) {
          this.loginVisiale = false
          this.$Message.success('注册成功');
        }
      })
    },
    async login (obj) {
      await this.BlogLogin(obj)
      await this.$Message.success('登录成功');
      this.loginVisiale = false
    },
    LoginOrRegister () {
      this.flag = 0;
      this.username = '';
      this.password = '';
      this.loginVisiale = true
    },
    handleResitor (flag) {
      this.flag = flag
    }
  }
}
</script>

<style scoped lang="scss">
.d-head{border-bottom:1px solid #eaeaea;box-shadow: 0 5px 5px #f5f7f9; height:50px;flex-direction: row; justify-content: space-between;}
.admin-img{width:30px; height:30px;background: #f5f7f9;border-radius: 100%;border: 1px solid #000}
.d-head-right{align-items: center;}
</style>
