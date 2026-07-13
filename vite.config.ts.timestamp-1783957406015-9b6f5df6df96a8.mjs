// vite.config.ts
import { defineConfig } from "file:///C:/Users/user/Desktop/Projects/hotel-serene-praia/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/user/Desktop/Projects/hotel-serene-praia/node_modules/@vitejs/plugin-react/dist/index.js";
import compression from "file:///C:/Users/user/Desktop/Projects/hotel-serene-praia/node_modules/vite-plugin-compression/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\Users\\user\\Desktop\\Projects\\hotel-serene-praia";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz"
    }),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src"),
      "@components": resolve(__vite_injected_original_dirname, "./src/components"),
      "@pages": resolve(__vite_injected_original_dirname, "./src/pages"),
      "@hooks": resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@utils": resolve(__vite_injected_original_dirname, "./src/utils"),
      "@config": resolve(__vite_injected_original_dirname, "./src/config"),
      "@types": resolve(__vite_injected_original_dirname, "./src/types"),
      "@data": resolve(__vite_injected_original_dirname, "./src/data"),
      "@styles": resolve(__vite_injected_original_dirname, "./src/styles")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom", "react-helmet-async"],
          "vendor-gsap": ["gsap"],
          "vendor-ui": ["swiper", "lightgallery"],
          "vendor-animation": ["framer-motion", "lenis"]
        }
      }
    },
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    reportCompressedSize: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    assetsDir: "assets",
    assetsInlineLimit: 4096
  },
  server: {
    port: 3e3,
    strictPort: false,
    open: true,
    cors: true
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "gsap",
      "gsap/ScrollTrigger",
      "framer-motion",
      "lenis"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERlc2t0b3BcXFxcUHJvamVjdHNcXFxcaG90ZWwtc2VyZW5lLXByYWlhXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERlc2t0b3BcXFxcUHJvamVjdHNcXFxcaG90ZWwtc2VyZW5lLXByYWlhXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c2VyL0Rlc2t0b3AvUHJvamVjdHMvaG90ZWwtc2VyZW5lLXByYWlhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjb21wcmVzc2lvbih7XG4gICAgICB2ZXJib3NlOiB0cnVlLFxuICAgICAgZGlzYWJsZTogZmFsc2UsXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQwLFxuICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsXG4gICAgICBleHQ6ICcuZ3onLFxuICAgIH0pLFxuICAgIGNvbXByZXNzaW9uKHtcbiAgICAgIHZlcmJvc2U6IHRydWUsXG4gICAgICBkaXNhYmxlOiBmYWxzZSxcbiAgICAgIHRocmVzaG9sZDogMTAyNDAsXG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXG4gICAgICBleHQ6ICcuYnInLFxuICAgIH0pLFxuICBdLFxuXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAnQGNvbXBvbmVudHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgICdAcGFnZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3BhZ2VzJyksXG4gICAgICAnQGhvb2tzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9ob29rcycpLFxuICAgICAgJ0B1dGlscyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdXRpbHMnKSxcbiAgICAgICdAY29uZmlnJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb25maWcnKSxcbiAgICAgICdAdHlwZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3R5cGVzJyksXG4gICAgICAnQGRhdGEnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2RhdGEnKSxcbiAgICAgICdAc3R5bGVzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zdHlsZXMnKSxcbiAgICB9LFxuICB9LFxuXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICd2ZW5kb3ItcmVhY3QnOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJywgJ3JlYWN0LWhlbG1ldC1hc3luYyddLFxuICAgICAgICAgICd2ZW5kb3ItZ3NhcCc6IFsnZ3NhcCddLFxuICAgICAgICAgICd2ZW5kb3ItdWknOiBbJ3N3aXBlcicsICdsaWdodGdhbGxlcnknXSxcbiAgICAgICAgICAndmVuZG9yLWFuaW1hdGlvbic6IFsnZnJhbWVyLW1vdGlvbicsICdsZW5pcyddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUwMCxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NixcbiAgfSxcblxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxuICAgIG9wZW46IHRydWUsXG4gICAgY29yczogdHJ1ZSxcbiAgfSxcblxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAncmVhY3QnLFxuICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAncmVhY3Qtcm91dGVyLWRvbScsXG4gICAgICAnZ3NhcCcsXG4gICAgICAnZ3NhcC9TY3JvbGxUcmlnZ2VyJyxcbiAgICAgICdmcmFtZXItbW90aW9uJyxcbiAgICAgICdsZW5pcycsXG4gICAgXSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsb0JBQW9CO0FBQzlXLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLGVBQWU7QUFIeEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDL0IsZUFBZSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3BELFVBQVUsUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDMUMsVUFBVSxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMxQyxVQUFVLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQzFDLFdBQVcsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDNUMsVUFBVSxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMxQyxTQUFTLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3hDLFdBQVcsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsSUFDOUM7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixnQkFBZ0IsQ0FBQyxTQUFTLGFBQWEsb0JBQW9CLG9CQUFvQjtBQUFBLFVBQy9FLGVBQWUsQ0FBQyxNQUFNO0FBQUEsVUFDdEIsYUFBYSxDQUFDLFVBQVUsY0FBYztBQUFBLFVBQ3RDLG9CQUFvQixDQUFDLGlCQUFpQixPQUFPO0FBQUEsUUFDL0M7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLElBQ0Esc0JBQXNCO0FBQUEsSUFDdEIsV0FBVztBQUFBLElBQ1gsdUJBQXVCO0FBQUEsSUFDdkIsY0FBYztBQUFBLElBQ2QsV0FBVztBQUFBLElBQ1gsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
