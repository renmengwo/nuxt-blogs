module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': [
      2,
      {
        // 允许声明未使用变量
        vars: 'local',
        // 参数不检查
        args: 'none'
      }
    ],
    // 关闭语句强制分号结尾
    semi: [0],
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: []
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'any'
      },
      svg: 'always',
      math: 'always'
    }],
    // key值前面是否要有空格
    'key-spacing': [0, {
      singleLine: {
        beforeColon: false,
        afterColon: true
      },
      multiLine: {
        beforeColon: true,
        afterColon: true,
        align: 'colon'
      },
      // 空行最多不能超过100行
      'no-multiple-empty-lines': [0, { max: 100 }],
      // 关闭禁止混用tab和空格
      'no-mixed-spaces-and-tabs': [0],
      'no-unused-vars':'off',
      'no-console':'off'
    }]
  }
}
