import importPlugin from 'eslint-plugin-import'
import stylisticPlugin from '@stylistic/eslint-plugin'

const rules = {
  '@stylistic/semi': 'off',
  '@stylistic/brace-style': 'off',
  '@stylistic/arrow-parens': 'off',
  '@stylistic/no-multiple-empty-lines': 'off',
  '@stylistic/no-trailing-spaces': 'off',
  'arrow-parens': 'off',
  'brace-style': 'off',
  'prefer-arrow-callback': 'off',
  'func-names': 'off',
  'semi': 'off',
  'no-console': 'warn',
  'no-unused-vars': 'off',
  'import/no-unresolved': ['error', { ignore: ['on-change'] }],
}

export default [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    plugins: {
      import: importPlugin,
      '@stylistic': stylisticPlugin,
    },
    rules,
  },
]
