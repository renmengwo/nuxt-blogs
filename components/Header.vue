<template>
  <Affix>
    <header class=" mb10 d-head">
      <section class="wrap d-flex d-head-center">
        <ul class="d-head-left d-flex">
          <li>
            <img src="../static/images/logo1.jpg" alt="" width="40px">
          </li>
          <li>
            <nuxt-link :to="{name:'UserCenter'}" class="handlecursor">
              个人中心
            </nuxt-link>
          </li>
        </ul>
        <div class="d-flex d-head-right">
          <template v-if="!isLogin">
            <p class="admin-img mr20">
              <img src="../static/images/logo.jpg" alt="" width="100%">
            </p>
            <p class="mr20">
              欢迎{{ UserName }}
            </p>
          </template>
          <i-button v-else type="text" @click="LoginOrRegister">
            请登录/注冊
          </i-button>
        </div>
      </section>
      <Modal
        v-model="loginVisiale"
        :scrollable="false"
        width="350"
      >
        <p slot="header" class="acenter">
          {{ flag === 0 ? '登录' : '注册' }}
        </p>
        <div class="mb15">
          <i-input v-model="username" placeholder="请输入账号" clearable prefix="md-contact" />
        </div>
        <div>
          <i-input v-model="password" placeholder="请输入密码" type="password" clearable prefix="md-create" />
          <p class="mt10 handlecursor" @click="handleResitor(1)">
            注册
          </p>
        </div>
        <div slot="footer">
          <i-button type="primary" long @click="Submite">
            {{ flag === 0 ? '登录' : '注册' }}
          </i-button>
        </div>
      </Modal>
    </header>
  </Affix>
</template>

<script>
import md5 from 'js-md5';
import { addUser } from '@/api/user';
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      loginVisiale: false,
      username: '',
      password: '',
      flag: 0 // 0表示登录， 1表示注册
    };
  },
  computed: {
    ...mapState('User', {
      isLogin: state => state.Token === '',
      UserName: state => state.username
    })
  },
  methods: {
    Submite () {
      const body = {
        username: this.username,
        password: md5(this.password)
      };
      this.flag === 0 ? this.login(body) : this.register(body);
    },
    register (obj) {
      addUser(obj).then(({ data }) => {
        if (data.status === 1) {
          this.$Message.success('注册成功');
          this.loginVisiale = false;
        }
      });
    },
    async  login (obj) {
      const data = await this.$store.dispatch('User/BlogLogin', obj);
      if (data.status === 1) {
        this.$Message.success('登录成功');
        this.loginVisiale = false;
      }
    },
    LoginOrRegister () {
      this.flag = 0;
      this.username = '';
      this.password = '';
      this.loginVisiale = true;
    },
    handleResitor (flag) {
      this.flag = flag;
    }
  }
};
</script>

<style scoped lang="scss">
.d-head{border-bottom:1px solid #eaeaea;box-shadow: 0 5px 5px #f5f7f9; height:50px;flex-direction: row; justify-content: space-between;background: #fff;}
.admin-img{width:30px; height:30px;background: #f5f7f9;border-radius: 100%;border: 1px solid #000;overflow: hidden;}
.d-head-left{
  li{margin-right:10px;cursor:pointer;line-height:50px;}
}
.d-head-right{align-items: center;}

.d-head-center{flex-direction: row; justify-content: space-between;height:100%;}
</style>
