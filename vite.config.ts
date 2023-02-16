import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return {
    plugins: [
      vue(),
      electron([
        {
          // Main-Process entry file of the Electron App.
          entry: 'electron/main/index.ts',
          vite: {
            build: {
              minify: isBuild,
              outDir: 'dist-electron/main'
            }
          }
        },
        {
          entry: 'electron/preload/index.ts',
          vite: {
            build: {
              minify: isBuild,
              outDir: 'dist-electron/preload'
            }
          }
        }
      ]),
      // Use Node.js API in the Renderer-process
      renderer({
        nodeIntegration: true
      })
    ],
    // server: {
    //   host: true,
    //   port: 5600,
    // },
    clearScreen: false
  }
})
