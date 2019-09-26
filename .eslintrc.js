module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 'error',
    'prefer-const': 'error',
    'quotes': ['error', 'single'],
    'prefer-arrow-callback': 'error',
    'space-before-function-paren': ['error', 'never'],
    'prefer-template': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
