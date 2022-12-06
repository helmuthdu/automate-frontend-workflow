module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021
  },
  extends: ['plugin:vue/vue3-recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended']
};
