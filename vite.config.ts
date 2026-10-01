import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  root: ".",
  build: {
    outDir: "dist",
    // SECURITY: Never generate source maps in production
    sourcemap: false,
    // SECURITY: Minify code to make it harder to reverse engineer
    minify: mode === "production" ? "terser" : "esbuild",
    terserOptions:
      mode === "production"
        ? {
            compress: {
              // Remove console.* calls in production
              drop_console: true,
              drop_debugger: true,
            },
            format: {
              // Remove comments
              comments: false,
            },
          }
        : undefined,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "i18n-vendor": ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          "ui-vendor": ["framer-motion", "lucide-react"],
        },
        // SECURITY: Obfuscate chunk names in production
        chunkFileNames: mode === "production" ? "assets/[name]-[hash].js" : "assets/[name].js",
        entryFileNames: mode === "production" ? "assets/[name]-[hash].js" : "assets/[name].js",
        assetFileNames:
          mode === "production" ? "assets/[name]-[hash][extname]" : "assets/[name][extname]",
      },
    },
    chunkSizeWarningLimit: 1000,
    // SECURITY: Report on large chunks
    reportCompressedSize: true,
  },
  // SECURITY: Define build-specific constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || "1.0.0"),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  // Development server configuration
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
}));
