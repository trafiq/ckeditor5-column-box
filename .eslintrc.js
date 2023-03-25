module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
    // 'prettier'
  ],
  // plugins: [
  //   'prettier'
  // ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // 'prettier/prettier': ['error']
  }
}
