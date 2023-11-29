
import { UserConfig, defineConfig, splitVendorChunkPlugin } from 'vite'

import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { resolve } from 'path'
import { __dirname } from './src/renderer/path'

const config: UserConfig = {
  root: resolve(__dirname, '.'),
  appType: 'custom',

  plugins: [ 
    react(),
    vike({ 
      disableUrlNormalization: true,
    }),
  ],

  optimizeDeps: {},

  build: {
    target: 'esnext',
    cssMinify: true,
    rollupOptions: {
      plugins: [
        splitVendorChunkPlugin(),
      ],
    },
  },

}

export default defineConfig(config)
export { config }