import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed at https://faizanans.github.io — a user page, so the site lives at the domain root.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    // The QuickMsg demo video is large; keep it as an emitted file rather than inlining anything big.
    assetsInlineLimit: 4096,
  },
});
