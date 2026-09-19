import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // App chính (client/) chiếm 5173 mặc định. Admin dùng 5174 để chạy
  // song song mà không tranh port.
  server: { port: 5174, strictPort: true },
  preview: { port: 5174 },
});
