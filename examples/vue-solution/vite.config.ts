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
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        // SAS VI loads solution extension bundles as classic scripts (not ES modules)
        // via jQuery.ajax({ dataType: "script" }). Without an IIFE wrapper, Vite's
        // default 'es' format leaves all top-level declarations in the browser's shared
        // lexical environment. The minifier assigns single-char names like '$' to
        // internal Vue utilities, which permanently shadows the global jQuery '$' and
        // breaks the host application. 'iife' wraps the entire bundle in a self-
        // invoking function, keeping all declarations scoped to the bundle.
        format: 'iife',
        manualChunks: undefined,
        entryFileNames: "[name].js",
        dir: "dist/elements"
      } 
    },
  },
})
