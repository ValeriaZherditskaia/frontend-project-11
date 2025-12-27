import importPlugin from 'eslint-plugin-import'

const rules = {
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
    },
    rules,
  },
]
