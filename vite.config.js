import { defineConfig, loadEnv } from 'vite'
import path from 'path'

import { wrapperEnv, createProxy  } from './build/utils'
import { createVitePlugins } from './build/plugin'

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  
  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      // 設置別名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
    server: {
      host: '0.0.0.0',  // 默認為'127.0.0.1'，如果將此設置為 `0.0.0.0` 或者 `true` 將監聽所有地址，包括局域網和公網地址
      port: VITE_PORT,  // 端口
      proxy: createProxy(VITE_PROXY), // 代理
    }
  }
})
