import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: resolve(__dirname, 'src'),
      outDir: resolve(__dirname, 'dist'),
      include: [resolve(__dirname, 'src/index.ts'), resolve(__dirname, 'src/**/*.ts'), resolve(__dirname, 'src/**/*.tsx')],
      exclude: [resolve(__dirname, 'src/**/*.stories.ts'), resolve(__dirname, 'src/**/*.stories.tsx'), resolve(__dirname, 'src/**/*.test.ts'), resolve(__dirname, 'src/**/*.test.tsx'), resolve(__dirname, 'src/**/*.css')],
      rollupTypes: false,
      copyDtsFiles: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'StorybookCustomUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: 'index.css'
      }
    }
  }
})