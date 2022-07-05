import vue from '@vitejs/plugin-vue'

/**
 * *支援在script標簽中使用name屬性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// rollup打包分析套件
import visualizer from 'rollup-plugin-visualizer'

import { configHtmlPlugin } from './html'
import { unocss } from './unocss'

/**
 * * 組件庫按需引入插件
 * usage: 直接使用組件,無需在任何地方導入組件
 */
import Componets from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import { configMockPlugin } from './mock'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    VueSetupExtend(),
    configHtmlPlugin(viteEnv, isBuild),
    unocss(),
    Componets({ resolvers: [NaiveUiResolver()] }),
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

  if (viteEnv?.VITE_APP_USE_MOCK) {
    plugins.push(configMockPlugin(isBuild))
  }

  return plugins
}
