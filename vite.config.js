import { defineConfig } from 'vite';

export default defineConfig({
  base: './', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.includes('icons/')) {
             return 'assets/[name][extname]'; 
          }
          return 'assets/[name][extname]';
        },
      }
    }
  }
});