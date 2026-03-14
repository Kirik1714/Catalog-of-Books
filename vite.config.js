import { defineConfig } from 'vite';

export default defineConfig({
  base: './', 
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, 
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: (assetInfo) => {
      
          return 'assets/[name][extname]';
        },
        manualChunks: undefined,
      },
      inlineDynamicImports: true,
    }
  }
});