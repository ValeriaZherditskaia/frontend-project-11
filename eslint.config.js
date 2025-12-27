cat > eslint.config.js << 'EOF'
import js from '@eslint/js'
import airbnbBase from 'eslint-config-airbnb-base'

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
    ...airbnbBase,
    rules: {
      ...airbnbBase.rules,
      '@stylistic/semi': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/arrow-parens': 'off',
      'arrow-parens': 'off',
      'brace-style': 'off',
      'prefer-arrow-callback': 'off',
      'func-names': 'off',
      'semi': 'off',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'import/no-unresolved': ['error', { ignore: ['on-change'] }],
    },
  },
]
EOF
