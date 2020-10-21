module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'max-len': ['error', { 'code': 120 }],
    'arrow-body-style': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.config.js'],
    }],
    'vue/script-indent': ['error', 2, { 'baseIndent': 1 }]
  },
  'overrides': [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ]
};
