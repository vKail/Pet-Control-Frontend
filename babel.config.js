module.
exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@/components': './components',
            '@/ui': './components/ui',
            '@/feature': './feature',
            '@/assets': './assets',
            // Para los componentes de Gluestack UI
            '@/gluestack-ui': './components/gluestack-ui-provider',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
    ],
  }
}