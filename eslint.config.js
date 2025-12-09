import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: {
    css: true,
    html: true,
  },
  rules: {
    'no-unused-vars': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'node/prefer-global/process': 'off',
    'pnpm/yaml-enforce-settings': 'off',
    'pnpm/json-enforce-catalog': 'off',
  },
})
