module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'indent': ['error', 4, {
      'SwitchCase': 1
    }],
    quotes: ['error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'no-undef': 0,
    'curly': ['error', 'all'],
    // allow paren-less arrow functions
    'arrow-parens': ['error', 'as-needed'],
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error']}] : ['warn', { allow: ['warn', 'error']}],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'space-before-function-paren': ['error', 'never'],
    'space-before-blocks': 'error',
    'block-scoped-var': 'error',
    'class-methods-use-this': 'error',
    'dot-notation': 'error',
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': 1,
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'always', {
      'arraysInObjects': false,
      'objectsInObjects': false
    }],
    'space-in-parens': ['error', 'never'],
    'comma-spacing': ['error', {
      'before': false, 'after': true
    }],
    'keyword-spacing': ['error', {
      before: true,
      after: true
    }],
    'no-multiple-empty-lines': ['error', {
      max: 1
    }],
    'no-unused-vars': 1,
    'vue/multi-word-component-names': 0
  },
};
