// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '欢迎来到我的博客',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '这是个人学习博客' },
      { hid: 'keywords', name: 'keywords', content: '博客' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'iview/dist/styles/iview.css',
    // 项目里要使用的 SCSS 文件
    { src: '@/assets/scss/index.scss', lang: 'scss' }
  ],
  telemetry: false,
  dev: process.env.NODE_ENV !== 'production',
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/iview',
    '~plugins/globalFilter'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],
  server: {
    port: process.env.NODE_ENV === 'dev' ? 3000 : 8080
  },
  router: {
    middleware: 'authenticated'
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['@nuxtjs/style-resources']
  ],
  styleResources: {
    scss: ['./assets/scss/_variables.scss', './assets/scss/_mixins.scss']
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    prefix: '/api', // 在请求路径前，加上 /api
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // 页面仍然显示 http://localhost:3000,但实际上是
      pathRewrite: {
        '^/api': '/',
        changeOrigin: true
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    devtools: true,
    vendor: ['axios']
  }
}
