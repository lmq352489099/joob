// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  imports: {
    dirs: [
      // 扫描顶层目录中模块
      'composables',
      // 扫描内嵌一层深度的模块，指定特定文件名和后缀名
      'composables/*/index.{ts,js,mjs,mts}',
      // 扫描给定目录中所有模块
      'composables/**',
      'store',
      'stores',
    ],
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt'
  ],
  vite: {
    plugins: [
      // 按需引⼊组件
      Components({
        resolvers: [AntDesignVueResolver({
          importStyle: 'less'
        })]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#ea6f5a'
          },
          javascriptEnabled: true,
        }
      }
    },
    // ssr
    ssr: {
      noExternal: ['ant-design-vue'],
    }
  },
  devtools: { enabled: true }
})
