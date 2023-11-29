
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

export default defineConfig({
  appType: 'custom',

  plugins: [ 
    react(), 
    vike({ 
      disableUrlNormalization: true,
    }),
  ],

  build: {
    target: 'esnext',
  },

})