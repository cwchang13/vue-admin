import vue from '@vitejs/plugin-vue'

/**
 * 展setup插件，支援在script標簽中使用name屬性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// rollup打包分析套件
import visualizer from 'rollup-plugin-visualizer'

import { configHtmlPlugin } from './html'
import { unocss } from './unocss'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    VueSetupExtend(),
    configHtmlPlugin(viteEnv, isBuild),
    unocss()
  ]

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    )
  }

  return plugins
}