import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: true,
  rules: {
    'no-unused-vars': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'node/prefer-global/process': 'off',
    'pnpm/yaml-enforce-settings': 'off',
    'pnpm/json-enforce-catalog': 'off',
    'e18e/prefer-static-regex': 'off',
    'no-console': 'off',
  },
})
