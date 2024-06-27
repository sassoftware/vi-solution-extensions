import { PluginOption, defineConfig } from 'vite'
import { execSync } from 'child_process'
import vue from '@vitejs/plugin-vue'

const lintAndUpload = async () => {
  try {
    execSync("npm run vue-tsc", {stdio: 'inherit'})
    execSync("npm run upload", {stdio: 'inherit'})
  } catch (err) {}
}

// When a hot update occurs, upload bundle to remote server
function uploadPlugin(): PluginOption {
  return {
    name: "upload-bundle",
    closeWatcher: lintAndUpload,
    closeBundle: lintAndUpload
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), uploadPlugin()],
  server: {
    watch: {
      usePolling: true,
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import url(${process.env.SVI_HOSTNAME}/SASVisualInvestigator/styles/commons/sas-shared-styles.css);`
      }
    }
  },
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        manualChunks: undefined,
        entryFileNames: "[name].js",
        dir: "dist/elements"
      } 
    },
  },
})
